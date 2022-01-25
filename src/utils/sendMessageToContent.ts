async function getActiveTab(): Promise<chrome.tabs.Tab|undefined> {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});

    return tabs[0];
}

export async function sendMessageToContent(
    request: any,
    errorMessage: string,
    errorCallback: (errorObject?: any) => void,
    successCallback: (response: any) => void,
): Promise<void> {
    const tab = await getActiveTab();

    if (tab?.id) {
        chrome.tabs.sendMessage(
            tab.id,
            request,
            async (response: any) => {
                if (chrome.runtime.lastError) {
                    // eslint-disable-next-line no-console
                    console.debug(errorMessage, chrome.runtime.lastError.message);
                    errorCallback(chrome.runtime.lastError);
                } else {
                    successCallback(response);
                }
            },
        );
    }
}
