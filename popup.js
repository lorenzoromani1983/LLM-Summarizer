document.getElementById('processUrl').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: getPageHTML
        }, (injectionResults) => {
            for (const frameResult of injectionResults)
                chrome.runtime.sendMessage({
                    contentScriptQuery: "processHtml",
                    html: frameResult.result
                }, response => {
                    document.getElementById('urlResult').textContent = response.result;
                });
        });
    });
});

function getPageHTML() {
    return document.documentElement.outerHTML;
}