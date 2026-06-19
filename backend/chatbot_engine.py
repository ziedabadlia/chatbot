import json
import os
import random
from datetime import datetime

class ChatbotEngine:

    def __init__(self):
        base = os.path.dirname(__file__)
        file = open(os.path.join(base, "intents.json"), "r")
        self.data = json.load(file)
        file.close()

        self.history = []
        self.failed_attempts = 0
        self.MAX_FAILS = 3
        self.used_responses = set()
        self.used_questions = set()

    def greet(self):
        text = self.data["greeting"]
        return self.make_message("bot", text)

    def respond(self, user_input):
        user_text = user_input.lower().strip()
        self.history.append(self.make_message("user", user_input))

        if self.failed_attempts >= self.MAX_FAILS:
            self.failed_attempts = 0
            self.used_responses = set()
            self.used_questions = set()
            msg = self.make_message("bot", self.data["hard_fallback"])
            self.history.append(msg)
            return msg

        matched_intent = self.find_intent(user_text)

        if matched_intent:
            self.failed_attempts = 0
            reply = self.pick_response(matched_intent)
            question = self.pick_question(matched_intent)
            if question:
                reply = reply + " " + question
            msg = self.make_message("bot", reply)
        else:
            self.failed_attempts += 1
            soft = random.choice(self.data["soft_fallbacks"])
            msg = self.make_message("bot", soft)

        self.history.append(msg)
        return msg

    def find_intent(self, text):
        for intent in self.data["intents"]:
            for keyword in intent["keywords"]:
                if keyword in text:
                    return intent
        return None

    def pick_response(self, intent):
        all_responses = intent["responses"]
        available = []
        for r in all_responses:
            if r not in self.used_responses:
                available.append(r)

        if len(available) == 0:
            available = all_responses

        choice = random.choice(available)
        self.used_responses.add(choice)
        return choice

    def pick_question(self, intent):
        all_questions = intent.get("follow_up_questions", [])
        available = []
        for q in all_questions:
            if q not in self.used_questions:
                available.append(q)

        if len(available) == 0:
            return None

        question = random.choice(available)
        self.used_questions.add(question)
        return question

    def make_message(self, sender, text):
        msg = {
            "sender": sender,
            "text": text,
            "timestamp": datetime.now().strftime("%H:%M")
        }
        return msg