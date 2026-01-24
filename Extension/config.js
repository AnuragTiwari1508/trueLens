// TrueLens Extension Configuration
// Replace these values with your own API keys

const CONFIG = {
  // Fact-Check API for text/web page analysis
  FACT_CHECK_API: 'https://truelens-fact-check-api.onrender.com/fact-check',
  
  // Hugging Face Space for deepfake detection
  HUGGING_FACE_SPACE: 'ChitranshSahu/deepfake-detection',
  
  // Deepfake API Key (optional - some Hugging Face spaces don't require it)
  DEEPFAKE_API_KEY: 'al-dpYkyrb9jc38lasjJgZ_PtmyVa_swLgJxdtuUC6cqtR',
  
  // Your backend API (if using custom backend)
  BACKEND_API: 'http://localhost:3000/api'
}

// Export config for use in popup.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG
}
