import './style.css';

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_SELECTION') {
    sendResponse({ text: window.getSelection().toString() });
  } else if (request.type === 'START_CAPTURE_MODE') {
    startCaptureMode();
  } else if (request.type === 'SHOW_RESULT') {
    showOverlay(request.data, request.kind);
  } else if (request.type === 'SHOW_LOADING') {
    showLoading(request.message);
  } else if (request.type === 'SHOW_ERROR') {
    showError(request.message);
  }
});

let overlay = null;

function createOverlayBase() {
    if (overlay) document.body.removeChild(overlay);
    overlay = document.createElement('div');
    overlay.className = 'truelens-overlay';
    document.body.appendChild(overlay);
    return overlay;
}

function showLoading(msg) {
    const el = createOverlayBase();
    el.innerHTML = `
        <div class="truelens-modal-overlay">
            <div class="truelens-box animated-slide-in" style="max-width: 300px; padding: 2rem; text-align: center;">
                <div class="truelens-spinner"></div>
                <p style="margin-top: 1rem; font-weight: 500;">${msg}</p>
                <button id="truelens-close-loading" class="truelens-btn-secondary" style="margin-top: 1rem; width: 100%;">Cancel</button>
            </div>
        </div>
    `;
    document.getElementById('truelens-close-loading').onclick = () => {
        el.classList.add('fade-out');
        setTimeout(() => {
            if (el.parentNode) document.body.removeChild(el);
            overlay = null;
        }, 300);
    };
}

function showError(msg) {
    const el = createOverlayBase();
    el.innerHTML = `
        <div class="truelens-modal-overlay">
            <div class="truelens-box animated-slide-in" style="max-width: 350px; padding: 1.5rem; text-align: center; border-color: var(--tl-error);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">❌</div>
                <h3 style="color: var(--tl-error); margin-bottom: 0.5rem;">Analysis Error</h3>
                <p style="color: var(--tl-muted); font-size: 0.9rem; line-height: 1.5;">${msg}</p>
                <button id="truelens-close-error" class="truelens-btn-primary" style="margin-top: 1.5rem; width: 100%;">Close</button>
            </div>
        </div>
    `;
    document.getElementById('truelens-close-error').onclick = () => {
        el.classList.add('fade-out');
        setTimeout(() => {
            if (el.parentNode) document.body.removeChild(el);
            overlay = null;
        }, 300);
    };
}

