# TrueLens Chrome Extension

Complete Chrome extension for detecting fake news and deepfakes on any webpage.

## Features
- 🔍 **Scan Page** - Fake news detection
- 🖼️ **Scan Image** - Deepfake detection  
- 🎨 Beautiful gradient UI
- ⚡ Real-time API integration

## Installation
1. Edit `config.js` - Set your API URL
2. Chrome → `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select Extension folder

## Configuration
Update API_BASE_URL in config.js:
```javascript
API_BASE_URL: 'http://localhost:3000'  // Change to your API
```

## Files
- manifest.json - Extension config
- config.js - API settings
- icons/ - Extension icons

Built for TrueLens v1.0
