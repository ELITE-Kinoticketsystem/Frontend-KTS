<script>
  import Footer from "../_ui/layout/footer.svelte";
  import Navbar from "../_ui/layout/navbar.svelte";
  import "../app.css";
</script>

<div class="w-screen h-screen">
  <div class="w-full sticky top-0 z-50"><Navbar /></div>
  <div class="flex flex-col">
    <div
      class="justify-between py-4 flex-auto bg-gradient-to-r from-slate-900 from-1% via-backgroundBlue via-50% to bg-slate-900 to-100%"
    >
      <slot />
    </div>
  </div>
  <footer class="w-full"><Footer /></footer>
</div>
