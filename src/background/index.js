// We remove @gradio/client because it uses DOM APIs (window, document) 
// which are not available in Service Workers (MV3).
// We will use direct fetch calls for APIs.
import Tesseract from 'tesseract.js';

// Setup Context Menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "scan_deepfake",
    title: "TrueLens: Check Deepfake",
    contexts: ["image"]
  });
  chrome.contextMenus.create({
    id: "scan_fakenews",
    title: "TrueLens: Check Fake News (Selection)",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "scan_deepfake") {
    // Open popup or send notification?
    // We can't easily open the popup programmatically.
    // We will send a message to the content script to show a toast/overlay,
    // OR we can store the result and show a badge.
    // Better: Send message to content script to show "Analyzing..." then result.
    await checkDeepfake(info.srcUrl, tab.id);
  } else if (info.menuItemId === "scan_fakenews") {
    await checkFakeNews(info.selectionText, tab.id);
  }
});

// Listen for messages from Popup and Content Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CHECK_FAKE_NEWS') {
    checkFakeNews(request.text, sender.tab?.id || getActiveTabId()); // sender.tab.id might be null if from popup
  } else if (request.type === 'CAPTURE_AND_CROP') {
    captureAndCrop(request.area, sender.tab.id);
  }
  return true; // Keep channel open
});

async function captureAndCrop(area, tabId) {
    chrome.tabs.sendMessage(tabId, { type: 'SHOW_LOADING', message: "Capturing and Extracting Text..." });
    try {
        const dataUrl = await chrome.tabs.captureVisibleTab(null, { format: 'png' });
        
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);
        
        const canvas = new OffscreenCanvas(area.width * area.devicePixelRatio, area.height * area.devicePixelRatio);
        const ctx = canvas.getContext('2d');
        
        ctx.drawImage(
            bitmap,
            area.x * area.devicePixelRatio,
            area.y * area.devicePixelRatio,
            area.width * area.devicePixelRatio,
            area.height * area.devicePixelRatio,
            0,
            0,
            area.width * area.devicePixelRatio,
            area.height * area.devicePixelRatio
        );
        
        const blobCropped = await canvas.convertToBlob({ type: 'image/png' });
        
        // Convert blob to base64 for Tesseract without FileReader
        const arrayBuffer = await blobCropped.arrayBuffer();
        const base64 = btoa(
            new Uint8Array(arrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        const dataUrlCropped = `data:image/png;base64,${base64}`;
        
        processCrop(dataUrlCropped, tabId);

    } catch (err) {
        console.error("Capture failed:", err);
        chrome.tabs.sendMessage(tabId, { type: 'SHOW_ERROR', message: "Capture failed: " + err.message });
    }
}


async function getActiveTabId() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.id;
}

async function checkFakeNews(text, tabId) {
  if (!tabId) {
      const id = await getActiveTabId();
      if(id) tabId = id;
      else return; 
  }

  // Notify UI we are starting
  chrome.runtime.sendMessage({ type: 'SCAN_START' }).catch(() => {});
  
  try {
    // The API expects 'text' as a query parameter
    const url = new URL('https://truelens-fact-check-api.onrender.com/fact-check');
    url.searchParams.append('text', text);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    });

    const responseText = await response.text();
    let data;
    try {
        data = JSON.parse(responseText);
    } catch (e) {
        console.error("Failed to parse JSON:", responseText);
        throw new Error(`Invalid API response format (not JSON). Status: ${response.status}`);
    }

    if (!response.ok) {
        throw new Error(data.detail?.[0]?.msg || data.error || `API Error: ${response.status}`);
    }
    
    // Send result to Popup (if open) and Content Script (to show overlay)
    chrome.runtime.sendMessage({ type: 'SCAN_RESULT', data });
    chrome.tabs.sendMessage(tabId, { type: 'SHOW_RESULT', data, kind: 'fakenews' });

  } catch (error) {
    console.error(error);
    chrome.runtime.sendMessage({ type: 'SCAN_ERROR', error: error.message });
    chrome.tabs.sendMessage(tabId, { type: 'SHOW_ERROR', message: "Fact check failed: " + error.message });
  }
}


async function checkDeepfake(imageUrl, tabId) {
  chrome.tabs.sendMessage(tabId, { type: 'SHOW_LOADING', message: "Analyzing image for Deepfake..." });
  chrome.runtime.sendMessage({ type: 'SCAN_START' }).catch(() => {});

  try {
    // 1. Convert image URL to blob
    const imgRes = await fetch(imageUrl);
    const blob = await imgRes.blob();

    // 2. Upload to Hugging Face
    const formData = new FormData();
    formData.append('files', blob, 'image.png');
    
    const uploadRes = await fetch('https://chitranshsahu-deepfake-detection.hf.space/upload', {
        method: 'POST',
        body: formData
    });
    const uploadData = await uploadRes.json();
    const fileName = uploadData[0];

    // 3. Run inference (using simple predict if possible, or skip if queue needed)
    // Most spaces support a simple POST to /run/predict for small tasks
    const predictRes = await fetch('https://chitranshsahu-deepfake-detection.hf.space/run/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: [{ name: fileName, data: null, is_file: true }],
            fn_index: 2
        })
    });

    const result = await predictRes.json();
    console.log("Deepfake Result:", result);

    if (result.data) {
        chrome.runtime.sendMessage({ type: 'SCAN_RESULT', data: result.data });
        chrome.tabs.sendMessage(tabId, { type: 'SHOW_RESULT', data: result.data, kind: 'deepfake' });
    } else {
        throw new Error("Deepfake API returned no data. It might be busy or requires a queue.");
    }

  } catch (error) {
    console.error(error);
    chrome.tabs.sendMessage(tabId, { type: 'SHOW_ERROR', message: "Deepfake check failed: " + error.message });
    chrome.runtime.sendMessage({ type: 'SCAN_ERROR', error: error.message });
  }
}

async function processCrop(dataUrl, tabId) {
  chrome.tabs.sendMessage(tabId, { type: 'SHOW_LOADING', message: "Extracting text..." });
  chrome.runtime.sendMessage({ type: 'SCAN_START' }).catch(() => {});

  try {
    const result = await Tesseract.recognize(
      dataUrl,
      'eng',
      { logger: m => console.log(m) }
    );

    const text = result.data.text;
    console.log("OCR Text:", text);
    
    if (!text || text.trim().length === 0) {
        throw new Error("No text found in area.");
    }

    await checkFakeNews(text, tabId);

  } catch (error) {
    console.error(error);
    chrome.tabs.sendMessage(tabId, { type: 'SHOW_ERROR', message: "OCR failed: " + error.message });
    chrome.runtime.sendMessage({ type: 'SCAN_ERROR', error: error.message });
  }
}
