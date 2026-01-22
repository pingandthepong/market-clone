<script>
  import { getDatabase, ref, push, set } from "firebase/database";
  // import { preprocess } from "svelte/compiler";
  import Statusbar from "../components/Statusbar.svelte";
  import Footer from "../components/Footer.svelte";
  import MediaInfo from "../components/MediaInfo.svelte";
  import FloatingChat from "../components/FloatingChat.svelte";

  import { addDoc, collection, serverTimestamp } from "firebase/firestore";
  import { db } from "../../firebase";
  import { ceil } from "firebase/firestore/pipelines";

  let title;
  let description;
  let price;
  let place;

  let imageUrl = "";
  let uploading = false;

  // ✅ 글 작성(저장)
  async function writeUserData() {
    console.log("1️⃣ submit 들어옴");

    if (!imageUrl) {
      alert("이미지를 업로드해주세요.");
      return;
    }

    console.log("2️⃣ Firestore 호출 직전");

    try {
      console.log("3️⃣ addDoc 시작");

      // (1) Firestore에 URL 저장
      await addDoc(collection(db, "items"), {
        title,
        description,
        price: Number(price),
        place,
        imageUrl, // Cloudinary URL
        createdAt: serverTimestamp(),
      });

      alert("글쓰기가 완료되었습니다.");
      window.location.hash = "/";
    } catch (e) {
      console.error("Firestore 저장 실패: ", e);
      alert("저장 중 오류가 발생했습니다.");
    }
  }

  // ✅ 이미지 업로드
  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    uploading = true;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "carrot_unsigned");

    // (1) 파일 -> Cloudinary 업로드
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/danrlthyn/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    // (2) 업로드 완료 후 -> imageUrl에 URL 저장
    imageUrl = data.secure_url;

    uploading = false;
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
      <form on:submit|preventDefault={writeUserData} action="" id="write-form">
        <!-- db column과 name값 맞추기 -->
        <div>
          <label for="image">이미지</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            on:change={handleUpload}
          />
          {#if uploading}
            <p>업로드 중...</p>
          {/if}
          {#if imageUrl}
            <img src={imageUrl} alt="업로드 이미지" width="200" />
          {/if}
        </div>
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
          <button
            type="submit"
            disabled={uploading || !imageUrl}
            id="write__submit-btn"
          >
            {uploading ? "이미지 업로드 중..." : "작성 완료"}
          </button>
        </div>
      </form>
    </section>
  </main>
  <!-- // main -->

  <FloatingChat />
  <MediaInfo />
</div>

<Footer location="write" />
