// 클릭하면 on이 붙도록 하기

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-toggle]");
  if (!target) return;

  target.classList.toggle("on");

  handleToggle(target);
});

function handleToggle(el) {
  const type = el.dataset.toggle;
  const isOn = el.classList.contains("on");

  switch (type) {
    case "location":
      toggleLocation(el, isOn);
      break;
    case "alert":
      toggleAlert(el, isOn);
      break;
  }
}

function toggleLocation(el, isOn) {
  const menuLocationIcon = document.querySelector(".menu-bar .location .icon");

  if (isOn) {
    // on이 붙은 상태에서 클릭하면 36deg
    el.addEventListener("click", (e) => {
      menuLocationIcon.classList.add("turn-right");

      if (!el.classList.contains("on")) {
        menuLocationIcon.classList.remove("turn-right");
      }
    });
  }
}
function toggleAlert(el, isOn) {
  // if (isOn) openAlertModal();
  // else closeAlertModal();
}
