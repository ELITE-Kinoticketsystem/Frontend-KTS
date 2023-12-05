<script lang="ts">
  import MainCard from "./mainCard.svelte";
  export let moviesToDisplay: any;
  
</script>

<div class="w-full h-full flex flex-row overflow-x-scroll scrollbar gap-x-12 p-4 ">
  {#each moviesToDisplay as movie}
    <div class="basis-1/5 h-full hover:scale-105 duration-300">
      <MainCard {movie} />
    </div>
  {/each}
</div>
