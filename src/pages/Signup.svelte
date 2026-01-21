<script>
  import Statusbar from "../components/Statusbar.svelte";
  import Footer from "../components/Footer.svelte";
  import MediaInfo from "../components/MediaInfo.svelte";
  import FloatingChat from "../components/FloatingChat.svelte";
</script>

<header>
  <Statusbar />
</header>
<!-- main -->
<main>
  <section class="contents">
    <div class="header">
      <h2 class="title">회원가입</h2>
    </div>
    <form action="/signup" method="POST" id="signup-form">
      <div>
        <label for="id">아이디</label>
        <input type="text" id="id" name="id" required />
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div>
        <label for="password">비밀번호 확인</label>
        <input type="password" id="password2" name="password2" required />
      </div>
      <div>
        <label for="password">이름</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label for="email">이메일</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <button type="submit" class="submit-btn">회원 가입하기</button>
      </div>
      <div id="info"></div>
    </form>
  </section>
</main>

<FloatingChat />
<MediaInfo />

<Footer />
