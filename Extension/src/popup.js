// Load config from config.js
const API_URL = typeof CONFIG !== 'undefined' ? CONFIG.FACT_CHECK_API : 'https://truelens-fact-check-api.onrender.com/fact-check'
const BACKEND_API = typeof CONFIG !== 'undefined' ? CONFIG.BACKEND_API : 'http://localhost:3000/api'

let currentProgress = 0
let selectedFile = null

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'))
    
    // Add active class to clicked tab
    btn.classList.add('active')
    const tabId = btn.getAttribute('data-tab')
    document.getElementById(`${tabId}-tab`).classList.add('active')
    
    // Clear results when switching tabs
    document.getElementById('results').innerHTML = ''
  })
})

// File Upload Handler
document.getElementById('image-upload').addEventListener('change', (e) => {
  selectedFile = e.target.files[0]
  const analyzeBtn = document.getElementById('analyze-media')
  
  if (selectedFile) {
    analyzeBtn.disabled = false
    analyzeBtn.textContent = `🔍 Analyze ${selectedFile.type.startsWith('video') ? 'Video' : 'Image'}`
  } else {
    analyzeBtn.disabled = true
    analyzeBtn.textContent = '🔍 Analyze Media'
  }
})

// Analyze Media Button
document.getElementById('analyze-media').addEventListener('click', async () => {
  if (!selectedFile) return
  
  if (selectedFile.type.startsWith('video')) {
    await analyzeVideo(selectedFile)
  } else {
    await analyzeImage(selectedFile)
  }
})

// Scan Page Button
document.getElementById('scan-page').addEventListener('click', scanPage)

// Capture Area Button
document.getElementById('capture-area').addEventListener('click', captureArea)

// Listen for area capture completion
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'areaCapured') {
    analyzeAreaScreenshot(request.dataUrl)
  } else if (request.action === 'captureError') {
    hideLoading()
    showError(request.error)
  }
})

// Loading Functions
function showLoading(message = 'Analyzing content...') {
  document.getElementById('loading').style.display = 'block'
  document.getElementById('loading-text').textContent = message
  document.getElementById('results').innerHTML = ''
  currentProgress = 0
  updateProgress()
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none'
}

function updateProgress() {
  if (currentProgress < 90) {
    currentProgress += 10
    document.getElementById('progress').style.width = currentProgress + '%'
    setTimeout(updateProgress, 500)
  }
}

// Ensure content script is injected
async function ensureContentScript(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['src/contentScript.js', 'src/areaSelector.js']
    })
  } catch (e) {
    // Ignore specific errors - script may already be injected
    const errorMsg = e?.message || String(e)
    
    // These errors are safe to ignore
    const safeErrors = [
      'already injected',
      'frame was removed',
      'Cannot access',
      'Extension context invalidated'
    ]
    
    const isSafeError = safeErrors.some(safe => errorMsg.includes(safe))
    
    if (!isSafeError) {
      console.error('[TrueLens] Failed to inject content script:', errorMsg)
      throw e // Re-throw if it's a real error
    }
  }
}

// ============ SCAN PAGE FEATURE ============
async function scanPage() {
  showLoading('Scanning page content...')
  
  try {
    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    
    if (!tab?.id) {
      throw new Error('No active tab found')
    }
    
    // Ensure content script is loaded
    await ensureContentScript(tab.id)
    
    // Extract page content
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractPageContent
    })
    
    const pageText = result.result
    
    if (!pageText || pageText.length < 50) {
      throw new Error('Not enough content to analyze')
    }
    
    // Call fact-check API
    const response = await fetch(`${API_URL}?text=${encodeURIComponent(pageText)}`)
    
    if (!response.ok) {
      throw new Error('Failed to analyze page')
    }
    
    const data = await response.json()
    currentProgress = 100
    document.getElementById('progress').style.width = '100%'
    
    setTimeout(() => showPageResults(data), 500)
  } catch (error) {
    hideLoading()
    showError(error.message)
  }
}

