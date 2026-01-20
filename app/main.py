from fastapi import FastAPI, UploadFile, Form, Response, Depends
from fastapi.responses import JSONResponse, FileResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from pydantic import BaseModel
from typing import Annotated
import sqlite3
from sqlite3 import IntegrityError
import os
import hashlib
import binascii

# SQLite3 사용
con = sqlite3.connect("db.db", check_same_thread=False)
cur = con.cursor()

cur.execute(f"""
            CREATE TABLE IF NOT EXISTS items (
              id INTEGER PRIMARY KEY,
              title TEXT NOT NULL,
              image BLOB,
              description TEXT NOT NULL,
              price INTEGER NOT NULL,
              place TEXT NOT NULL,
              insertAt INTEGER NOT NULL
            )
            """)

app = FastAPI()


# signup
def hash_password(password: str, salt: bytes = None):
  if salt is None:
    salt = os.urandom(16)
    
  hashed = hashlib.pbkdf2_hmac(
    "sha256",
    password.encode(),
    salt,
    100_000
  )
  
  return (
    binascii.hexlify(hashed).decode(),
    binascii.hexlify(salt).decode()
  )

@app.post("/signup")
def signup(
           id: Annotated[str, Form()],
           password:Annotated[str, Form()],
           name:Annotated[str, Form()],
           email:Annotated[str, Form()]
           ):
  try:
    hashed_password, salt = hash_password(password)

    cur.execute(
      """
      INSERT INTO users(id, password, salt, name, email)
      VALUES (?, ?, ?, ?, ?)
      """,
      (id, hashed_password, salt, name, email)
    )
    con.commit()
    return "ok"

  except IntegrityError:
    return "duplicate"


# login
SECRET = "super-coding"
manager = LoginManager(SECRET, "/login")

class User(BaseModel):
  id: str
  name: str
  email: str
  password: str
  salt: str

@manager.user_loader()
def query_user(id: str):
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    row = cur.execute(
                      "SELECT * FROM users WHERE id= ?",
                      (id,)
                      ).fetchone()

    if not row:
      return None

    return User(**dict(row))


def verify_password(input_password, stored_hash, stored_salt):
  new_hash, _ = hash_password(
    input_password,
    bytes.fromhex(stored_salt)
  )
  return new_hash == stored_hash


@app.post("/login")
def login(
           id: Annotated[str, Form()],
           password: Annotated[str, Form()]
         ):
  user = query_user(id)

  if not user:
    raise InvalidCredentialsException
  # 조건이 맞을 수가 없음. password = 평문 / user['password'] = 해시값
  # elif password != user['password']:
  #   raise InvalidCredentialsException

  if not verify_password(password, user.password, user.salt):
    raise InvalidCredentialsException
  
  print("LOGIN ID:", id)
  print("USER:", user)
  print("PASSWORD MATCH:", verify_password(password, user.password, user.salt))


  access_token = manager.create_access_token(
    data={
      "sub": user.id,
      "name": user.name,
      "email": user.email,
    }
  )

  return {"access_token": access_token}



# 메인페이지
@app.get("/")

def read_index():
  return FileResponse(os.path.join("static", "index.html"))

# 유저 인증 성공 시, 메인 게시글 정보 보내주기
@app.get("/items")
async def get_items(user=Depends(manager)):
  con.row_factory = sqlite3.Row
  cur = con.cursor()
  rows = cur.execute(f"""
                    SELECT * FROM items;
                    """).fetchall()
  return JSONResponse(jsonable_encoder([dict(row) for row in rows]))


# 이미지 응답
@app.get("/images/{item_id}")
async def get_image(item_id):
  cur = con.cursor()
  # 16진법
  image_bytes = cur.execute(f"""
                            SELECT image from items WHERE id={item_id}
                            """).fetchone()[0]
  # 변환
  return Response(content=bytes.fromhex(image_bytes), media_type="image/*")



# write (글쓰기)
@app.post("/items")
async def create_item(image: UploadFile,
                      title: Annotated[str, Form()],
                      description: Annotated[str, Form()],
                      price: Annotated[int, Form()],
                      place: Annotated[str, Form()],
                      insertAt: Annotated[int, Form()],
                      user=Depends(manager)):
  image_bytes = await image.read()
  cur.execute(f"""
              INSERT INTO items(image, title, description, price, place, insertAt)
              VALUES ('{image_bytes.hex()}', '{title}', '{description}', {price}, '{place}', {insertAt})
              """)
  con.commit()
  return "200"



# Chat
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


app.mount("/static", StaticFiles(directory="static", html=True), name="static")