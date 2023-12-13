<script lang="ts">
  import MainRoundAbout from "../_ui/layout/mainRoundAbout.svelte";
  import SpecialEventTile from "../_ui/layout/_mainpage/specialEventTile.svelte";
  import MainPageMovieRow from "../_ui/layout/_mainpage/mainPageMovieRow.svelte";
  import IntersectionObserver from "svelte-intersection-observer";
  import { fade } from "svelte/transition";

  export let data;

  let moviesToDisplay = data.first;
  let items: any[] = [];
</script>

<svelte:head>
  <title>Cinemika - Home</title>
</svelte:head>

<div class="flex flex-col gap-y-12 sm:gap-y-12 w-full">
  <div class="flex mx-0 sm:mx-2 md:mx-4 lg:mx-5 mb-4">
    <MainRoundAbout {moviesToDisplay} />
  </div>

  <IntersectionObserver element={items[0]} let:intersecting>
    <div bind:this={items[0]}>
      {#if intersecting}
        <div transition:fade={{ delay: 200 }}>
          <div class="flex mx-8 lg:mx-16">
            <MainPageMovieRow
              {moviesToDisplay}
              textData={{
                refs: ["/yourwatchlist", "/likedbyother"],
                txt: ["Your Watchlist", "Liked by others"],
              }}
            />
          </div>
        </div>
      {/if}
    </div>
  </IntersectionObserver>
  <IntersectionObserver element={items[1]} let:intersecting>
    <div bind:this={items[1]}>
      {#if intersecting}
        <div transition:fade={{ delay: 200 }}>
          <div class="flex mx-8 min-h-fit h-[21vh] sm:h-[33vh] lg:mx-16">
            <SpecialEventTile
              specialMovies={moviesToDisplay}
              textData={{
                refs: ["/specialevents", "/specialevents"],
                txt: ["Events in your favorite cinemas", "Events near you"],
              }}
            />
          </div>
        </div>
      {/if}
    </div>
  </IntersectionObserver>
  <IntersectionObserver element={items[2]} let:intersecting>
    <div bind:this={items[2]}>
      {#if intersecting}
        <div transition:fade={{ delay: 200 }}>
          <div class="flex mb-4 mx-8 lg:mx-16">
            <MainPageMovieRow
              {moviesToDisplay}
              textData={{
                refs: ["/yoursuggestions", "/upcomingmovies"],
                txt: ["Your suggestions", "Upcoming movies"],
              }}
            />
          </div>
        </div>
      {/if}
    </div>
  </IntersectionObserver>
</div>
