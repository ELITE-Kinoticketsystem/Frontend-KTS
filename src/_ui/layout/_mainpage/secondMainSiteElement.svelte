<script lang="ts">
    import MovieRow from "../../templates/movieRow.svelte";
    import { AuthService } from "$lib/_services/authService";
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
    href={isUserLoggedIn ? "/yoursuggestions" : "/upcomingmovies"}
    text={isUserLoggedIn ? "Your suggestions " : "Upcoming movies "}
/>
<MovieRow {movieIdsToDisplay} />
