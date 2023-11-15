<script>

    import Footer from "../_ui/layout/footer.svelte";
    import Navbar from "../_ui/layout/navbar.svelte";
    import "../app.css";


</script>

<div class="w-screen h-screen">
    <div class="w-full sticky top-0"><Navbar /></div>
    <div class="flex flex-col h-screen" >
        <div class="bg-backgroundBlue flex-start p-4 flex-auto">
            <slot /> 
        </div>

        <footer class="w-full flex-end bg-backgroundBlue"><Footer /></footer>
    </div>
</div>