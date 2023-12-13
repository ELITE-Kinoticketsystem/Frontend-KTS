<script lang="ts">
  import MainCard from "./mainCard.svelte";
  export let moviesToDisplay: any;

  const divId = Math.random();

  let mouseIsInDiv = false;

  let currentScrollPosition = 0;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="h-full relative flex flex-row overflow-x-scroll scrollbar gap-x-5 sm:gap-x-12 p-4 scroll-smooth"
  id="scroll-{divId}"
  on:mouseenter={() => {
    mouseIsInDiv = true;
  }}
  on:mouseleave={() => {
    mouseIsInDiv = false;
  }}
>
  {#key currentScrollPosition}
    <div
      class="absolute py-5 top-1/2 -translate-y-1/2 right-0"
      class:hidden={!mouseIsInDiv || moviesToDisplay.length < 5}
    >
      <button
        on:click={() => {
          const scrollContainer = document.getElementById("scroll-" + divId);
          scrollContainer.scrollLeft += window.innerWidth * 0.85;
          currentScrollPosition = scrollContainer.scrollLeft;
        }}
        class="-rotate-90 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-8 h-8 animate-bounce z-50 text-textWhite bg-buttonBlue rounded-full duration-300 px-1 py-1"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  {/key}
  {#each moviesToDisplay as movie}
    <div
      class="flex-none basis-[30%] sm:basis-1/6 h-max hover:scale-105 duration-300"
    >
      <MainCard {movie} />
    </div>
  {/each}
</div>
