from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/api/test', methods=['GET', 'POST'])
def hello_world():
    return 'Hello World!'

@app.route('/api/messages', methods=['GET', 'POST'])
def add_message():
    content = request.json

    messages = [{'id': 1, 'message': 'Message 01!'}, {'id': 2, 'message': 'Message 02!'}]
    messages.append({'id': 3, 'message': content['message']})

    return jsonify({"messages": messages})

if __name__ == '__main__':
    app.run(host= '0.0.0.0',debug=True)