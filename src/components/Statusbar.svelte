<script>
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const time = `${hour}:${minutes}`;

  // Battery Level (Chrome, Edge, Opera 지원)
  let userBatteryLevel;

  if ("getBattery" in navigator) {
    navigator.getBattery().then((battery) => {
      const updateBattery = () => {
        userBatteryLevel = `${Math.round(battery.level * 100)}%`;
      };

      updateBattery(); // 초기값
      battery.addEventListener("levelchange", updateBattery);
    });
  } else {
    console.log("배터리 정보 미지원 브라우저");
    alert("배터리 정보 미지원 브라우저입니다. 임의의 값으로 표현됩니다.");
  }
</script>

<div class="status-bar">
  <div class="status-bar__wrap">
    <img src="/assets/signal.svg" alt="" />
    <span class="status-bar__text">KT</span>
    <img src="/assets/wifi.svg" alt="" />
  </div>
  <div class="status-bar__wrap">
    <span class="status-bar__text fw-semi-bold" id="currentTime">{time}</span>
  </div>
  <div class="status-bar__wrap">
    <img class="security" src="/assets/security.svg" alt="" />
    <img class="alarm" src="/assets/alarm.svg" alt="" />
    <span class="status-bar__text" id="userBattery">
      {userBatteryLevel ?? "50%"}
    </span>
    <img class="battery" src="/assets/battery.svg" alt="" />
  </div>
</div>
