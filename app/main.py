from fastapi import FastAPI, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Annotated

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
@app.post("/items")
def create_item(
  image: UploadFile,
  title: Annotated[str, Form()], # Form 데이터 형식으로, 문자열로 온다.
  description: Annotated[str, Form()],
  price: Annotated[int, Form()],
  place: Annotated[str, Form()]
  ):
  print(image, title, description, price, place)
  return "200"

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")