<script>
  import Statusbar from "../components/Statusbar.svelte";
  import Footer from "../components/Nav.svelte";
  import Nav from "../components/Nav.svelte";
</script>

<header>
  <Statusbar />
</header>
<div>
  <span class="loader" aria-label="loading spinner"></span>
</div>
<Nav location="" />

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 70px);
  }
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid var(--primary);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 0.25s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
