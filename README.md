# LLM-Summarizer
With some help from GPT-4 I created this helpful assistant that can be useful when you need to get a quick excerpt from a webpage.
The Chrome extension will return a summary of the current Chrome tab by leveraging the llama3 Large Language Model (8 billion parameters), installed locally using Ollama.

To run the extension you will need:

a) Python3 with the following libraries installed:
- newspaper4k > pip install newspaper4k
- ollama > pip install ollama
- Flask > pip install flask
- flask_cors > pip install flask_cors

b) ollama > install, following instructions at https://ollama.com/ - once installed you will need to pull the llama3:8b language model using the terminal command: 

> ollama pull llama3:8b 

c) download the extension files to a folder and install it in Chrome (go to chrome://extensions) as an unpacked extension ("Load unpacked" - you will need to enable the Developer Mode before, turning the top-right switch on).

Usage is very simple.

a) run the server.py file that needs to keep running all the time.

b) get a summary of any web page by clicking the extension and then "Get Summary"

There are other similar tools doing the same thing. However, I choose a slightly different solution that requires a server running in the background.
In fact, I send the whole HTML of the web page to a process that pulls the *relevant text of the webpage* and not just *all the visible text*. 
This solution ensures that non-relevant content, that can "pollute" the final LLM summarization, is not included in the prompt being passed on to the LLM. 
In order to this, the HTML page is sent to server.py; this extracts the relevant text using the newspaper4k python library (an evolution of unmantained newspaper3k).
This solution is specifically designed to extract text from news articles, so it may fail when the page is not easily parsable (for instance: forums/threads/specific HTML formats may be extracted partially or non extracted at all - however this happens quite rarely).

This extension was born very quickly, so please suggest improvements/bugfixes.

Have fun!
