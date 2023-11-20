<script lang="ts">
    import { AuthService } from "$lib/_services/authService";
    import MovieRow from "../../templates/movieRow.svelte";
    import TextMainSite from "../../templates/textMainSite.svelte";

    const authService = new AuthService();

    const isUserLoggedIn = authService.isUserLoggedIn();

    let movieIdsToDisplay: string[] = [];

    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");
</script>

<TextMainSite
    href={isUserLoggedIn ? "/yourwatchlist" : "/likedbyother"}
    text={isUserLoggedIn ? "Your watchlist" : "Liked by others"}
/>
<MovieRow {movieIdsToDisplay} />
