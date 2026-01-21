<script>
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const time = `${hour}:${minutes}`;
</script>

<div class="page-index">
  <!-- header -->
  <header>
    <div class="status-bar">
      <div class="status-bar__wrap">
        <img src="/assets/signal.svg" alt="" />
        <span class="status-bar__text">KT</span>
        <img src="/assets/wifi.svg" alt="" />
      </div>
      <div class="status-bar__wrap">
        <span class="status-bar__text fw-semi-bold" id="currentTime">
          {time}
        </span>
      </div>
      <div class="status-bar__wrap">
        <img class="security" src="/assets/security.svg" alt="" />
        <img class="alarm" src="/assets/alarm.svg" alt="" />
        <span class="status-bar__text" id="userBattery">50%</span>
        <img class="battery" src="/assets/battery.svg" alt="" />
      </div>
    </div>
    <div class="menu-bar">
      <div class="menu-bar-wrap location" data-toggle="location" role="button">
        <span class="main-location">대조동</span>
        <dialog class="my-location" closedby="any">
          <form method="dialog">
            <button value="대조동" class="text main">대조동</button>
            <button value="을지로2가" class="text">을지로2가</button>
            <a href="/location/settings" class="text">내 동네 설정</a>
          </form>
        </dialog>
        <img class="icon" src="/assets/chevron-down.svg" alt="" />
      </div>
      <div class="menu-bar-wrap icons">
        <img class="search" src="/assets/search.svg" alt="" />
        <div class="alert-wrap on" data-toggle="alert">
          <img class="alert" src="/assets/alert.svg" alt="" />
        </div>
        <img class="menu" src="/assets/menu.svg" alt="" />
      </div>
    </div>
  </header>
  <!-- // header -->

  <!-- main -->
  <main>
    <div role="tablist" class="chip-nav">
      <div class="tabs">
        <div role="tab" aria-selected="true">전체</div>
        <div role="tab" aria-selected="false">중고차</div>
        <div role="tab" aria-selected="false">동네소식</div>
        <div role="tab" aria-selected="false">알바</div>
        <div role="tab" aria-selected="false">키보드/마우스</div>
        <div role="tab" aria-selected="false">중고거래</div>
        <div role="tab" aria-selected="false">방금 전</div>
        <div role="tab" aria-selected="false">부동산</div>
        <div role="tab" aria-selected="false">가까운 동네</div>
        <div role="tab" aria-selected="false">만원당근</div>
      </div>
    </div>
    <section class="contents">
      <!-- <div class="item-list">
          <div class="item-list__img">
            <img src="/assets/image.svg" alt="" />
          </div>
          <div class="item-list__info">
            <h3 class="item-list__info-title">제목</h3>
            <div class="item-list__info-meta">
              <img src="/assets/map.svg" alt="" />
              <p class="item-list__info-meta__text">
                <span>0km</span>
                &middot;
                <span>oo동</span>
                &middot;
                <span>n시간 전</span>
              </p>
            </div>
            <p class="item-list__info-price">0원</p>
          </div>
          <button class="item-list__more">
            <img src="/assets/ellipsis-vertical.svg" alt="more info" />
          </button>
          <button class="item-list__favorite">
            <img src="/assets/favorite.svg" alt="" />
            0
          </button>
        </div> -->
    </section>
    <a href="#/write" class="write-btn">
      <img src="/assets/add.svg" alt="" />
      글쓰기
    </a>
  </main>
  <!-- // main -->

  <!-- footer -->
  <footer>
    <div class="footer-block">
      <div class="footer-icons on">
        <img src="/assets/home.svg" alt="" />
        <span class="title">홈</span>
      </div>
      <div class="footer-icons">
        <img src="/assets/community.svg" alt="" />
        <span class="title">동네생활</span>
      </div>
      <div class="footer-icons">
        <img src="/assets/map.svg" alt="" />
        <span class="title">동네지도</span>
      </div>
      <div class="footer-icons" id="menu-chat">
        <img src="/assets/chatting.svg" alt="" />
        <span class="title">채팅</span>
      </div>
      <div class="footer-icons">
        <img src="/assets/my.svg" alt="" />
        <span class="title">나의 당근</span>
      </div>
    </div>
  </footer>
  <!-- // footer -->

  <div class="floating-chat">
    <div class="floating-chat__container">
      <h3 class="title">채팅</h3>
      <div class="chat-wrap" id="chat-wrap">
        <p class="date">YYYY년 MM월 DD일</p>
        <div class="chat-list" id="chat-list">
          <div class="chat you">
            <div class="chat-box">
              <img src="/assets/avatar-default.svg" alt="유저 아바타" />
              <span class="text">혹시 16일 화요일 오전은 어려우실까요?</span>
            </div>
            <div class="current-time">오후6:45</div>
          </div>
          <div class="chat me">
            <div class="chat-box"><span class="text">가능합니다</span></div>
            <div class="current-time"></div>
          </div>
        </div>
      </div>
      <form action="" class="send-wrap" id="chat-form">
        <input
          type="text"
          placeholder="메시지 보내기"
          class="chat-input"
          id="chat-input"
          required
        />
        <button type="submit" class="chat-submit" id="chat-submit">
          <img src="/assets/send.svg" alt="메시지 보내기" />
        </button>
      </form>
    </div>
    <div class="backdrop"></div>
  </div>

  <div class="media-info-msg">화면 사이즈를 줄여주세요.</div>
</div>
