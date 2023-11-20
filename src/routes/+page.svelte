<script>
    import MainRoundAbout from "../_ui/layout/mainRoundAbout.svelte";
    import { AuthService } from "$lib/_services/authService";
    import FirstMainSiteElement from "../_ui/layout/firstMainSiteElement.svelte";
    const authService = new AuthService();
</script>

<main>
    <MainRoundAbout />
    <br />
    <div class="mx-16 mt-10">
        <FirstMainSiteElement />
    </div>
</main>
