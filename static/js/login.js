const form = document.querySelector("#login-form");
let accessToken = null;

const handleSubmit = async (e) => {
  e.preventDefault();

  const info = document.querySelector("#info");
  info.textContent = "";
  const getBtn = document.createElement("button");
  getBtn.type = "button";
  getBtn.textContent = "상품 가져오기";

  // 1️⃣ 서버로 보낼 데이터 준비
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  // 2️⃣ POST 요청
  const res = await fetch("/login", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();

  // 3️⃣ 응답 처리
  if (res.status === 200) {
    accessToken = data.access_token;
    window.localStorage.setItem("token", accessToken);
    alert("로그인되었습니다.");
    window.location.pathname = "/static";
  } else if (res.status === 401) {
    info.textContent = "아이디 혹은 비밀번호가 틀렸습니다.";
    info.style.color = "blue";
  }
};

form.addEventListener("submit", handleSubmit);
