<script lang="ts">
    import MainCard from "./mainCard.svelte";
    export let moviesToDisplay: any;
</script>

<div class="relative flex overflow-y-scroll bg-yellow-500">
    {#each moviesToDisplay as movie}
        <div class="mr-16 hover:absolute hover:inset-0 bg-orange-600">
            <MainCard {movie}/>
        </div>
    {/each}
</div>
