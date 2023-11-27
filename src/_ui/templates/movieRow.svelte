<script lang="ts">
    import MainCard from "./mainCard.svelte";
    export let moviesToDisplay: any;
</script>

<div class="flex overflow-hidden">
    {#each moviesToDisplay as movie, index}
        <div class="mr-16">
            <MainCard {movie} />
        </div>
    {/each}
</div>
