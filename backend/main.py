import os
from typing import List
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI
from pydantic import BaseModel
from student_evaluation_agent import StudentEvaluationAgent
from dotenv import load_dotenv

load_dotenv()
print("KEY:", repr(os.getenv("GROQ_API_KEY")))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = StudentEvaluationAgent()
client = AsyncOpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.environ["GROQ_API_KEY"],
)

class Message(BaseModel):
    role: str
    content: str

class EvaluationRequest(BaseModel):
    message: str
    history: List[Message] = []

@app.post("/evaluate")
async def evaluate(req: EvaluationRequest):
    history = [m.model_dump() for m in req.history]
    return StreamingResponse(
        agent.evaluate_student(req.message, history),
        media_type="text/plain",
    )

@app.post("/message")
async def send_message(messages: List[Message]):
    stream = await client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[m.model_dump() for m in messages],
        temperature=0.7,
        stream=True,
    )

    async def generate():
        async for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

    return StreamingResponse(generate(), media_type="text/plain")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)