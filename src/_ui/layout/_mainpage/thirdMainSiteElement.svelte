<script lang="ts">
    import SpecialCard from "../../templates/specialCard.svelte";
    import TextMainSite from "../../templates/textMainSite.svelte";
    import { AuthService } from "$lib/_services/authService";

    const isUserLoggedIn = new AuthService().isUserLoggedIn();

    export let specialMovies: any;

</script>

<TextMainSite
    href={isUserLoggedIn ? "/events" : "/events"}
    text={isUserLoggedIn
        ? "Events in your favorite cinemas "
        : "Evens in nearby cinemas"}
/>
<div class="flex">
    {#each specialMovies as specialMovie}
        <div class="flex ml-8 mr-24">
            <SpecialCard movie={specialMovie} />
        </div>
    {/each}
</div>
