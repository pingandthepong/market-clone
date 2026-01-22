<script>
  import { getDatabase, ref, onValue } from "firebase/database";
  import Statusbar from "../components/Statusbar.svelte";
  import Footer from "../components/Footer.svelte";
  import MediaInfo from "../components/MediaInfo.svelte";
  import FloatingChat from "../components/FloatingChat.svelte";
  import { onMount } from "svelte";

  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const time = `${hour}:${minutes}`;

  // $: 반응형 변수 => 값이 바뀌면 자동으로 렌더링 변경
  $: items = [];

  const db = getDatabase();
  const itemsRef = ref(db, "items/");

  onMount(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data);
    });
  });
</script>

<div class="page-index">
  <!-- header -->
  <header>
    <Statusbar />
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
      {#each items as item}
        <!-- svelte migration -->
        <div class="item-list">
          <div class="item-list__img">
            <img src="/assets/image.svg" alt="" />
          </div>
          <div class="item-list__info">
            <h3 class="item-list__info-title">{item.title}</h3>
            <div class="item-list__info-meta">
              <img src="/assets/map.svg" alt="" />
              <p class="item-list__info-meta__text">
                <span>0km</span>
                &middot;
                <span>{item.place}동</span>
                &middot;
                <span>n시간 전</span>
              </p>
            </div>
            <p class="item-list__info-price">{item.price}원</p>
          </div>
          <button class="item-list__more">
            <img src="/assets/ellipsis-vertical.svg" alt="more info" />
          </button>
          <button class="item-list__favorite">
            <img src="/assets/favorite.svg" alt="" />
            0
          </button>
        </div>
      {/each}
    </section>
    <a href="#/write" class="write-btn">
      <img src="/assets/add.svg" alt="" />
      글쓰기
    </a>
  </main>
  <!-- // main -->

  <FloatingChat />
  <MediaInfo />
</div>
<Footer location="home" />
