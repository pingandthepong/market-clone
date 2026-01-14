const form = document.querySelector("#login-form");

const handleSubmit = async (e) => {
  e.preventDefault();

  const info = document.querySelector("#info");
  info.textContent = "";

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
    alert("로그인 성공");
    window.location.pathname = "/";
  } else if (res.status === 401) {
    info.textContent = "아이디 혹은 비밀번호가 틀렸습니다.";
    info.style.color = "blue";
  }

  console.log("access_token", data);
};

form.addEventListener("submit", handleSubmit);
