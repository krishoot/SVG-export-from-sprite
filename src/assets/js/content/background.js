chrome.action.onClicked.addListener((tab) => {
    console.log('open' + tab.id);
})