// Area Selection Overlay for Screenshot-like capture
let isSelecting = false
let startX, startY, endX, endY
let selectionBox = null
let overlay = null

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startAreaSelection') {
    startAreaSelection()
    sendResponse({ success: true })
  }
  return true
})

function startAreaSelection() {
  // Create overlay
  overlay = document.createElement('div')
  overlay.id = 'truelens-overlay'
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    cursor: crosshair;
    z-index: 999999;
  `
  
  // Create selection box
  selectionBox = document.createElement('div')
  selectionBox.id = 'truelens-selection'
  selectionBox.style.cssText = `
    position: fixed;
    border: 2px solid #6366f1;
    background: rgba(99, 102, 241, 0.1);
    display: none;
    z-index: 1000000;
    pointer-events: none;
  `
  
  // Create instruction text
  const instruction = document.createElement('div')
  instruction.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #6366f1;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 600;
    z-index: 1000001;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  `
  instruction.textContent = '🔍 Drag to select area to analyze • Press ESC to cancel'
  
  document.body.appendChild(overlay)
  document.body.appendChild(selectionBox)
  document.body.appendChild(instruction)
  
  // Mouse event handlers
  overlay.addEventListener('mousedown', handleMouseDown)
  overlay.addEventListener('mousemove', handleMouseMove)
  overlay.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('keydown', handleKeyDown)
  
  // Store references for cleanup
  overlay._instruction = instruction
}

function handleMouseDown(e) {
  isSelecting = true
  startX = e.clientX
  startY = e.clientY
  selectionBox.style.display = 'block'
  selectionBox.style.left = startX + 'px'
  selectionBox.style.top = startY + 'px'
  selectionBox.style.width = '0px'
  selectionBox.style.height = '0px'
}

function handleMouseMove(e) {
  if (!isSelecting) return
  
  endX = e.clientX
  endY = e.clientY
  
  const width = Math.abs(endX - startX)
  const height = Math.abs(endY - startY)
  const left = Math.min(startX, endX)
  const top = Math.min(startY, endY)
  
  selectionBox.style.left = left + 'px'
  selectionBox.style.top = top + 'px'
  selectionBox.style.width = width + 'px'
  selectionBox.style.height = height + 'px'
}

function handleMouseUp(e) {
  if (!isSelecting) return
  
  isSelecting = false
  endX = e.clientX
  endY = e.clientY
  
  const width = Math.abs(endX - startX)
  const height = Math.abs(endY - startY)
  
  // Minimum selection size (50x50)
  if (width < 50 || height < 50) {
    cleanup()
    alert('Selection too small. Please select a larger area.')
    return
  }
  
  const selection = {
    x: Math.min(startX, endX),
    y: Math.min(startY, endY),
    width: width,
    height: height,
    devicePixelRatio: window.devicePixelRatio || 1
  }
  
  // Send selection to background script
  chrome.runtime.sendMessage({
    action: 'captureArea',
    selection: selection
  })
  
  cleanup()
}

function handleKeyDown(e) {
  if (e.key === 'Escape') {
    cleanup()
    chrome.runtime.sendMessage({ action: 'cancelSelection' })
  }
}

function cleanup() {
  if (overlay) {
    overlay.removeEventListener('mousedown', handleMouseDown)
    overlay.removeEventListener('mousemove', handleMouseMove)
    overlay.removeEventListener('mouseup', handleMouseUp)
    document.body.removeChild(overlay)
    if (overlay._instruction) {
      document.body.removeChild(overlay._instruction)
    }
    overlay = null
  }
  
  if (selectionBox) {
    document.body.removeChild(selectionBox)
    selectionBox = null
  }
  
  document.removeEventListener('keydown', handleKeyDown)
  isSelecting = false
}
