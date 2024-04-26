chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.contentScriptQuery === "processHtml") {
            const apiUrl = 'http://127.0.0.1:2222/process';

            console.log("Sending HTML to:", apiUrl);

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ html: request.html })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log("Data received from server:", data);
                sendResponse({result: data.result});
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                sendResponse({result: 'Failed to fetch data. Error: ' + error.message});
            });

            return true;
        }
    }
);