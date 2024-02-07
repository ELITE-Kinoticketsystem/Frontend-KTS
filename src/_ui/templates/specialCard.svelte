<script lang="ts">
  import { useLazyImage as lazyImage } from "svelte-lazy-image";
  import CinemaTile from "./cinemaTile.svelte";
  export let event: any;
  let moviesToDisplay: any[] = [];
  let nrOfMoviesToDisplay = 0;
  if (event.Movies.length > 2) {
    nrOfMoviesToDisplay = 3;
  } else {
    nrOfMoviesToDisplay = 2;
  }
  for (let i = 0; i < nrOfMoviesToDisplay; ++i)
    moviesToDisplay.push(event.Movies.at(i));
</script>

{#if event === null}
  <p>Event not found</p>
{:else}
  <div class="flex flex-col w-full h-full rounded-md p-4">
    <div class="flex flex-row w-full h-[88%]">
      {#each moviesToDisplay as movie, i}
        <img
          src={movie.CoverPicURL}
          alt={movie.Title}
          class="{moviesToDisplay.length > 2
            ? 'w-1/3'
            : 'w-1/2'} h-auto object-cover {i === 0
            ? 'rounded-l-md'
            : ''} {i === nrOfMoviesToDisplay - 1 ? 'rounded-r-md' : ''}"
          use:lazyImage
        />
      {/each}
    </div>
    <div class="flex mx-auto mt-4">
      <p class="text-textWhite text-xl font-semibold">{event.Title}</p>
    </div>
  </div>
{/if}
