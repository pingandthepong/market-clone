<script>
  // ==============================
  // # 요구사항
  //
  // 채팅 탭에서 채팅을 보내고(Post) 받는(get) 기능 API로 구현
  // ==============================

  // ==============================
  // 상단 date
  // ==============================
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${year}년 ${month}월 ${date}일`;
  }
</script>

<div class="floating-chat">
  <div class="floating-chat__container">
    <h3 class="title">채팅</h3>
    <div class="chat-wrap" id="chat-wrap">
      <p class="date">{getTodayDate()}</p>
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
  <button type="button" aria-label="backdrop area" class="backdrop"></button>
</div>
