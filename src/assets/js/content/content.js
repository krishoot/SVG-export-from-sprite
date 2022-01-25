chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if (request.type === 1) {
            let collectUse = document.getElementsByTagName('use'),
                documentUrl = document.baseURI,
                spriteUrls = [];
            Array.from(collectUse).forEach((item) => {
                let serializer = new XMLSerializer();
                let serializerString = serializer.serializeToString(item);
                let spriteUrl = documentUrl + serializerString.split('href="')[1].split('#')[0];

                function checkAndAdd(spriteUrl) {
                    let spriteId = spriteUrls.length + 1;
                    let spriteInArray = spriteUrls.some(function (el) {
                        return el.url === spriteUrl;
                    });
                    if (!spriteInArray) { spriteUrls.push({ id: spriteId, url: spriteUrl }); }
                }

                checkAndAdd (spriteUrl);
            })

            sendResponse({
                type: 1,
                total_elements: spriteUrls
            });
        }

        return true;
    }
);
