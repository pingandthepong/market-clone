<script>
  import Main from "./pages/Main.svelte";
  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Write from "./pages/Write.svelte";
  import Router from "svelte-spa-router";
  import NotFound from "./pages/NotFound.svelte";
  import "./css/style.css";

  const routes = {
    "/": Main,
    "/signup": Signup,
    "/login": Login,
    "/write": Write,
    "*": NotFound,
  };
</script>

<!-- http://localhost:5173/#/login -->
<Router {routes} />
