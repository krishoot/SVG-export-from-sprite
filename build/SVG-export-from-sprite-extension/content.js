chrome.runtime.onMessage.addListener((function(e,t,n){if(1===e.type){let e=document.getElementsByTagName("use"),t=document.baseURI,r=[];Array.from(e).forEach((e=>{let n=(new XMLSerializer).serializeToString(e);!function(e){let t=r.length+1;r.some((function(t){return t.url===e}))||r.push({id:t,url:e})}(t+n.split('href="')[1].split("#")[0])})),n({type:1,total_elements:r})}return!0}));