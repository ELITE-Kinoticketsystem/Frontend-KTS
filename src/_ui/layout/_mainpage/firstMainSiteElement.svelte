<script lang="ts">
    import { AuthService } from "$lib/_services/authService";
    import MovieRow from "../../templates/movieRow.svelte";
    import TextMainSite from "../../templates/textMainSite.svelte";

    const authService = new AuthService();

    const isUserLoggedIn = authService.isUserLoggedIn();

    export let moviesToDisplay: any;
</script>

<TextMainSite
    href={isUserLoggedIn ? "/yourwatchlist" : "/likedbyother"}
    text={isUserLoggedIn ? "Your watchlist" : "Liked by others"}
/>
<div class="ml-10">
    <MovieRow {moviesToDisplay} />
</div>
