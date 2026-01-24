// Background script for handling screenshot capture and API calls

let pendingSelection = null

// Listen for messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureArea') {
    captureSelectedArea(sender.tab.id, request.selection)
    sendResponse({ success: true })
  } else if (request.action === 'cancelSelection') {
    pendingSelection = null
    sendResponse({ success: true })
  }
  return true
})

async function captureSelectedArea(tabId, selection) {
  try {
    // Capture the visible tab
    const dataUrl = await chrome.tabs.captureVisibleTab(null, {
      format: 'png'
    })
    
    // Crop the image to the selected area
    const croppedImage = await cropImage(dataUrl, selection)
    
    // Store the cropped image for popup to access
    pendingSelection = {
      dataUrl: croppedImage,
      timestamp: Date.now()
    }
    
    // Notify popup that capture is ready
    chrome.runtime.sendMessage({
      action: 'areaCapured',
      dataUrl: croppedImage
    })
  } catch (error) {
    console.error('Error capturing area:', error)
    chrome.runtime.sendMessage({
      action: 'captureError',
      error: error.message
    })
  }
}

async function cropImage(dataUrl, selection) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Account for device pixel ratio
      const ratio = selection.devicePixelRatio || 1
      
      canvas.width = selection.width * ratio
      canvas.height = selection.height * ratio
      
      // Draw the cropped portion
      ctx.drawImage(
        img,
        selection.x * ratio,
        selection.y * ratio,
        selection.width * ratio,
        selection.height * ratio,
        0,
        0,
        canvas.width,
        canvas.height
      )
      
      resolve(canvas.toDataURL('image/png'))
    }
    
    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }
    
    img.src = dataUrl
  })
}

// Expose function to get pending selection
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPendingSelection') {
    sendResponse({ selection: pendingSelection })
    pendingSelection = null // Clear after retrieval
  }
  return true
})
