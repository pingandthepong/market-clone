<script>
  import { getDatabase, ref, push, set } from "firebase/database";
  import { preprocess } from "svelte/compiler";
  import Statusbar from "../components/Statusbar.svelte";
  import Footer from "../components/Footer.svelte";
  import MediaInfo from "../components/MediaInfo.svelte";
  import FloatingChat from "../components/FloatingChat.svelte";

  let title;
  let description;
  let price;
  let place;

  async function writeUserData() {
    const db = getDatabase();
    push(ref(db, "items/"), {
      title,
      description,
      price,
      place,
    });
  }
</script>

<div class="page-write">
  <header>
    <Statusbar />
  </header>

  <!-- main -->
  <main>
    <section class="contents">
      <div class="header">
        <h2 class="title">내 물건 팔기</h2>
        <a href="/" class="close-btn">X</a>
        <button class="save">임시 저장</button>
      </div>
      <form
        action=""
        id="write-form"
        on:submit|preventDefault={writeUserData(writeUserData)}
      >
        <!-- db column과 name값 맞추기 -->
        <!-- <div>
          <label for="image">이미지</label>
          <input type="file" id="image" name="image" />
        </div> -->
        <div>
          <label for="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="제목을 입력해주세요."
            required
            bind:value={title}
          />
        </div>
        <div>
          <label for="description">자세한 설명</label>
          <textarea
            cols="34"
            rows="8"
            name="description"
            id="description"
            placeholder="대조동에 올릴 게시글 내용을 작성해 주세요. (판매 금지 물품은 게시가 제한될 수 있어요.)
              
신뢰할 수 있는 거래를 위해 자세히 적어주세요. 과학기술정보통신부, 한국 인터넷진흥원과 함께 해요."
            bind:value={description}
          ></textarea>
        </div>
        <div>
          <label for="price">가격</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="₩ 가격을 입력해주세요."
            required
            bind:value={price}
          />
        </div>
        <div>
          <label for="place">거래 정보</label>
          <p>거래 희망 장소</p>
          <input type="text" id="place" name="place" bind:value={place} />
        </div>
        <div class="floating-btn__container">
          <button type="submit" id="write__submit-btn">작성 완료</button>
        </div>
      </form>
    </section>
  </main>
  <!-- // main -->

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

  <FloatingChat />
  <MediaInfo />
</div>

<Footer />
