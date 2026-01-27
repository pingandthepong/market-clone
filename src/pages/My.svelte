<script>
  import Footer from "../components/Footer.svelte";
  import Statusbar from "../components/Statusbar.svelte";
  import FloatingChat from "../components/FloatingChat.svelte";
  import MediaInfo from "../components/MediaInfo.svelte";
</script>

<header>
  <Statusbar />
</header>
<main>
  <section class="contents">
    <div>My</div>
  </section>
</main>

<FloatingChat />
<MediaInfo />

<Footer location="my" />