function extractPageContent() {
  // Clone the document to avoid modifying the actual page
  const clone = document.body.cloneNode(true)
  
  // Remove unwanted elements
  const unwanted = clone.querySelectorAll('script, style, nav, header, footer, iframe, noscript')
  unwanted.forEach(el => el.remove())
  
  // Get text content
  let text = clone.innerText || clone.textContent || ''
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim()
  
  // Limit to 3000 characters
  return text.substring(0, 3000)
}

function showPageResults(data) {
  hideLoading()
  const resultsDiv = document.getElementById('results')
  
  if (!data || !data.claims || data.claims.length === 0) {
    resultsDiv.innerHTML = `
      <div class="no-results">
        <p>⚠️ No claims found to analyze</p>
      </div>
    `
    return
  }

  const trueClaims = data.claims.filter(c => c.verdict === 'True').length
  const falseClaims = data.claims.filter(c => c.verdict === 'False').length
  const misleadingClaims = data.claims.filter(c => c.verdict === 'Misleading').length
  
  const overallVerdict = falseClaims > trueClaims ? 'FAKE' : 'REAL'
  
  resultsDiv.innerHTML = `
    <div class="verdict verdict-${overallVerdict.toLowerCase()}">
      <h2>${overallVerdict === 'FAKE' ? '⚠️ Likely FAKE' : '✅ Likely REAL'}</h2>
      <p>Based on ${data.claims.length} claims analyzed</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card true">
        <div class="stat-value">${trueClaims}</div>
        <div class="stat-label">True</div>
      </div>
      <div class="stat-card false">
        <div class="stat-value">${falseClaims}</div>
        <div class="stat-label">False</div>
      </div>
      <div class="stat-card misleading">
        <div class="stat-value">${misleadingClaims}</div>
        <div class="stat-label">Misleading</div>
      </div>
    </div>
    
    <div class="claims-section">
      <h3>📋 Detailed Analysis</h3>
      ${data.claims.map(claim => `
        <div class="claim-card verdict-${claim.verdict.toLowerCase()}">
          <div class="claim-header">
            <span class="claim-verdict">${claim.verdict}</span>
            <span class="claim-support">${claim.support_score}% confidence</span>
          </div>
          <p class="claim-text">${claim.claim}</p>
          ${claim.sources && claim.sources.length > 0 ? `
            <div class="claim-sources">
              <strong>Sources:</strong>
              ${claim.sources.slice(0, 2).map(src => `
                <a href="${src.url}" target="_blank">${src.title || 'Source'}</a>
              `).join(', ')}
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
    
    ${data.summary ? `
      <div class="summary-box">
        <h3>📊 Summary</h3>
        <p>${data.summary}</p>
      </div>
    ` : ''}
  `
}

// ============ ANALYZE IMAGE/VIDEO FEATURE ============
async function analyzeImage(file) {
  showLoading('Analyzing image for manipulation...')
  
  // For now, show a message that image analysis is coming soon
  // You can integrate with a deepfake image detection API here
  setTimeout(() => {
    hideLoading()
    document.getElementById('results').innerHTML = `
      <div class="no-results">
        <p>📸 Image analysis feature coming soon!</p>
        <p style="margin-top: 10px; font-size: 12px;">
          Currently supports video deepfake detection. Upload a video to analyze.
        </p>
      </div>
    `
  }, 2000)
}

async function analyzeVideo(file) {
  showLoading('Analyzing video for deepfakes...')
  
  try {
    // Create FormData and append video
    const formData = new FormData()
    formData.append('video', file)
    
    // Call backend API (your Next.js API)
    const response = await fetch(`${BACKEND_API}/deepfake/detect`, {
      method: 'POST',
      body: formData
    })
    
    // Check content type
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      throw new Error(`Server error: ${text.substring(0, 100)}`)
    }
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Analysis failed')
    }
    
    currentProgress = 100
    document.getElementById('progress').style.width = '100%'
    
    setTimeout(() => showVideoResults(data.detectionResult), 500)
  } catch (error) {
    hideLoading()
    showError(error.message)
  }
}

