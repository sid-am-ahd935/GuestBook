import os
from fastapi import FastAPI
from pydantic import BaseModel
from profanity_filter import filter, test
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())


# Model Inputs for Different Request Through Body
class UserInput(BaseModel):
    user_input: str

class TestInput(BaseModel):
    test_input: str


openapi_url = None
if(os.environ.get("DEBUG", None) in [True, "True", "true"]):
    openapi_url= os.environ.get("OPENAPI_URL", "/openapi.json")


app = FastAPI(openapi_url=openapi_url)

@app.get("/")
async def root():
    return {
        "status" : 200,
        "message": "Profanity Filter API. Use POST method at /filter"
    }

@app.get("/test")
@app.post("/test")
async def testRoute(req: TestInput= None):
    return {
        "status" : 200,
        "message": test(req.test_input if req else None)
    }

@app.post("/filter")
async def filterRoute(req: UserInput):
    return {
        "status": 200,
        "message": filter(req.user_input)
    }

if(__name__ == "__main__"):
    f"""
    For development purposes, run directly or use fastapi dev {__file__}
    """
    import uvicorn
    uvicorn.run("app:app", host= "127.0.0.1", port= 4000, reload= True)