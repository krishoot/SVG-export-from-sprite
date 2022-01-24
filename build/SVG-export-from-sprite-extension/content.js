// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Отправить сообщение на активную вкладку
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });
//
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "open_new_tab" ) {
//       chrome.tabs.create({"url": request.url});
//     }
//   }
// );

// Example of a simple user data object
let xx = document.getElementsByTagName('use'),
    docUrl = document.baseURI;
// if( docUrl.slice(-1) === '/' ) {
//     docUrl = docUrl.substring(0, docUrl.length - 1)
// }

function contains(arr, elem) {
    return arr.find((i) => i === elem) !== -1;
}

let spriteUrls = [];
Array.from(xx).forEach((item, index) => {
    var s = new XMLSerializer();
    var strqw = s.serializeToString(item);
    let qq = strqw.split('href="');
    let ww = qq[1].split('#');
    let spriteUrl = docUrl + ww[0];
    function checkAndAdd(spriteUrl) {
        let spriteId = spriteUrls.length + 1;
        let spriteInArray = spriteUrls.some(function (el) {
            return el.url === spriteUrl;
        });
        if (!spriteInArray) { spriteUrls.push({ id: spriteId, url: spriteUrl }); }
    }

    checkAndAdd (spriteUrl);
})

chrome.runtime.sendMessage({
    total_elements: spriteUrls // or whatever you want to send
});