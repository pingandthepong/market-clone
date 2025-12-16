function updateTime() {
  const currentTimeEl = document.querySelector("#currentTime");
  const HOUR = new Date().getHours();
  const MINUTE = new Date().getMinutes();
  const timeString = `${HOUR}:${MINUTE}`;
  currentTimeEl.textContent = timeString;
}
// 로드 시 실행
updateTime();
// 1분마다 업데이트
setInterval(updateTime, 60000);
