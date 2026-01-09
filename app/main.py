from fastapi import FastAPI, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Annotated
import sqlite3

con = sqlite3.connect("db.db", check_same_thread=False)
cur = con.cursor()

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
async def create_item(image: UploadFile,
                title: Annotated[str, Form()],
                description: Annotated[str, Form()],
                price: Annotated[int, Form()],
                place: Annotated[str, Form()]
               ):

  image_bytes = await image.read()
  cur.execute(f"""
              INSERT INTO items(image, title, description, price, place)
              VALUES ('{image_bytes.hex()}', '{title}', '{description}',{price}, '{place}')
              """)
  con.commit()
  return "200"

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")