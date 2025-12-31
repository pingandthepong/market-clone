// 클릭하면 on이 붙도록 하기

document.addEventListener("click", (e) => {
  // test
  console.log("document click 이벤트");

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
      console.log("handleToggle 이벤트");
      toggleLocation(el, isOn);
      break;
    case "alert":
      toggleAlert(el);
      break;
  }
}

const menubarLocation = document.querySelector(".menu-bar-wrap.location");
const myLocation = document.querySelector(".my-location");
const mainLocation = document.querySelector(".main-location");

// 값 선택
myLocation.addEventListener("click", (e) => {
  // test
  console.log("myLocation click 이벤트");

  e.stopPropagation();

  if (e.target.value) {
    const prevMain = myLocation.querySelector(".main");
    if (prevMain) prevMain.classList.remove("main");

    mainLocation.textContent = e.target.value;
    e.target.classList.add("main");
    myLocation.close();
  }
});

// 닫힐 때(배경 클릭 포함) 아이콘 방향 원복
myLocation.addEventListener("close", () => {
  // test
  console.log("myLocation close 이벤트");

  menubarLocation.classList.remove("on");
});

function toggleLocation(el, isOn) {
  // test
  console.log("toggleLocation 이벤트");

  // 위치 계산
  const rect = menubarLocation.getBoundingClientRect();
  myLocation.style.top = `${rect.bottom + 8}px`;
  myLocation.style.left = `${rect.left}px`;

  // 열고 닫기
  if (isOn) {
    myLocation.showModal();
  } else {
    myLocation.close();
  }

  // safari 대응
  const safari = "Apple Computer, Inc.";
  if (navigator.vendor == safari && isOn) {
    document.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    myLocation.addEventListener("click", () => {
      myLocation.close();
    });
  }
}
