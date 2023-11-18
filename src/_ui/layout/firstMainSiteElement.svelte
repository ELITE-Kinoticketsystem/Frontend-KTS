<script lang="ts">
    import MainCard from "../templates/mainCard.svelte";
    import { AuthService } from "$lib/_services/authService";

    const authService = new AuthService();

    const isLoggedIn = authService.userIsLoggedIn();

    let movieIdsToDisplay: string[] = [];

    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");
</script>

<div class="flex">
    {#each movieIdsToDisplay as movieId, index}
        <div class="mx-10">
            <MainCard
                {movieId}
                isLast={index === movieIdsToDisplay.length - 1}
            />
        </div>
    {/each}
</div>
