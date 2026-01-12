from fastapi import FastAPI, UploadFile, Form, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Annotated
import sqlite3

# SQLite3 사용
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

# write (글쓰기)
@app.post("/items")
async def create_item(image: UploadFile,
                      title: Annotated[str, Form()],
                      description: Annotated[str, Form()],
                      price: Annotated[int, Form()],
                      place: Annotated[str, Form()],
                      insertAt: Annotated[int, Form()]):
  image_bytes = await image.read()
  cur.execute(f"""
              INSERT INTO items(image, title, description, price, place, insertAt)
              VALUES ('{image_bytes.hex()}', '{title}', '{description}', {price}, '{place}', {insertAt})
              """)
  con.commit()
  return "200"

# 메인 게시글 정보 보내주기
@app.get("/items")
async def read_item():
  con.row_factory = sqlite3.Row
  cur = con.cursor()
  rows = cur.execute(f"""
                    SELECT * from items;
                    """).fetchall()
  return JSONResponse(jsonable_encoder(dict(row) for row in rows))

# 이미지 응답
@app.get("/images/{item_id}")
async def get_image(item_id):
  cur = con.cursor()
  # 16진법
  image_bytes = cur.execute(f"""
                            SELECT image from items WHERE id={item_id}
                            """).fetchone()[0]
  # 변환
  return Response(content=bytes.fromhex(image_bytes))

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")