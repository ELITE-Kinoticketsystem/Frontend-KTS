<script lang="ts">
  import MainRoundAbout from "../_ui/layout/mainRoundAbout.svelte";
  import SpecialEventTile from "../_ui/layout/_mainpage/specialEventTile.svelte";
  import MainPageMovieRow from "../_ui/layout/_mainpage/mainPageMovieRow.svelte";
  import IntersectionObserver from "svelte-intersection-observer";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { invalidateAll } from "$app/navigation";
  import { AuthService } from "$lib/_services/authService";

  export let data;

  let moviesToDisplay = data.movies;
  let items: any[] = [];

  let specialEvents = data.specialEvents;

  let isUserLoggedIn = false;
  onMount(async () => {
    invalidateAll();
    await AuthService.isUserLoggedIn().then((res) => {
      isUserLoggedIn = res;
    });
  });
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
              {isUserLoggedIn}
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
  {#if specialEvents !== null && specialEvents.length > 0}
    <IntersectionObserver element={items[1]} let:intersecting>
      <div bind:this={items[1]}>
        {#if intersecting}
          <div transition:fade={{ delay: 200 }}>
            <div class="flex mx-8 h-[42vh] lg:mx-16 mb-4">
              <SpecialEventTile
                events={specialEvents}
              />
            </div>
          </div>
        {/if}
      </div>
    </IntersectionObserver>
  {/if}
  <IntersectionObserver element={items[2]} let:intersecting>
    <div bind:this={items[2]}>
      {#if intersecting}
        <div transition:fade={{ delay: 200 }}>
          <div class="flex mb-4 mx-8 lg:mx-16">
            <MainPageMovieRow
              {isUserLoggedIn}
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
