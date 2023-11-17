<script>
    import MainRoundAbout from "../_ui/layout/mainRoundAbout.svelte";
    import { AuthService } from "$lib/authService";
    const authService = new AuthService();
</script>

<main>
    <MainRoundAbout />
</main>
