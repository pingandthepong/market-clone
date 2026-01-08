// form에서 데이터가 전송됐을 때, 그 데이터를 서버에 보내기
const form = document.querySelector("#write-form");

const handleSubmitForm = async (e) => {
  e.preventDefault();

  await fetch("/items", {
    method: "POST",
    body: new FormData(form),
  });

  console.log("제출완료");
};

form.addEventListener("submit", handleSubmitForm);
