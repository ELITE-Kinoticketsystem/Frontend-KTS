<script lang="ts">
    import MainCard from "./mainCard.svelte";
    export let movieIdsToDisplay: string[] = [];
</script>

<div class="flex overflow-hidden">
    {#each movieIdsToDisplay as movieId, index}
        <div class="mx-9">
            <MainCard
                {movieId}
                isLast={index === movieIdsToDisplay.length - 1}
            />
        </div>
    {/each}
</div>
