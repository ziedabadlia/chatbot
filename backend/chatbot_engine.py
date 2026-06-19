import os
import requests
from datetime import datetime

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
API_URL = "https://models.inference.ai.azure.com/chat/completions"
MODEL = "gpt-4o-mini"

SYSTEM_PROMPT = """
You are CineBot, a chatbot that recommends movies.
Only talk about movies. If the user asks about something else, bring the conversation back to movies.
Keep your answers short, 2 or 3 sentences.
Always recommend a specific movie by name.
Ask the user follow up questions to understand what they want.
If you dont understand the user, ask them to say it differently.
Never recommend the same movie twice.
"""

class ChatbotEngine:

    def __init__(self):
        self.conversation_history = []
        self.fail_count = 0
        self.MAX_FAILS = 3

    def greet(self):
        greeting_text = "Hey! I'm CineBot 🎬 What kind of movies are you in the mood for?"
        return self.make_message("bot", greeting_text)

    def respond(self, user_input):
        self.conversation_history.append({
            "role": "user",
            "content": user_input
        })

        try:
            reply_text = self.call_api()
            self.fail_count = 0
        except Exception as e:
            print("api error:", e)
            self.fail_count += 1
            if self.fail_count >= self.MAX_FAILS:
                self.fail_count = 0
                self.conversation_history = []
                reply_text = "Sorry something went wrong too many times. Let's start over! What kind of movies do you like?"
            else:
                reply_text = "Sorry i didn't understand that. Can you say it differently?"

        self.conversation_history.append({
            "role": "assistant",
            "content": reply_text
        })

        return self.make_message("bot", reply_text)

    def call_api(self):
        headers = {
            "Authorization": "Bearer " + GITHUB_TOKEN,
            "Content-Type": "application/json"
        }

        messages_to_send = [{"role": "system", "content": SYSTEM_PROMPT}]
        for msg in self.conversation_history:
            messages_to_send.append(msg)

        request_body = {
            "model": MODEL,
            "messages": messages_to_send,
            "max_tokens": 150,
            "temperature": 0.7
        }

        response = requests.post(API_URL, headers=headers, json=request_body, timeout=10)
        response.raise_for_status()

        result = response.json()
        ai_reply = result["choices"][0]["message"]["content"]
        return ai_reply.strip()

    def make_message(self, sender, text):
        message = {
            "sender": sender,
            "text": text,
            "timestamp": datetime.now().strftime("%H:%M")
        }
        return message