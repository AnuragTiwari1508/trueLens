(function(){chrome.runtime.onMessage.addListener((e,t,s)=>{e.type==="GET_SELECTION"?s({text:window.getSelection().toString()}):e.type==="START_CAPTURE_MODE"?x():e.type==="SHOW_RESULT"?E(e.data,e.kind):e.type==="SHOW_LOADING"?w(e.message):e.type==="SHOW_ERROR"&&C(e.message)});let r=null;function m(){return r&&document.body.removeChild(r),r=document.createElement("div"),r.className="truelens-overlay",document.body.appendChild(r),r}function w(e){const t=m();t.innerHTML=`
        <div class="truelens-modal-overlay">
            <div class="truelens-box animated-slide-in" style="max-width: 300px; padding: 2rem; text-align: center;">
                <div class="truelens-spinner"></div>
                <p style="margin-top: 1rem; font-weight: 500;">${e}</p>
                <button id="truelens-close-loading" class="truelens-btn-secondary" style="margin-top: 1rem; width: 100%;">Cancel</button>
            </div>
        </div>
    `,document.getElementById("truelens-close-loading").onclick=()=>{t.classList.add("fade-out"),setTimeout(()=>{t.parentNode&&document.body.removeChild(t),r=null},300)}}function C(e){const t=m();t.innerHTML=`
        <div class="truelens-modal-overlay">
            <div class="truelens-box animated-slide-in" style="max-width: 350px; padding: 1.5rem; text-align: center; border-color: var(--tl-error);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">❌</div>
                <h3 style="color: var(--tl-error); margin-bottom: 0.5rem;">Analysis Error</h3>
                <p style="color: var(--tl-muted); font-size: 0.9rem; line-height: 1.5;">${e}</p>
                <button id="truelens-close-error" class="truelens-btn-primary" style="margin-top: 1.5rem; width: 100%;">Close</button>
            </div>
        </div>
    `,document.getElementById("truelens-close-error").onclick=()=>{t.classList.add("fade-out"),setTimeout(()=>{t.parentNode&&document.body.removeChild(t),r=null},300)}}function E(e,t){console.log("Showing Overlay for:",t,e);const s=m();let d="";if(!e)d='<p class="truelens-error">No data received from analysis.</p>';else if(t==="fakenews"){const i=e.claims||(Array.isArray(e)?e:[]),l=e.summary||"";d=`
            <div class="truelens-result-container">
                ${l?`<div class="truelens-summary-section">
                    <strong>Summary</strong>
                    <p>${l}</p>
                </div>`:""}
                <div class="truelens-claims-list">
                    ${i.length>0?i.map(n=>{const a=(n.verdict||"Unknown").toLowerCase(),h=n.support_score||0,g=n.claim?.original_text||n.text||"Claim",b=n.rationale||"No rationale provided.";return`
                        <div class="truelens-claim-item ${a}">
                            <div class="truelens-claim-header">
                                <span class="truelens-verdict-tag">${a.toUpperCase()}</span>
                                <span class="truelens-score">${h}% Confidence</span>
                            </div>
                            <p class="truelens-claim-text">"${g}"</p>
                            <p class="truelens-rationale">${b}</p>
                            ${n.citations&&n.citations.length>0?`
                                <div class="truelens-sources">
                                    <strong>Sources:</strong>
                                    ${n.citations.map(v=>`<a href="${v.url}" target="_blank">🔗 ${v.source_title||"Source"}</a>`).join("")}
                                </div>
                            `:""}
                        </div>
                    `}).join(""):'<p class="truelens-no-claims">No specific claims verified, but check the summary above.</p>'}
                </div>
            </div>
        `}else if(t==="deepfake"){const i=Array.isArray(e)?e[0]:e;let l="Unknown",n=0;if(i&&typeof i=="object"&&(l=i.label||"Detected",i.confidences&&i.confidences.length>0)){const a=i.confidences[0];l=a.label,n=Math.round(a.confidence*100)}d=`
            <div class="truelens-deepfake-container">
                <div class="truelens-deepfake-badge ${l.toLowerCase()}">
                    <div class="truelens-badge-icon">${l==="Real"?"✅":"🚫"}</div>
                    <div class="truelens-badge-info">
                        <strong>${l}</strong>
                        <span>${n}% Confidence</span>
                    </div>
                </div>
                <div class="truelens-raw-json">
                    <details>
                        <summary>View Raw Analysis</summary>
                        <pre>${JSON.stringify(e,null,2)}</pre>
                    </details>
                </div>
            </div>
        `}s.innerHTML=`
        <div class="truelens-modal-overlay">
            <div class="truelens-box animated-slide-in">
                <div class="truelens-header">
                    <div class="truelens-logo">
                        <span class="logo-icon">🔍</span>
                        <h3>TrueLens Analysis</h3>
                    </div>
                    <button id="truelens-close" title="Close Result">×</button>
                </div>
                <div class="truelens-content">
                    ${d}
                </div>
                <div class="truelens-footer">
                    <p>AI-Powered Verification by TrueLens</p>
                </div>
            </div>
        </div>
    `,document.getElementById("truelens-close").onclick=()=>{s.classList.add("fade-out"),setTimeout(()=>{s.parentNode&&document.body.removeChild(s),r=null},300)}}let o=null,c,u;function x(){document.body.style.cursor="crosshair",document.addEventListener("mousedown",p);const e=document.createElement("div");e.id="truelens-capture-dim",document.body.appendChild(e)}function p(e){e.preventDefault(),c=e.clientX,u=e.clientY,o=document.createElement("div"),o.id="truelens-selection",o.style.left=c+"px",o.style.top=u+"px",document.body.appendChild(o),document.addEventListener("mousemove",y),document.addEventListener("mouseup",f)}function y(e){const t=e.clientX,s=e.clientY,d=Math.abs(t-c),i=Math.abs(s-u),l=Math.min(t,c),n=Math.min(s,u);o.style.width=d+"px",o.style.height=i+"px",o.style.left=l+"px",o.style.top=n+"px"}async function f(e){document.removeEventListener("mousemove",y),document.removeEventListener("mouseup",f),document.removeEventListener("mousedown",p),document.body.style.cursor="default";const t=o.getBoundingClientRect(),s=document.getElementById("truelens-capture-dim");s&&document.body.removeChild(s),document.body.removeChild(o),o=null,!(t.width<10||t.height<10)&&(chrome.runtime.sendMessage({type:"PROCESS_CROP_REQUEST"}),chrome.runtime.sendMessage({type:"CAPTURE_AND_CROP",area:{x:t.x,y:t.y,width:t.width,height:t.height,devicePixelRatio:window.devicePixelRatio}}))}
})()