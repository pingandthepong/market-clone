function updateTime() {
  const HOUR = new Date().getHours();
  const MINUTE = new Date().getMinutes();
  const timeString = `${HOUR}:${MINUTE}`;

  const currentTimeEl = document.querySelector("#currentTime");
  currentTimeEl.textContent = timeString;
}
// 로드 시 실행
updateTime();
// 1분마다 업데이트
setInterval(updateTime, 60000);
