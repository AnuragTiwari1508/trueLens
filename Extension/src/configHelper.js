// Extension Environment Configuration Helper
// This file handles configuration loading from multiple sources

class ExtensionConfig {
  constructor() {
    this.config = {
      FACT_CHECK_API: 'https://truelens-fact-check-api.onrender.com/fact-check',
      BACKEND_API: 'http://localhost:3000/api',
      HUGGING_FACE_SPACE: 'ChitranshSahu/deepfake-detection',
      DEEPFAKE_API_KEY: 'al-dpYkyrb9jc38lasjJgZ_PtmyVa_swLgJxdtuUC6cqtR'
    }
    
    // Try to load from CONFIG global (from config.js)
    if (typeof CONFIG !== 'undefined') {
      this.config = { ...this.config, ...CONFIG }
    }
  }
  
  // Get config value with fallback
  get(key) {
    return this.config[key] || this.getDefault(key)
  }
  
  // Default values
  getDefault(key) {
    const defaults = {
      FACT_CHECK_API: 'https://truelens-fact-check-api.onrender.com/fact-check',
      BACKEND_API: 'http://localhost:3000/api',
      HUGGING_FACE_SPACE: 'ChitranshSahu/deepfake-detection',
      DEEPFAKE_API_KEY: ''
    }
    return defaults[key] || ''
  }
  
  // Load from Chrome storage (user settings)
  async loadFromStorage() {
    return new Promise((resolve) => {
      try {
        chrome.storage.sync.get(['backend_url', 'fact_check_url'], (items) => {
          if (items.backend_url) {
            this.config.BACKEND_API = items.backend_url
          }
          if (items.fact_check_url) {
            this.config.FACT_CHECK_API = items.fact_check_url
          }
          resolve(this.config)
        })
      } catch (e) {
        console.warn('[TrueLens] Storage access failed, using defaults')
        resolve(this.config)
      }
    })
  }
  
  // Get all config
  getAll() {
    return { ...this.config }
  }
}

// Create global instance
const extensionConfig = new ExtensionConfig()

// Export for use in scripts
if (typeof window !== 'undefined') {
  window.extensionConfig = extensionConfig
}
