# 🧪 TrueLens Extension Testing Guide

## ✅ File Verification

All required files are present and valid:
- ✅ manifest.json
- ✅ config.js
- ✅ icons/icon.svg
- ✅ src/popup.html
- ✅ src/popup.js
- ✅ src/popup.css
- ✅ src/background.js
- ✅ src/contentScript.js
- ✅ src/areaSelector.js
- ✅ src/options.html
- ✅ README.md

## 🚀 Installation Steps

### 1. Load Extension in Chrome

1. Open Chrome browser
2. Navigate to: `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `Extension` folder from your project
6. Extension icon should appear in toolbar

### 2. Configure Settings (Optional)

1. Right-click extension icon
2. Click "Options"
3. Update URLs if needed:
   - Backend API: `http://localhost:3000/api`
   - Fact-Check API: `https://truelens-fact-check-api.onrender.com/fact-check`

## 🧪 Test Cases

### Test 1: Scan Full Page
1. Navigate to any news website (e.g., CNN, BBC)
2. Click TrueLens extension icon
3. Ensure "Scan Page" tab is active
4. Click "🔍 Scan Full Page" button
5. Wait 30-40 seconds
6. **Expected Result**: 
   - Loading animation appears
   - Overall verdict (REAL/FAKE)
   - Statistics (True/False/Misleading counts)
   - Detailed claims with sources

### Test 2: Capture Area
1. Stay on any webpage
2. Click TrueLens extension icon
3. In "Scan Page" tab, click "📸 Capture Area"
4. Page should show:
   - Dark overlay (40% opacity)
   - Crosshair cursor
   - Instruction at top
5. Drag mouse to select area
6. Release mouse
7. **Expected Result**:
   - Area captured as screenshot
   - Preview shown in extension
   - "Coming soon" message for analysis

### Test 3: Video Analysis
1. Click TrueLens extension icon
2. Switch to "Scan Image" tab
3. Click "📸 Select Image/Video"
4. Choose a video file (MP4, MOV)
5. Click "🔍 Analyze Video"
6. Wait 1-2 minutes
7. **Expected Result**:
   - Loading with progress bar
   - FAKE/REAL verdict
   - Deepfake probability percentage
   - Frame count and confidence stats

## 🐛 Common Issues & Solutions

### Issue 1: Extension Icon Not Showing
**Solution**: Refresh extensions page and reload extension

### Issue 2: "No active tab found"
**Solution**: Make sure you're on a regular webpage (not chrome:// URLs)

### Issue 3: Video analysis fails
**Solution**: 
- Ensure backend server is running (`pnpm dev`)
- Check file size (max 50MB)
- Verify video format (MP4, MOV, AVI, WebM)

### Issue 4: Capture Area not working
**Solution**:
- Try on a different website
- Check if content scripts are blocked
- Reload the extension

### Issue 5: Fact-check API slow
**Solution**: 
- API takes 30-40 seconds normally
- Ensure internet connection
- Check if API is online

## 📊 Validation Checklist

- [ ] Extension loads without errors in chrome://extensions/
- [ ] Extension icon appears in toolbar
- [ ] Popup opens when clicking icon
- [ ] Both tabs (Scan Page / Scan Image) are visible
- [ ] Tab switching works smoothly
- [ ] Scan Full Page extracts text correctly
- [ ] Capture Area shows overlay with crosshair
- [ ] Capture Area allows drag selection
- [ ] ESC key cancels area selection
- [ ] Video upload button enables after file selection
- [ ] Video analysis shows loading animation
- [ ] Results display with proper colors (green/red)
- [ ] Options page opens and saves settings
- [ ] No console errors in DevTools

## 🔍 Debug Mode

To enable debug mode:
1. Right-click extension icon → Inspect popup
2. Open Console tab
3. Look for `[TrueLens]` prefixed messages
4. Check for any errors or warnings

## 📝 Backend Requirements

For video analysis to work:
1. Next.js server must be running
2. Navigate to project folder
3. Run: `pnpm dev`
4. Server should start on `http://localhost:3000`
5. Keep it running while testing extension

## ✅ Success Criteria

Extension is working properly if:
- ✅ No errors in Console
- ✅ All buttons are clickable
- ✅ Loading animations work
- ✅ Results display correctly
- ✅ Area selection is smooth
- ✅ Tab switching is instant
- ✅ Options page saves settings

## 🎉 Production Checklist

Before deploying:
- [ ] Update config.js with production API URLs
- [ ] Test on multiple websites
- [ ] Test with different file sizes
- [ ] Verify error handling
- [ ] Check performance
- [ ] Test on different Chrome versions
- [ ] Validate manifest.json
- [ ] Update version number
- [ ] Add extension to Chrome Web Store (optional)