function showVideoResults(result) {
  hideLoading()
  const resultsDiv = document.getElementById('results')
  
  if (!result) {
    resultsDiv.innerHTML = `
      <div class="no-results">
        <p>⚠️ No results received</p>
      </div>
    `
    return
  }
  
  // Parse result if it's nested
  let resultData = result
  if (Array.isArray(resultData) && resultData.length > 0) {
    resultData = Array.isArray(resultData[0]) ? resultData[0][0] : resultData[0]
  }
  
  const isFake = resultData.label?.toUpperCase() === 'FAKE' || (resultData.confidence ?? 0) > 0.5
  const confidencePercent = (resultData.confidence * 100).toFixed(1)
  
  resultsDiv.innerHTML = `
    <div class="verdict verdict-${isFake ? 'fake' : 'real'}">
      <h2>${isFake ? '☠️ FAKE VIDEO' : '✅ REAL VIDEO'}</h2>
      <p>Deepfake Probability: ${confidencePercent}%</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${resultData.frame_count || 0}</div>
        <div class="stat-label">Frames Analyzed</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${confidencePercent}%</div>
        <div class="stat-label">Confidence</div>
      </div>
    </div>
    
    ${resultData.frame_probs && resultData.frame_probs.length > 0 ? `
      <div class="summary-box">
        <h3>📊 Frame Analysis</h3>
        <p>${resultData.frame_probs.length} frames analyzed</p>
        <p style="margin-top: 8px; font-size: 12px;">
          Average probability: ${(resultData.frame_probs.reduce((a, b) => a + b, 0) / resultData.frame_probs.length * 100).toFixed(1)}%
        </p>
      </div>
    ` : ''}
  `
}

// ============ CAPTURE AREA FEATURE ============
async function captureArea() {
  try {
    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    
    if (!tab?.id) {
      throw new Error('No active tab found')
    }
    
    // Ensure content script is loaded
    await ensureContentScript(tab.id)
    
    // Close popup to show the page
    window.close()
    
    // Send message to content script to start area selection
    chrome.tabs.sendMessage(tab.id, { action: 'startAreaSelection' })
    
    // The area selector content script will handle the rest
    // When user completes selection, areaCapured message will be sent
  } catch (error) {
    showError('Failed to start area selection: ' + error.message)
  }
}

async function analyzeAreaScreenshot(dataUrl) {
  showLoading('Analyzing selected area...')
  
  try {
    // Convert data URL to blob
    const response = await fetch(dataUrl)
    const blob = await response.blob()
    
    // Extract text from the screenshot using OCR (if available)
    // For now, we'll send the image directly to fake news detector
    // You can integrate with an OCR API here
    
    // Convert to File object
    const file = new File([blob], 'screenshot.png', { type: 'image/png' })
    
    // For now, show that we captured the area successfully
    currentProgress = 100
    document.getElementById('progress').style.width = '100%'
    
    setTimeout(() => {
      hideLoading()
      document.getElementById('results').innerHTML = `
        <div class="verdict verdict-real">
          <h2>📸 Area Captured!</h2>
          <p>Screenshot analysis feature coming soon</p>
        </div>
        <div class="summary-box">
          <h3>💡 Next Steps</h3>
          <p>We're working on integrating OCR and image analysis for captured areas.</p>
          <p style="margin-top: 8px;">For now, use "Scan Full Page" to analyze text content.</p>
        </div>
        <img src="${dataUrl}" style="width: 100%; border-radius: 8px; margin-top: 12px; border: 2px solid #e2e8f0;" />
      `
    }, 1000)
  } catch (error) {
    hideLoading()
    showError('Failed to analyze area: ' + error.message)
  }
}

// Error Display
function showError(message) {
  const resultsDiv = document.getElementById('results')
  resultsDiv.innerHTML = `
    <div class="no-results">
      <p>❌ Error: ${message}</p>
    </div>
  `
}
