<script>

    import Footer from "../_ui/layout/footer.svelte";
    import Navbar from "../_ui/layout/navbar.svelte";
    import "../app.css";


</script>

<div class="w-screen h-screen">
    <div class="w-full sticky top-0"><Navbar /></div>
    <div class="flex flex-col h-screen" >
        <div class="bg-backgroundBlue flex-start flex-auto p-2">
            <slot /> 
        </div>

        <footer class="w-full flex-end p-6"><Footer /></footer>
    </div>
</div>