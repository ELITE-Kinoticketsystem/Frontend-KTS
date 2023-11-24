<script lang="ts">
    import MovieRow from "../../templates/movieRow.svelte";
    import { AuthService } from "$lib/_services/authService";
    import TextMainSite from "../../templates/textMainSite.svelte";

    const authService = new AuthService();
    const isUserLoggedIn = authService.isUserLoggedIn();

    export let moviesToDisplay: any;

</script>

<TextMainSite
    href={isUserLoggedIn ? "/yoursuggestions" : "/upcomingmovies"}
    text={isUserLoggedIn ? "Your suggestions " : "Upcoming movies "}
/>
<MovieRow {moviesToDisplay} />
