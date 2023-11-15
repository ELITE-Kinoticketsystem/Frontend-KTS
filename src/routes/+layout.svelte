<script>

    import Footer from "../_ui/layout/footer.svelte";
    import Navbar from "../_ui/layout/navbar.svelte";
    import "../app.css";


</script>

<main>
    <Navbar />

    <slot />
    
    <Footer />
</main>