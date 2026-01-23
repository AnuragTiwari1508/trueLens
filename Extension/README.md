# TrueLens Chrome Extension

AI-powered fake news detector that analyzes web pages for factual accuracy.

## Features

- 🔍 **Page Scanning**: Automatically extracts and analyzes content from any web page
- ✅ **Claim Extraction**: Identifies factual claims using AI
- 📊 **Verdict System**: Classifies claims as True, False, or Misleading
- 📚 **Source Citations**: Provides credible sources for each claim
- 💯 **Support Scores**: Shows confidence level (0-100%) for each verdict
- 📋 **Summary**: Overall assessment of page credibility

## Installation

### Load Unpacked Extension (Development)

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `Extension` folder from this project
5. The TrueLens extension icon will appear in your toolbar

### Usage

1. Navigate to any news article or web page
2. Click the TrueLens extension icon
3. Click "🔍 Scan Current Page"
4. Wait 30-40 seconds for AI analysis
5. View results:
   - Overall verdict (REAL or FAKE)
   - Statistics (True/False/Misleading claims count)
   - Detailed analysis of each claim
   - Source citations

## How It Works

1. **Content Extraction**: Extension scrapes visible text from the page
2. **API Call**: Sends content to TrueLens Fact-Check API
3. **AI Analysis**: Backend AI processes claims and verifies against sources
4. **Results Display**: Shows color-coded verdicts with supporting evidence

## Technical Details

- **Manifest Version**: 3
- **Permissions**: `activeTab`, `scripting`, `storage`, `tabs`
- **API**: https://truelens-fact-check-api.onrender.com
- **Max Content**: 3000 characters (automatically trimmed)

## Color Coding

- 🟢 **Green**: True claims (verified)
- 🔴 **Red**: False claims (debunked)
- 🟡 **Orange**: Misleading claims (partially true)

## Requirements

- Chrome Browser (v88+)
- Active internet connection
- Access to TrueLens API

## Privacy

- Content is sent to external API for analysis
- No data is stored permanently
- Page content is limited to 3000 characters

## Support

For issues or questions, open an issue on GitHub.
