from flask import Flask
from flask_sock import Sock
from flask_cors import CORS
from dotenv import load_dotenv
from chatbot_engine import ChatbotEngine
import json

load_dotenv()

app = Flask(__name__)
CORS(app)
sock = Sock(app)

@sock.route('/chat')
def chat(ws):
    mybot = ChatbotEngine()
    first_message = mybot.greet()
    ws.send(json.dumps(first_message))

    while True:
        try:
            incoming = ws.receive()
            if incoming is None:
                break
            data = json.loads(incoming)
            user_text = data["message"]
            bot_reply = mybot.respond(user_text)
            ws.send(json.dumps(bot_reply))
        except Exception as e:
            print("error:", e)
            break

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)