# TrueLens Chrome Extension

AI-powered fake news detector and deepfake analyzer for images and videos.

## Features

### 📄 Page Scanner
- 🔍 **Web Page Analysis**: Automatically extracts and analyzes content from any web page
- ✅ **Claim Extraction**: Identifies factual claims using AI
- 📊 **Verdict System**: Classifies claims as True, False, or Misleading
- 📚 **Source Citations**: Provides credible sources for each claim
- 💯 **Support Scores**: Shows confidence level (0-100%) for each verdict
- 📋 **Overall Assessment**: REAL or FAKE verdict based on all claims

### 🖼️ Media Scanner
- 🎥 **Video Deepfake Detection**: Analyzes videos for AI-generated content
- 📸 **Image Analysis**: Coming soon - detect manipulated images
- 🤖 **AI-Powered**: Uses Hugging Face deepfake detection model
- 📊 **Frame-by-Frame**: Analyzes multiple frames for accuracy
- ⚡ **Real-time Results**: Get instant verdicts with confidence scores

## Installation

### Load Unpacked Extension (Development)

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `Extension` folder from this project
5. The TrueLens extension icon will appear in your toolbar

### Configuration

Before using the extension, configure your API keys in `config.js`:

```javascript
const CONFIG = {
  FACT_CHECK_API: 'https://truelens-fact-check-api.onrender.com/fact-check',
  HUGGING_FACE_SPACE: 'ChitranshSahu/deepfake-detection',
  DEEPFAKE_API_KEY: 'your-api-key-here',
  BACKEND_API: 'http://localhost:3000/api'
}
```

## Usage

### Scan Web Page

1. Navigate to any news article or web page
2. Click the TrueLens extension icon
3. Stay on **"Scan Page"** tab
4. Click "🔍 Scan Current Page"
5. Wait 30-40 seconds for AI analysis
6. View results:
   - Overall verdict (REAL or FAKE)
   - Statistics (True/False/Misleading claims count)
   - Detailed analysis of each claim
   - Source citations

### Scan Video for Deepfakes

1. Click the TrueLens extension icon
2. Switch to **"Scan Image"** tab
3. Click "📸 Select Image/Video"
4. Choose a video file (MP4, MOV, AVI, WebM)
5. Click "🔍 Analyze Video"
6. Wait for processing (~1-2 minutes)
7. View results:
   - FAKE or REAL verdict
   - Deepfake probability percentage
   - Frame-by-frame analysis

## How It Works

### Page Scanner
1. **Content Extraction**: Scrapes visible text from the page
2. **API Call**: Sends content to TrueLens Fact-Check API
3. **AI Analysis**: Backend AI processes claims and verifies against sources
4. **Results Display**: Shows color-coded verdicts with supporting evidence

### Media Scanner
1. **File Upload**: User selects image or video file
2. **Backend Processing**: Sends to your Next.js API endpoint
3. **Deepfake Detection**: Uses Hugging Face model for analysis
4. **Frame Analysis**: Checks multiple frames for manipulation
5. **Verdict Display**: Shows overall result with confidence scores

## Technical Details

- **Manifest Version**: 3
- **Permissions**: `activeTab`, `scripting`, `storage`, `tabs`
- **Fact-Check API**: https://truelens-fact-check-api.onrender.com
- **Deepfake Model**: ChitranshSahu/deepfake-detection (Hugging Face)
- **Max Page Content**: 3000 characters (automatically trimmed)
- **Supported Video Formats**: MP4, MOV, AVI, WebM
- **Max Video Size**: 50MB

## Color Coding

- 🟢 **Green**: True claims / Real content (verified)
- 🔴 **Red**: False claims / Fake content (debunked)
- 🟡 **Orange**: Misleading claims (partially true)

## Requirements

- Chrome Browser (v88+)
- Active internet connection
- Access to TrueLens API
- Backend server running (for video analysis)

## Privacy

- Page content is sent to external API for analysis
- Videos are processed through your backend server
- No data is stored permanently
- Page content is limited to 3000 characters

## Troubleshooting

### Video Analysis Not Working
- Make sure your backend server is running (`npm run dev`)
- Check `config.js` has correct `BACKEND_API` URL
- Verify video file is under 50MB
- Ensure video format is supported (MP4, MOV, AVI, WebM)

### Page Scanner Slow
- API typically takes 30-40 seconds to analyze
- Ensure stable internet connection
- Try refreshing the page if stuck

## Support

For issues or questions, open an issue on GitHub.
