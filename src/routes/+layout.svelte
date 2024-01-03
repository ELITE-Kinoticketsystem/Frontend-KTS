<script>
  import { onMount } from "svelte";
  import Footer from "../_ui/layout/footer.svelte";
  import Navbar from "../_ui/layout/navbar.svelte";
  import "../app.css";
  import { invalidateAll } from "$app/navigation";
  import Cookies from "../_ui/layout/cookies.svelte";
  import Chatbot from "../_ui/layout/chatbot.svelte";
  onMount(() => {
    invalidateAll();
  });
</script>

<div class="relative flex flex-col justify-between min-w-screen min-h-screen">
  <div class="flex min-w-screen h-full sticky top-0 z-50"><Navbar /></div>
  <div
    class="flex-1 overflow-hidden w-screen h-full py-4 bg-gradient-to-r from-slate-700 from-1% via-backgroundBlue via-50% to bg-slate-700 to-100%"
  >
    <slot />
    <Chatbot />
    <Cookies />
  </div>
  <div class="flex min-w-screen h-full"><Footer /></div>
</div>
