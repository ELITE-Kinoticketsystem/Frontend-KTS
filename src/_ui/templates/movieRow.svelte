<script lang="ts">
  import MainCard from "./mainCard.svelte";
  export let moviesToDisplay: any;
  
</script>

<div class="flex flex-none flex-row w-full overflow-y-scroll">
  {#each moviesToDisplay as movie}
    <div class="flex mr-16 h-full">
      <MainCard {movie} />
    </div>
  {/each}
</div>
