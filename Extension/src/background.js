// Uses Hugging Face Inference API for text and image fake/real classification
const HF_API_URL_TEXT = "https://00ac2f36e1d3.ngrok-free.app/api/fact-check";
// Switch to a deepfake image detector model
const HF_API_URL_IMAGE = "https://api-inference.huggingface.co/models/prithivMLmods/deepfake-detector-model-v1";

async function classifyTextZeroShot(content) {
  const apiKey = await getApiKey();
  const url = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({ inputs: content, parameters: { candidate_labels: ["fake", "real"] } }),
  });
  if (!res.ok) {
    let errText = '';
    try { errText = (await res.json())?.error || ''; } catch {}
    return { isFake: false, confidence: 0, reason: `Zero-shot API error (${res.status}): ${errText}`, breakdown: {} };
  }
  const data = await res.json();
  try {
    const labels = data?.labels || [];
    const scores = data?.scores || [];
    let isFake = false;
    let confidence = 0;
    const breakdown = { fake: 0, real: 0 };
    for (let i = 0; i < labels.length; i++) {
      const lbl = labels[i]; const sc = scores[i] || 0;
      if (/fake/i.test(lbl)) { breakdown.fake = sc; }
      if (/real/i.test(lbl)) { breakdown.real = sc; }
    }
    if (breakdown.fake >= breakdown.real) { isFake = true; confidence = breakdown.fake; }
    else { isFake = false; confidence = breakdown.real; }
    return { isFake, confidence, reason: isFake ? "Zero-shot signals suggest misinformation." : "Zero-shot signals align with factual content.", breakdown };
  } catch (e) {
    return { isFake: false, confidence: 0, reason: "Unable to parse zero-shot response.", breakdown: {} };
  }
}

async function classifyText(content) {
  const apiKey = await getApiKey();
  
  // Construct the complex request body expected by the new API endpoint
  const requestBody = {
    original_text: content,
    claims: [], // Can be populated if the extension extracts claims locally
    summary: "",
    claim_reviews: []
  };

  const res = await fetch(HF_API_URL_TEXT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify(requestBody),
  });
  if (!res.ok) {
    let errText = '';
    try {
      const errJson = await res.json();
      // Handle the specific error schema: { detail: [{ loc, msg, type }] }
      if (errJson.detail && Array.isArray(errJson.detail)) {
        errText = errJson.detail.map(d => `${d.loc.join('.')}: ${d.msg}`).join(', ');
      } else {
        errText = errJson?.error || JSON.stringify(errJson);
      }
    } catch (e) {
      // Don't read body stream if already read or if not json
      // errText = await res.text(); // This causes "body stream already read" if res.json() failed but consumed stream
      errText = "Could not parse error details";
    }
    // Try zero-shot fallback on error
    const fallback = await classifyTextZeroShot(content);
    if (fallback.confidence > 0) return fallback;
    return {
      isFake: false,
      confidence: 0,
      reason: `API error (${res.status}): ${errText}`,
      breakdown: {},
    };
  }
  const data = await res.json();
  const primary = parseTextResult(data);
  // If primary parse failed to produce scores, try zero-shot fallback
  if (!primary || ((primary.breakdown?.fake || 0) === 0 && (primary.breakdown?.real || 0) === 0 && primary.confidence === 0)) {
    const fallback = await classifyTextZeroShot(content);
    if (fallback.confidence > 0) return fallback;
  }
  return primary;
}

async function classifyImage(imageBytes) {
  const apiKey = await getApiKey();
  const res = await fetch(HF_API_URL_IMAGE, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: imageBytes,
  });
  const data = await res.json();
  return parseImageResult(data);
}

function parseTextResult(data) {
  try {
    if (data && typeof data === 'object' && 'error' in data) {
      return { isFake: false, confidence: 0, reason: `Model error: ${data.error}`, breakdown: {} };
    }
    // Hugging Face text-classification may return either: [ {label, score}, ... ] or [ [ {label, score}, ... ] ]
    const scores = Array.isArray(data?.[0]) ? data[0] : Array.isArray(data) ? data : [];
    const fakeScore = scores.find(s => /fake/i.test(s.label))?.score ?? 0;
    const realScore = scores.find(s => /real/i.test(s.label))?.score ?? 0;
    const isFake = fakeScore >= realScore;
    const confidence = Math.max(fakeScore, realScore);
    return {
      isFake,
      confidence,
      reason: isFake ? "Text patterns resemble known misinformation signals." : "Text aligns with typical factual reporting patterns.",
      breakdown: { fake: fakeScore, real: realScore },
    };
  } catch (e) {
    return { isFake: false, confidence: 0, reason: "Unable to parse model response.", breakdown: {} };
  }
}

function parseImageResult(data) {
  try {
    // expected: [{label: 'fake', score: 0.8}, {label: 'real', score: 0.2}] (order can vary)
    const scores = Array.isArray(data) ? data[0] ?? data : data;
    const fakeScore = scores.find(s => /fake/i.test(s.label))?.score ?? 0;
    const realScore = scores.find(s => /real/i.test(s.label))?.score ?? 0;
    const isFake = fakeScore >= realScore;
    const confidence = Math.max(fakeScore, realScore);
    return {
      isFake,
      confidence,
      reason: isFake ? "Visual artifacts and model signals suggest synthetic/deepfake image." : "Image appears consistent with real-world visual patterns.",
      breakdown: { fake: fakeScore, real: realScore },
    };
  } catch (e) {
    return { isFake: false, confidence: 0, reason: "Unable to parse image model response.", breakdown: {} };
  }
}

async function getApiKey() {
  return new Promise(resolve => {
    chrome.storage.sync.get(["hf_api_key"], (items) => resolve(items["hf_api_key"] || ""));
  });
}

async function classifyImageFromUrl(imageUrl) {
  const apiKey = await getApiKey();
  const imgRes = await fetch(imageUrl);
  const blob = await imgRes.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const res = await fetch(HF_API_URL_IMAGE, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: new Uint8Array(arrayBuffer),
  });
  const data = await res.json();
  return parseImageResult(data);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try {
      if (msg.type === "CLASSIFY_TEXT") {
        const result = await classifyText(msg.payload);
        sendResponse(result);
        return;
      }
      if (msg.type === "CLASSIFY_IMAGE") {
        const result = await classifyImage(msg.payload);
        sendResponse(result);
        return;
      }
      if (msg.type === "CLASSIFY_IMAGE_URL" && typeof msg.payload === 'string') {
        const result = await classifyImageFromUrl(msg.payload);
        sendResponse(result);
        return;
      }
    } catch (e) {
      sendResponse({ error: String(e) });
    }
  })();
  return true; // keep message channel open for async
});

chrome.runtime.onInstalled.addListener(() => {
  // optional: ensure content script is injected for all pages (matches already covers <all_urls>)
});