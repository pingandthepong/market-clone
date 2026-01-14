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

  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  const info = document.querySelector("#info");

  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data === "200") {
      info.textContent = "회원가입에 성공했습니다.";
      info.style.color = "green";
    }
  } else {
    info.textContent = "비밀번호가 같지 않습니다.";
    info.style.color = "red";
  }
};

form.addEventListener("submit", handleSubmit);
