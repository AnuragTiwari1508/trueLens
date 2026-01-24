import React, { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('fakenews');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Listen for messages from background/content
  useEffect(() => {
    const handleMessage = (request, sender, sendResponse) => {
      if (request.type === 'SCAN_RESULT') {
        setLoading(false);
        setResult(request.data);
      } else if (request.type === 'SCAN_ERROR') {
        setLoading(false);
        setError(request.error);
      } else if (request.type === 'SCAN_START') {
        setLoading(true);
        setResult(null);
        setError(null);
      }
    };
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  const handleScanSelection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { type: 'GET_SELECTION' }, (response) => {
      if (chrome.runtime.lastError) {
        setLoading(false);
        setError("Could not connect to page. Refresh the page.");
        return;
      }
      if (response && response.text) {
        // Send to background for processing
        chrome.runtime.sendMessage({ type: 'CHECK_FAKE_NEWS', text: response.text });
      } else {
        setLoading(false);
        setError("No text selected.");
      }
    });
  };

  const handleCaptureArea = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // Trigger capture mode in content script
    chrome.tabs.sendMessage(tab.id, { type: 'START_CAPTURE_MODE' });
    // The content script will handle selection and send coordinates to background
    // Background will capture, crop, OCR, and send result back via message
  };

  const handleScanDeepfake = () => {
     // This is mainly handled via context menu, but we can also offer instructions or a "Scan Page Images" button
  };

  return (
    <div className="container">
      <header>
        <div className="logo-container">
          <div className="logo-icon">T</div>
          <span className="logo-text">trueLens</span>
        </div>
        <div className="tabs">
          <button 
            className={activeTab === 'fakenews' ? 'active' : ''} 
            onClick={() => { setActiveTab('fakenews'); setResult(null); setError(null); }}
          >
            Fake News
          </button>
          <button 
            className={activeTab === 'deepfake' ? 'active' : ''} 
            onClick={() => { setActiveTab('deepfake'); setResult(null); setError(null); }}
          >
            Deepfake
          </button>
        </div>
      </header>

      <main>
        {!result && !loading && !error && (
          <div className="tab-content">
            {activeTab === 'fakenews' ? (
              <div className="feature-card">
                <h2>📰 Fake News Check</h2>
                <p>Verify claims and news authenticity using our AI-powered verification engine.</p>
                <button className="btn-primary" onClick={handleScanSelection}>
                  <span>🔍</span> Scan Selected Text
                </button>
                <button className="btn-outline" onClick={handleCaptureArea}>
                  <span>📸</span> Capture & Scan Area
                </button>
              </div>
            ) : (
              <div className="feature-card">
                <h2>🎬 Deepfake Detection</h2>
                <p>Detect AI-generated faces and deepfakes in images with 98% accuracy.</p>
                <p style={{fontSize: '0.75rem', marginTop: '1rem'}}>
                  <em>Tip: Right-click any image on the page and select "TrueLens: Check Deepfake" for instant analysis.</em>
                </p>
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>AI is analyzing media...</p>
          </div>
        )}
        
        {error && (
          <div className="feature-card" style={{borderColor: 'var(--error)'}}>
            <h2 style={{color: 'var(--error)'}}>❌ Error</h2>
            <p>{error}</p>
            <button className="btn-outline" onClick={() => setError(null)}>Try Again</button>
          </div>
        )}

        {result && (
          <div className="result-container">
            {activeTab === 'fakenews' ? (
              <FactCheckResult data={result} />
            ) : (
              <DeepfakeResult data={result} />
            )}
            <button className="btn-outline" onClick={() => setResult(null)} style={{marginTop: '1rem'}}>
              New Scan
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

const FactCheckResult = ({ data }) => {
  if (!data) return null;
  
  const claims = data.claims || (Array.isArray(data) ? data : []);
  
  return (
    <div className="fact-check-results">
      {data.summary && (
        <div className="summary-card">
          <h3>Summary Analysis</h3>
          <p>{data.summary}</p>
        </div>
      )}
      
      <div className="claims-list">
        {claims.length > 0 ? (
          claims.map((claim, idx) => {
            const verdict = (claim.verdict || 'Unknown').toLowerCase();
            return (
              <div key={idx} className={`claim-item ${verdict}`}>
                <div className="verdict-header">
                  <span className="verdict-tag">{verdict.toUpperCase()}</span>
                  <span className="confidence-score">{claim.support_score}% Confidence</span>
                </div>
                <p className="claim-quote">"{claim.claim?.original_text || claim.text || 'Claim'}"</p>
                <p className="rationale-text">{claim.rationale}</p>
                {claim.citations && claim.citations.length > 0 && (
                   <div className="citations" style={{marginTop: '0.5rem'}}>
                     {claim.citations.slice(0, 2).map((cite, i) => (
                       <a key={i} href={cite.url} target="_blank" rel="noopener noreferrer" 
                          style={{display: 'block', fontSize: '0.7rem', color: 'var(--primary)', textDecoration: 'none', marginBottom: '2px'}}>
                         🔗 {cite.source_title || 'Source'}
                       </a>
                     ))}
                   </div>
                )}
              </div>
            );
          })
        ) : (
          <p style={{textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem'}}>
            No specific claims extracted.
          </p>
        )}
      </div>
    </div>
  );
};


const DeepfakeResult = ({ data }) => {
    const resultData = Array.isArray(data) ? data[0] : data;
    
    let label = "Unknown";
    let confidence = 0;
    
    if (resultData && typeof resultData === 'object') {
        label = resultData.label || "Detected";
        if (resultData.confidences && resultData.confidences.length > 0) {
            const top = resultData.confidences[0];
            label = top.label;
            confidence = Math.round(top.confidence * 100);
        }
    }

    const isReal = label.toLowerCase() === 'real';

    return (
        <div className="deepfake-card">
            <div className="result-icon">{isReal ? '✅' : '🚫'}</div>
            <h2 className={`result-label ${isReal ? 'real' : 'fake'}`}>
              {label.toUpperCase()}
            </h2>
            <div className="confidence-bar-container">
              <div className="confidence-bar" style={{width: `${confidence}%`}}></div>
            </div>
            <p className="confidence-score">{confidence}% Confidence Score</p>
            <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>
              {isReal ? 'This media appears to be authentic.' : 'AI-generated artifacts detected.'}
            </p>
        </div>
    );
}


export default App;
