<script>
  export let location;

  const moveTo = (target) => {
    location = target;
    window.location.hash = `/${target}`;
  };
</script>

<footer>
  <div class="footer-block">
    <button class="footer-icons" on:click={() => moveTo("")}>
      {#if location === ""}
        <img src="/assets/home_on.svg" alt="" />
        <span class="title on">홈</span>
      {:else}
        <img src="/assets/home.svg" alt="" />
        <span class="title">홈</span>
      {/if}
    </button>
    <button class="footer-icons">
      <img src="/assets/community.svg" alt="" />
      <span class="title">동네생활</span>
    </button>
    <button class="footer-icons">
      <img src="/assets/map.svg" alt="" />
      <span class="title">동네지도</span>
    </button>
    <button class="footer-icons" id="menu-chat">
      <img src="/assets/chatting.svg" alt="" />
      <span class="title">채팅</span>
    </button>
    <button class="footer-icons" on:click={() => moveTo("my")}>
      {#if location === "my"}
        <img src="/assets/my_on.svg" alt="" />
        <span class="title on">나의 당근</span>
      {:else}
        <img src="/assets/my.svg" alt="" />
        <span class="title">나의 당근</span>
      {/if}
    </button>
  </div>
</footer>
