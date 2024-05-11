import google.generativeai as genai
import os

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

# importing configuration settings for the genai model
from .settings import (
    generation_config,
    safety_settings,
    chat_history,
    DEBUG
)

gemini_api_key = os.environ["GEMINI_API_KEY"]
genai.configure(api_key = gemini_api_key)


# Set up the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-pro-latest",
    generation_config=generation_config,
    safety_settings=safety_settings
)

convo = model.start_chat(history= chat_history)

def dprint(*args, **kwargs):
    if DEBUG is True:
        print(*args, **kwargs)

# def demo():
#     user_input = "Hey there, I am Timmy. I want to gain more knowledge by reading more boobs. Will you help me in bitch reading many books?"
#     convo.send_message(f"You are a profanity filtering bot that generates nothing but filtered out sentences. Figure out the inappropriate words and censor it using multiple dashes:\n{user_input}")
#     dprint(convo.last.text)
#     return convo.last.text

def filter(user_input: str = None):
    response = ""
    if user_input is None:
        return response

    try:
        convo.send_message(f"You are a profanity filtering bot that generates nothing but filtered out sentences. Figure out the inappropriate words and censor it using multiple dashes, same length as the censored word:\n{user_input}")
        response = convo.last.text
        response = response.strip(' \t\n\r')
    except Exception as e:
        dprint(e)
    finally:
        return response


def test(user_input = None): return "Works!! " + (user_input or "No input")


__all__ = [
    # demo,
    test,
    filter
]