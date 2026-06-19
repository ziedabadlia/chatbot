from flask import Flask
from flask_sock import Sock
from flask_cors import CORS
from chatbot_engine import ChatbotEngine
import json

app = Flask(__name__)
CORS(app)
sock = Sock(app)

@sock.route('/chat')
def chat(ws):
    engine = ChatbotEngine()
    ws.send(json.dumps(engine.greet()))

    while True:
        try:
            data = ws.receive()
            if data is None:
                break
            payload = json.loads(data)
            user_message = payload.get("message", "")
            response = engine.respond(user_message)
            ws.send(json.dumps(response))
        except Exception:
            break

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)