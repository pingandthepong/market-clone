<script>
  import Nav from "../components/Nav.svelte";
  import Statusbar from "../components/Statusbar.svelte";
  import MediaInfo from "../components/MediaInfo.svelte";
  import FloatingChat from "../components/FloatingChat.svelte";
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { ceil } from "firebase/firestore/pipelines";
  import { user$ } from "../store";

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      user$.set(user);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error(error);
    }
  };
</script>

<header>
  <Statusbar />
</header>
<!-- main -->
<main>
  <section class="contents">
    {#if $user$}
      <div>{$user$?.displayName}</div>
    {/if}
    <h1 class="title">로그인하기</h1>
    <button type="button" class="login-btn" on:click={loginWithGoogle}>
      <span class="icon">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          class="LgbsSe-Bz112c"
        >
          <g>
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            ></path>
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            ></path>
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            ></path>
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            ></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </g>
        </svg>
      </span>
      <span class="text">Google로 시작하기</span>
    </button>
    <!-- <div class="header">
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
    </form> -->
  </section>
</main>

<FloatingChat />
<MediaInfo />

<Nav location="login" />

<style>
  h1.title {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 24px;
  }
  .login-btn {
    width: 80%;
    min-width: 268px;
    max-width: 400px;
    display: flex;
    align-items: center;
    height: 40px;
    margin: 0 auto;
    border: 1px solid #dadce0;
    border-radius: 4px;
    color: #3c4043;
    padding: 0 12px;
  }
  .icon svg {
    width: 18px;
    aspect-ratio: 1 / 1;
  }
  .text {
    flex: 1 0 100%;
    font-weight: 500;
    font-size: 14px;
  }
</style>
