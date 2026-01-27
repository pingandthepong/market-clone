<script>
  import Nav from "../components/Nav.svelte";
  import Statusbar from "../components/Statusbar.svelte";
  import FloatingChat from "../components/FloatingChat.svelte";
  import MediaInfo from "../components/MediaInfo.svelte";
  import { user$ } from "../store.js";

  const logout = () => {
    user$.set(null);
    localStorage.removeItem("token");
  };
</script>

<header>
  <Statusbar />
</header>
<main>
  <section class="contents">
    <h1 class="title">나의 당근</h1>
    <button type="button" class="logout-btn" on:click={logout}>로그아웃</button>
  </section>
</main>

<FloatingChat />
<MediaInfo />

<Nav location="my" />

<style>
  .logout-btn {
    display: block;
    width: 96%;
    height: 44px;
    margin: 24px auto;
    background-color: #aaa;
    color: #fff;
    border-radius: 6px;
    font-size: 14px;

    &:hover {
      background-color: gray;
    }
  }
</style>
