async function ensureContentScript(tabId) {
  try {
    await chrome.scripting.executeScript({ target: { tabId }, files: ['src/contentScript.js'] });
  } catch (e) {
    // ignore if already injected or not needed
    console.warn('[TrueLens] ensureContentScript warn', e);
  }
}

document.getElementById('scan-page')?.addEventListener('click', async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tabId = tabs[0]?.id;
    if (!tabId) return;
    await ensureContentScript(tabId);
    chrome.tabs.sendMessage(tabId, { type: 'SCAN_PAGE' });
  });
});

document.getElementById('scan-images')?.addEventListener('click', async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tabId = tabs[0]?.id;
    if (!tabId) return;
    await ensureContentScript(tabId);
    chrome.tabs.sendMessage(tabId, { type: 'SCAN_IMAGES' });
  });
});