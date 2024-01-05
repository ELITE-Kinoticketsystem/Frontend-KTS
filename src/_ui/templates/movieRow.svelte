<script lang="ts">
  import MainCard from "./mainCard.svelte";
  export let moviesToDisplay: any;

  const divId = Math.random();

  let mouseIsInDiv = false;

  let currentScrollPosition = 0;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="h-full flex flex-row overflow-x-scroll gap-x-5 sm:gap-x-12 p-4 scroll-smooth"
  id="scroll-{divId}"
  on:mouseenter={() => {
    mouseIsInDiv = true;
  }}
  on:mouseleave={() => {
    mouseIsInDiv = false;
  }}
>
  {#each moviesToDisplay as movie}
    <div
      class="flex-none sm:w-[14%] min-h-full hover:scale-105 duration-300"
    >
      <MainCard {movie} />
    </div>
  {/each}
</div>
