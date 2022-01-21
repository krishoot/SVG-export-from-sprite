let xx = document.getElementsByTagName('use'),
    docUrl = document.baseURI;
if( docUrl.slice(-1) === '/' ) {
    docUrl = docUrl.substring(0, docUrl.length - 1)
}

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
        let id = spriteUrls.length + 1;
        let found = spriteUrls.some(function (el) {
            return el.url === spriteUrl;
        });
        if (!found) { spriteUrls.push({ id: id, url: spriteUrl }); }
    }

    checkAndAdd (spriteUrl);
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if( request.message === "clicked_browser_action" ) {
      var firstHref = document.getElementsByTagName('a')[0].getAttribute('href');

      console.log(firstHref);

      // Эта строка новая!
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
});