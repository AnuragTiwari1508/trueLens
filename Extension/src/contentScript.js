// Injects a badge on the page with classification results
function createBadge(result, kind) {
  const badge = document.createElement('div');
  badge.style.position = 'fixed';
  badge.style.bottom = '12px';
  badge.style.right = '12px';
  badge.style.zIndex = '2147483647';
  badge.style.padding = '10px 12px';
  badge.style.borderRadius = '12px';
  badge.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
  badge.style.fontFamily = 'system-ui, Arial';
  badge.style.fontSize = '12px';
  badge.style.maxWidth = '280px';
  badge.style.backdropFilter = 'blur(8px)';

  const isFake = result.isFake;
  badge.style.background = isFake ? 'rgba(239,68,68,0.9)' : 'rgba(34,197,94,0.9)';
  badge.style.color = '#fff';

  badge.innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
      <strong>${kind === 'image' ? 'Image' : 'Page'} ${isFake ? 'Fake' : 'Real'}</strong>
      <span style="opacity:.85">Conf: ${(result.confidence*100).toFixed(1)}%</span>
    </div>
    <div style="margin-top:6px;line-height:1.4">${result.reason}</div>
    ${result.breakdown ? `<div style="margin-top:6px;opacity:.9">Fake: ${(result.breakdown.fake*100||0).toFixed(1)}% • Real: ${(result.breakdown.real*100||0).toFixed(1)}%</div>` : ''}
  `;

  const close = document.createElement('button');
  close.textContent = '×';
  close.ariaLabel = 'Close';
  close.style.position = 'absolute';
  close.style.top = '6px';
  close.style.right = '8px';
  close.style.background = 'transparent';
  close.style.border = 'none';
  close.style.color = '#fff';
  close.style.fontSize = '16px';
  close.style.cursor = 'pointer';
  close.addEventListener('click', () => badge.remove());
  badge.appendChild(close);

  document.body.appendChild(badge);
}

async function scanPageText() {
  // Use a more robust way to get page content, e.g., Readability or just full body text
  // Limiting to 10000 characters to capture more context while respecting reasonable payload sizes
  // Also clean up whitespace
  const text = document.body.innerText
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 10000); 
    
  console.log('[TrueLens] Scanned text length:', text.length);

  if (!text || text.length < 50) {
    return { error: "Not enough text content found on page." };
  }

  return new Promise(resolve => {
    chrome.runtime.sendMessage({ type: 'CLASSIFY_TEXT', payload: text }, resolve);
  });
}

async function scanImages() {
  const imgs = Array.from(document.images).slice(0, 5);
  const results = [];
  for (const img of imgs) {
    try {
      const res = await new Promise(resolve => {
        chrome.runtime.sendMessage({ type: 'CLASSIFY_IMAGE_URL', payload: img.src }, resolve);
      });
      results.push({ img, res });
    } catch (e) {
      console.warn('Image scan failed', e);
    }
  }
  return results;
}

function markImages(results) {
  for (const { img, res } of results) {
    const label = document.createElement('span');
    label.textContent = res.isFake ? 'Fake' : 'Real';
    label.style.position = 'absolute';
    label.style.left = '6px';
    label.style.bottom = '6px';
    label.style.background = res.isFake ? 'rgba(239,68,68,.9)' : 'rgba(34,197,94,.9)';
    label.style.color = '#fff';
    label.style.padding = '2px 6px';
    label.style.borderRadius = '6px';
    label.style.fontSize = '10px';
    label.style.backdropFilter = 'blur(4px)';

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    img.parentNode?.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    wrapper.appendChild(label);
  }
}

// Listen to commands from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  try {
    if (msg.type === 'SCAN_PAGE') {
      console.log('[TrueLens] SCAN_PAGE received');
      (async () => {
        const result = await scanPageText();
        if (result?.error) {
          createBadge({ isFake: false, confidence: 0, reason: `Error: ${result.error}`, breakdown: {} }, 'page');
        } else {
          createBadge(result, 'page');
        }
        sendResponse(result);
      })();
      return true; // keep channel open for async sendResponse
    }
    if (msg.type === 'SCAN_IMAGES') {
      console.log('[TrueLens] SCAN_IMAGES received');
      (async () => {
        const results = await scanImages();
        markImages(results);
        const avg = results.length ? results.reduce((a, b) => a + (b.res.confidence || 0), 0) / results.length : 0;
        createBadge({ isFake: false, confidence: avg, reason: results.length ? 'Images scanned. Labels added.' : 'No images found on page.', breakdown: {} }, 'image');
        sendResponse(results.map(r => r.res));
      })();
      return true; // keep channel open for async sendResponse
    }
  } catch (e) {
    console.error('[TrueLens] contentScript error', e);
    createBadge({ isFake: false, confidence: 0, reason: `Error: ${String(e)}`, breakdown: {} }, 'page');
    sendResponse({ error: String(e) });
    return true;
  }
});
console.info('[TrueLens] content script loaded');