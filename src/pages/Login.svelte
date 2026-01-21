<script>
  import Footer from "../components/Footer.svelte";
  import Statusbar from "../components/Statusbar.svelte";
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

<FloatingChat />
<MediaInfo />

<Footer />
