<script>
  import Footer from "../_ui/layout/footer.svelte";
  import Navbar from "../_ui/layout/navbar.svelte";
  import "../app.css";
</script>

<div class="relative flex flex-col justify-between min-w-screen min-h-screen">
  <div class="flex min-w-screen h-full sticky top-0 z-50"><Navbar /></div>
  <div
    class="flex-1 overflow-hidden w-screen h-full py-4 bg-gradient-to-r from-slate-700 from-1% via-backgroundBlue via-50% to bg-slate-700 to-100%"
  >
    <slot />
  </div>
  <div class="flex min-w-screen h-full"><Footer /></div>
</div>
