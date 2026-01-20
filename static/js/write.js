const form = document.querySelector("#write-form");

const handleSubmitForm = async (e) => {
  e.preventDefault();

  const body = new FormData(form);
  // UTC 기준 (FormData 보낼 때)
  body.append("insertAt", new Date().getTime());

  try {
    const accessToken = window.localStorage.getItem("token");
    const res = await fetch("/items", {
      method: "POST",
      body,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (data === "200") window.location.pathname = "/";
  } catch (e) {
    console.error(e);
  }
};

form.addEventListener("submit", handleSubmitForm);
