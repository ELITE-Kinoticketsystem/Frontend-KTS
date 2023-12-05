<script>
  import Footer from "../_ui/layout/footer.svelte";
  import Navbar from "../_ui/layout/navbar.svelte";
  import "../app.css";
</script>

<div class="relative flex flex-col justify-between w-screen min-h-screen">
  <div class="flex w-full h-full sticky top-0 z-50"><Navbar /></div>
  <div
    class=" w-full h-full py-4 bg-gradient-to-r from-slate-700 from-1% via-backgroundBlue via-50% to bg-slate-700 to-100%"
  >
    <slot />
  </div>
  <div class="flex w-full h-full"><Footer /></div>
</div>
