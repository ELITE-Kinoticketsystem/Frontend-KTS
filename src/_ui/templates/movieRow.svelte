<script lang="ts">
  import MainCard from "./mainCard.svelte";
  export let moviesToDisplay: any;
  
</script>

<div class="h-full flex flex-row overflow-x-scroll scrollbar gap-x-5 sm:gap-x-12 p-4">
  {#each moviesToDisplay as movie}
    <div class="flex-none basis-[30%] sm:basis-1/6 h-max hover:scale-105 duration-300">
      <MainCard {movie} />
    </div>
  {/each}
</div>
