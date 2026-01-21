<!-- header -->
<header>
  <div class="status-bar">
    <div class="status-bar__wrap">
      <img src="/static/assets/signal.svg" alt="" />
      <span class="status-bar__text">KT</span>
      <img src="/static/assets/wifi.svg" alt="" />
    </div>
    <div class="status-bar__wrap">
      <span class="status-bar__text fw-semi-bold" id="currentTime">HH:MM</span>
    </div>
    <div class="status-bar__wrap">
      <img class="security" src="/static/assets/security.svg" alt="" />
      <img class="alarm" src="/static/assets/alarm.svg" alt="" />
      <span class="status-bar__text" id="userBattery">50%</span>
      <img class="battery" src="/static/assets/battery.svg" alt="" />
    </div>
  </div>
</header>
<!-- // header -->

<!-- main -->
<main>
  <section class="contents">
    <div class="header">
      <h2 class="title">로그인</h2>
    </div>
    <form action="/signup" method="POST" id="login-form">
      <div>
        <label for="id">아이디</label>
        <input type="text" id="id" name="id" required />
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div>
        <button type="submit" class="submit-btn">로그인</button>
      </div>
      <div id="info"></div>
    </form>
  </section>
</main>

<!-- footer -->
<footer>
  <div class="footer-block">
    <div class="footer-icons on">
      <img src="/static/assets/home.svg" alt="" />
      <span class="title">홈</span>
    </div>
    <div class="footer-icons">
      <img src="/static/assets/community.svg" alt="" />
      <span class="title">동네생활</span>
    </div>
    <div class="footer-icons">
      <img src="/static/assets/map.svg" alt="" />
      <span class="title">동네지도</span>
    </div>
    <div class="footer-icons" id="menu-chat">
      <img src="/static/assets/chatting.svg" alt="" />
      <span class="title">채팅</span>
    </div>
    <div class="footer-icons">
      <img src="/static/assets/my.svg" alt="" />
      <span class="title">나의 당근</span>
    </div>
  </div>
</footer>
<!-- // footer -->

<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>
