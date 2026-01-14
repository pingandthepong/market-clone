const form = document.querySelector("#sign-up");

const checkPassword = () => {
  const formData = new FormData(form);
  const password1 = formData.get("password");
  const password2 = formData.get("password2");

  if (password1 === password2) return true;
  else return false;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const info = document.querySelector("#info");
  info.textContent = "";

  // 1️⃣ 비밀번호 먼저 검증
  if (!checkPassword()) {
    info.textContent = "비밀번호가 같지 않습니다.";
    info.style.color = "red";
    return;
  }

  // 2️⃣ 서버로 보낼 데이터 준비
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  // 3️⃣ POST 요청
  const res = await fetch("/signup", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();

  // 4️⃣ 응답 처리
  if (data === "ok") {
    info.textContent = "회원가입에 성공했습니다.";
    info.style.color = "green";
  } else if (data === "duplicate") {
    info.textContent = "이미 가입된 회원입니다.";
    info.style.color = "blue";
  }
};

form.addEventListener("submit", handleSubmit);
