// ==============================
// # 요구사항
//
// 채팅 탭에서 채팅을 보내고(Post) 받는(get) 기능 API로 구현
// ==============================

// ==============================
// 상단 date
// ==============================
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${year}년 ${month}월 ${date}일`;
}
const dateEl = document.querySelector(".date");
dateEl.textContent = getTodayDate();

// ==============================
// 채팅 보낸 시간
// ==============================
function getCurrentTime() {
  const today = new Date();
  const amPm = today.getHours() >= 12 ? "오후" : "오전";
  const hours = today.getHours() % 12 || 12;
  const minutes = today.getMinutes().toString().padStart(2, "0");
  return `${amPm}${hours}:${minutes}`;
}
const currentTimeEls = document.querySelectorAll(".current-time");

function renderTime() {
  const time = getCurrentTime();
  currentTimeEls.forEach((el) => {
    el.textContent = time;
  });
}

renderTime();

// ==============================
// Update
// ==============================
function updateChat(chat) {
  const chatWrap = document.querySelector("#chat-wrap");

  // 1. .chat.me
  const chatMe = document.createElement("div");
  chatMe.classList.add("chat", "me");

  // 2. .chat-box
  const chatBox = document.createElement("div");
  chatBox.classList.add("chat-box");

  // 3. .text
  const chatText = document.createElement("span");
  chatText.classList.add("text");
  chatText.textContent = chat.message;

  // 4. .current-time
  const currentTimeEl = document.createElement("div");
  currentTimeEl.classList.add("current-time");
  currentTimeEl.textContent = chat.time;

  // 조립
  chatWrap.appendChild(chatMe);
  chatMe.appendChild(chatBox);
  chatMe.appendChild(currentTimeEl);
  chatBox.appendChild(chatText);
}

// ==============================
// Create - GET 요청
// ==============================
async function readChat() {
  const res = await fetch("/chat");
  const data = await res.json();
  console.log(data);

  const chatList = document.querySelector("#chat-list");
  chatList.innerHTML = `
  <div class="chat you">
    <div class="chat-box">
      <img src="./assets/avatar-default.svg" alt="유저 아바타" />
      <span class="text">혹시 16일 화요일 오전은 어려우실까요?</span>
    </div>
    <div class="current-time">오전6:45</div>
  </div>
  `;
  data.forEach(updateChat);
}

// ==============================
// Create - POST 요청
// ==============================
async function createChat(value) {
  // post
  const res = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      time: getCurrentTime(),
      message: value,
    }),
  });
  readChat();
}

// ==============================
// Submit
// ==============================
function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector("#chat-input");
  createChat(input.value);
  input.value = "";
  renderTime();
}

const chatForm = document.querySelector("#chat-form");
chatForm.addEventListener("submit", handleSubmit);

// ==============================
// 채팅창 띄우기
// ==============================
function handleClickMenu() {
  const floatingChat = document.querySelector(".floating-chat");
  floatingChat.classList.add("show");
}

const menuChat = document.querySelector("#menu-chat");
menuChat.addEventListener("click", handleClickMenu);

// ==============================
// App Start
// ==============================
readChat();
