<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { AuthService } from "$lib/_services/authService.js";
  import { onMount } from "svelte";

  let isUserLoggedIn = false;
  onMount(async () => {
    await AuthService.isUserLoggedIn().then((res) => {
      isUserLoggedIn = res;
    });
    if (isUserLoggedIn && browser) {
      goto("/auth/login");
    }
  });
  export let data;

  const favorites: any[] = data.favoriteMovies;
  let showMovieDetails: boolean[] = [];

  favorites.forEach((favorite) => {
    showMovieDetails.push(false);
  });

  function removeFavorite(movieId: number) {
    favorites.forEach((favorite, index) => {
      if (favorite.movieId === movieId) {
        favorites.splice(index, 1);
        showMovieDetails.splice(index, 1);
      }
    });
  }
</script>

<head:svelte>
  <title>Cinemika - Favorites</title>
</head:svelte>
<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col flex-grow w-max">
    <div class="flex flex-col">
      <div class="text-textWhite my-4 text-xl">Your favorites</div>
      <hr class="h-px bg-textWhite border-0 w-full -my-3" />
    </div>
    <div class="flex mx-auto">
      <div
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 mt-10 gap-5"
      >
        {#each favorites as favorite, index}
          <div class="grid mx-auto group">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class="flex relative"
              on:mouseenter={() => (showMovieDetails[index] = true)}
              on:mouseleave={() => (showMovieDetails[index] = false)}
            >
              <img
                src={favorite.src}
                alt={favorite.movieName}
                class="rounded-lg shadow-md group-hover:opacity-30 duration-300"
              />
              <div
                class="absolute z-50 flex flex-col group-hover:opacity-100 duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                class:hidden={!showMovieDetails[index]}
              >
                <a
                  class="bg- px-4 py-2 rounded-lg text-textWhite hover:bg-buttonBlue duration-300 opacity-100 text-center mb-2"
                  href="/movies/{favorite.movieId}">Watch</a
                >
                <button
                  on:click={() => {
                    if (showMovieDetails[index])
                      showMovieDetails[index] = false;
                    removeFavorite(favorite.movieId);
                  }}
                  class="bg-transparent px-4 py-2 rounded-lg text-textWhite hover:bg-red-700 duration-300 opacity-100 text-center"
                  >Remove</button
                >
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
