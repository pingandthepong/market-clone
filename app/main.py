from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

class Chat(BaseModel):
  time: str
  message: str

chats = []

@app.post("/chat")
def create_chat(chat: Chat):
  chats.append(chat)
  return "채팅 추가 성공"

@app.get("/chat")
def read_chat():
  return chats

# write (내 물건 팔기)

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")