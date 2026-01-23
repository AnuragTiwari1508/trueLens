const API_URL = 'https://truelens-fact-check-api.onrender.com/fact-check'

let currentProgress = 0

function showLoading() {
  document.getElementById('loading').style.display = 'block'
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

function showResults(data) {
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
  const verdictClass = overallVerdict === 'FAKE' ? 'verdict-fake' : 'verdict-real'
  const verdictEmoji = overallVerdict === 'FAKE' ? '☠️' : '✅'
  
  let html = `
    <div class="verdict ${verdictClass}">
      <div class="verdict-header">
        <span class="verdict-emoji">${verdictEmoji}</span>
        <h2>Page Content: ${overallVerdict}</h2>
      </div>
      <div class="stats">
        <div class="stat stat-true">✅ ${trueClaims} True</div>
        <div class="stat stat-false">❌ ${falseClaims} False</div>
        <div class="stat stat-misleading">⚠️ ${misleadingClaims} Misleading</div>
      </div>
    </div>
    
    <div class="summary">
      <h3>📋 Summary</h3>
      <p>${data.summary || 'Analysis completed'}</p>
    </div>
    
    <div class="claims-section">
      <h3>🔍 Analyzed Claims (${data.claims.length})</h3>
  `
  
  data.claims.slice(0, 5).forEach((claim, idx) => {
    const verdictColor = claim.verdict === 'True' ? '#22c55e' : 
                        claim.verdict === 'False' ? '#ef4444' : '#f59e0b'
    html += `
      <div class="claim-card" style="border-left: 4px solid ${verdictColor}">
        <div class="claim-verdict" style="color: ${verdictColor}">
          ${claim.verdict === 'True' ? '✅' : claim.verdict === 'False' ? '❌' : '⚠️'} 
          ${claim.verdict}
        </div>
        <p class="claim-text">${claim.claim.atomic_claim}</p>
        <div class="claim-score">Support: ${claim.support_score}%</div>
        ${claim.citations.length > 0 ? `
          <div class="citations">
            <strong>Source:</strong> ${claim.citations[0].source_title}
          </div>
        ` : ''}
      </div>
    `
  })
  
  if (data.claims.length > 5) {
    html += `<p class="more-claims">+ ${data.claims.length - 5} more claims analyzed</p>`
  }
  
  html += '</div>'
  resultsDiv.innerHTML = html
}

function showError(message) {
  hideLoading()
  document.getElementById('results').innerHTML = `
    <div class="error">
      <p>❌ ${message}</p>
    </div>
  `
}

async function scanPage() {
  try {
    showLoading()
    
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    
    if (!tab || !tab.id) {
      showError('Could not access current tab')
      return
    }
    
    // Execute content script to extract text
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractPageContent
    })
    
    const pageText = results[0]?.result
    
    if (!pageText || pageText.trim().length < 50) {
      showError('Not enough content to analyze on this page')
      return
    }
    
    // Call fact-check API
    const response = await fetch(`${API_URL}?text=${encodeURIComponent(pageText)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (!response.ok) {
      throw new Error('API request failed')
    }
    
    const data = await response.json()
    document.getElementById('progress').style.width = '100%'
    
    setTimeout(() => {
      showResults(data)
    }, 300)
    
  } catch (error) {
    console.error('Error:', error)
    showError(error.message || 'Failed to analyze page')
  }
}

// Function injected into page to extract content
function extractPageContent() {
  // Remove scripts, styles, and other non-content elements
  const clone = document.body.cloneNode(true)
  const elementsToRemove = clone.querySelectorAll('script, style, nav, header, footer, aside, iframe')
  elementsToRemove.forEach(el => el.remove())
  
  // Get all text content
  let text = clone.innerText || clone.textContent || ''
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim()
  
  // Limit to first 3000 characters for API
  return text.substring(0, 3000)
}

// Event listeners
document.getElementById('scan-page')?.addEventListener('click', scanPage)