function showOverlay(data, kind) {
    console.log("Showing Overlay for:", kind, data);
    const el = createOverlayBase();
    let content = '';

    if (!data) {
        content = '<p class="truelens-error">No data received from analysis.</p>';
    } else if (kind === 'fakenews') {
        // Handle both possible structures (data.claims or data directly)
        const claims = data.claims || (Array.isArray(data) ? data : []);
        const summary = data.summary || '';
        
        content = `
            <div class="truelens-result-container">
                ${summary ? `<div class="truelens-summary-section">
                    <strong>Summary</strong>
                    <p>${summary}</p>
                </div>` : ''}
                <div class="truelens-claims-list">
                    ${claims.length > 0 ? claims.map(c => {
                        const verdict = (c.verdict || 'Unknown').toLowerCase();
                        const score = c.support_score || 0;
                        const claimText = c.claim?.original_text || c.text || 'Claim';
                        const rationale = c.rationale || 'No rationale provided.';
                        
                        return `
                        <div class="truelens-claim-item ${verdict}">
                            <div class="truelens-claim-header">
                                <span class="truelens-verdict-tag">${verdict.toUpperCase()}</span>
                                <span class="truelens-score">${score}% Confidence</span>
                            </div>
                            <p class="truelens-claim-text">"${claimText}"</p>
                            <p class="truelens-rationale">${rationale}</p>
                            ${c.citations && c.citations.length > 0 ? `
                                <div class="truelens-sources">
                                    <strong>Sources:</strong>
                                    ${c.citations.map(cite => `<a href="${cite.url}" target="_blank">🔗 ${cite.source_title || 'Source'}</a>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `; }).join('') : '<p class="truelens-no-claims">No specific claims verified, but check the summary above.</p>'}
                </div>
            </div>
        `;
    } else if (kind === 'deepfake') {
        // Handle Gradio response: result.data[0] is usually the label/JSON
        const resultData = Array.isArray(data) ? data[0] : data;
        
        let label = "Unknown";
        let confidence = 0;
        
        if (resultData && typeof resultData === 'object') {
            label = resultData.label || "Detected";
            // Confidences is often an array of objects { label: string, confidence: number }
            if (resultData.confidences && resultData.confidences.length > 0) {
                const top = resultData.confidences[0];
                label = top.label;
                confidence = Math.round(top.confidence * 100);
            }
        }

        content = `
            <div class="truelens-deepfake-container">
                <div class="truelens-deepfake-badge ${label.toLowerCase()}">
                    <div class="truelens-badge-icon">${label === 'Real' ? '✅' : '🚫'}</div>
                    <div class="truelens-badge-info">
                        <strong>${label}</strong>
                        <span>${confidence}% Confidence</span>
                    </div>
                </div>
                <div class="truelens-raw-json">
                    <details>
                        <summary>View Raw Analysis</summary>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    </details>
                </div>
            </div>
        `;
    }

    el.innerHTML = `
        <div class="truelens-modal-overlay">
            <div class="truelens-box animated-slide-in">
                <div class="truelens-header">
                    <div class="truelens-logo">
                        <span class="logo-icon">🔍</span>
                        <h3>TrueLens Analysis</h3>
                    </div>
                    <button id="truelens-close" title="Close Result">×</button>
                </div>
                <div class="truelens-content">
                    ${content}
                </div>
                <div class="truelens-footer">
                    <p>AI-Powered Verification by TrueLens</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('truelens-close').onclick = () => {
        el.classList.add('fade-out');
        setTimeout(() => {
            if (el.parentNode) document.body.removeChild(el);
            overlay = null;
        }, 300);
    };
}


// Capture Mode
let selectionDiv = null;
let startX, startY;

function startCaptureMode() {
    document.body.style.cursor = 'crosshair';
    document.addEventListener('mousedown', onMouseDown);
    
    // Create overlay to dim screen
    const dim = document.createElement('div');
    dim.id = 'truelens-capture-dim';
    document.body.appendChild(dim);
}

function onMouseDown(e) {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    
    selectionDiv = document.createElement('div');
    selectionDiv.id = 'truelens-selection';
    selectionDiv.style.left = startX + 'px';
    selectionDiv.style.top = startY + 'px';
    document.body.appendChild(selectionDiv);
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(e) {
    const currentX = e.clientX;
    const currentY = e.clientY;
    
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    const left = Math.min(currentX, startX);
    const top = Math.min(currentY, startY);
    
    selectionDiv.style.width = width + 'px';
    selectionDiv.style.height = height + 'px';
    selectionDiv.style.left = left + 'px';
    selectionDiv.style.top = top + 'px';
}

async function onMouseUp(e) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousedown', onMouseDown);
    document.body.style.cursor = 'default';
    
    const rect = selectionDiv.getBoundingClientRect();
    const dim = document.getElementById('truelens-capture-dim');
    if (dim) document.body.removeChild(dim);
    document.body.removeChild(selectionDiv);
    selectionDiv = null;

    if (rect.width < 10 || rect.height < 10) return; // Ignore small clicks

    // We need to capture the visible tab, but we can't do it in content script.
    // We can't easily crop here either without the image.
    // OPTION: We send the coordinates to the background script.
    // The background script captures the tab, then crops it using OffscreenCanvas.
    
    // Coordinates need to be scaled by devicePixelRatio usually, but captureVisibleTab might handle it.
    // Let's send client coordinates and let background handle logic.
    chrome.runtime.sendMessage({
        type: 'PROCESS_CROP_REQUEST', // Wait, we can't send "PROCESS_CROP" yet, we need to capture first.
        // Actually, better approach:
        // 1. Send coordinates to background.
        // 2. Background captures tab.
        // 3. Background crops.
    });
    
    // But wait, "captureVisibleTab" captures the *viewport*.
    // The coordinates are viewport relative.
    
    // Let's implement the capture in background immediately.
    // We send coordinates.
    chrome.runtime.sendMessage({
        type: 'CAPTURE_AND_CROP',
        area: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            devicePixelRatio: window.devicePixelRatio
        }
    });
}
