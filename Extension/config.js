// ===================================================================
// TrueLens Extension Configuration
// ===================================================================
// IMPORTANT: Update API_BASE_URL before using the extension!
// 
// For local development: 'http://localhost:3000'
// For production: 'https://your-domain.com'
// ===================================================================

const CONFIG = {
  // Your TrueLens API base URL - **CHANGE THIS BEFORE INSTALLING**
  API_BASE_URL: 'http://localhost:3000',
  
  // API Endpoints
  ENDPOINTS: {
    FAKE_NEWS: '/api/fact-check/check',
    DEEPFAKE: '/api/deepfake/detect'
  },
  
  // API Keys (if needed for external services)
  API_KEYS: {
    // Add your API keys here if needed
    // OPENAI_KEY: 'your-openai-key',
    // HUGGINGFACE_KEY: 'your-huggingface-key'
  },
  
  // Confidence thresholds
  THRESHOLDS: {
    FAKE_NEWS: 0.7,  // 70% confidence threshold
    DEEPFAKE: 0.6    // 60% confidence threshold
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
