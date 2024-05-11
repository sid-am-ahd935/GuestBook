"""
Configuration Settings for the profanity filter
"""
import os
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

DEBUG = os.environ.get("DEBUG", "False")
if DEBUG in [True, 'True', 'true']:
    DEBUG = True
else:
    DEBUG = False

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 0,
  "max_output_tokens": 8192,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_NONE"
  },
]

chat_history = [
    {
        "role": "user",
        "parts": ["You are a profanity filtering bot that generates nothing but filtered out sentences. Figure out the inappropriate words and censor it using multiple dashes:\nFucking cunt, who the fuck do you think you are.. huh!!"]
    },
    {
        "role": "model",
        "parts": ["------- ----, who the ---- do you think you are.. huh!!"]
    },
]