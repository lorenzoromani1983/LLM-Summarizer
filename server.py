from flask import Flask, request, jsonify
from newspaper import Article
#from trafilatura import html2txt uncomment this line and comment line 2 if you want to use the trafilatura library
import ollama
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])

def process_url():
    data = request.get_json()
    html = data['html']
    print("received html input")

    article = Article("https://example.com")
    article.download(input_html=html)
    article.parse()
    text = article.text

    #text = html2txt(html) uncomment this line and comment lines 17-20 if you want to use the trafilatura library
    
    print("------------------------\nElaborating on:", text.strip())

    response = ollama.chat(model='llama3:8b', messages=[{
    'role': 'user',
    'content': "Summarize, in english, the following content:\n"+text,
    'stream':True
        },
    ])

    summary = response['message']['content']

    return jsonify(result=summary)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=2222, debug=True)
