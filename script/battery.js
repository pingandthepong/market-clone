// Battery Level (Chrome, Edge, Opera 지원)

const userBattery = document.querySelector("#userBattery");

if ("getBattery" in navigator) {
  navigator.getBattery().then((battery) => {
    const updateBattery = () => {
      userBattery.textContent = `${Math.round(battery.level * 100)}%`;
    };

    updateBattery(); // 초기값
    battery.addEventListener("levelchange", updateBattery);
  });
} else {
  console.log("배터리 정보 미지원 브라우저");
  userBattery.title =
    "배터리 정보 미지원 브라우저입니다. 임의의 값으로 표현됩니다.";
}
