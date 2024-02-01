<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import MainCard from "../../_ui/templates/mainCard.svelte";
  import Searchbar from "../../_ui/templates/searchbar.svelte";
  import { fade } from "svelte/transition";

  let key: string = "";
  let displayedKey: string = "";

  let filteredMovies: any[] = [];
  let filterActors: any[] = [];
  let filterGenres: any[] = [];

  export let data;

  let allMovies: any[] = data.movies;

  let allActors: any[] = data.actors;

  function loadFilterMovies() {
    if (key === "" || key === undefined) {
      filteredMovies = [];
      return;
    }
    filteredMovies = allMovies.filter((movie: any) => {
      return movie.Title.toLowerCase().includes(key);
    });
  }

  function loadFilterActors() {
    if (key === "" || key === undefined) {
      filterActors = [];
      return;
    }
    filterActors = allActors.filter((actor: any) => {
      return actor.Name.toLowerCase().includes(key);
    });
  }

  function loadFilterGenres() {
    if (key === "" || key === undefined) {
      filterGenres = [];
      return;
    }
    filterGenres = allMovies.filter((movie: any) => {
      for (let i = 0; i < movie.Genres.length; i++) {
        console.log(movie.Genres.at(i).GenreName);
        if (
          movie.Genres.at(i)
            .GenreName.toLowerCase()
            .trim()
            .includes(key.toLowerCase().trim())
        ) {
          return movie;
        }
      }
    });
  }

  onMount(() => {
    if (browser) {
      document.getElementById("default-search")!.focus();
    }
  });
</script>

<svelte:head>
  <title>Cinemika - Search</title>
</svelte:head>

<div class="flex w-screen h-full">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col flex-grow w-full h-max pb-5">
    <p class="text-textWhite font-semibold">
      Here you can search for actor(s), movie(s) or genre(s)
    </p>
    <Searchbar
      longSearchBarSize="w-full"
      shortSearchBarSize="w-full"
      shortSearchBarText="Search for a movies, actors or genres"
      longSearchBarText="Search for a movies, actors or genres"
      input={displayedKey}
      on:inputChange={(event) => {
        key = event.detail.toLowerCase().trim();
        displayedKey = event.detail.trim();
        loadFilterMovies();
        loadFilterActors();
        loadFilterGenres();
      }}
    />
    {#key key}
      {#if filteredMovies.length > 0}
        <div class="movies" transition:fade={{ delay: 250, duration: 300 }}>
          <p class="text-textWhite text-xl mt-4">
            <span class="font-bold">Movies</span> ({Math.min(
              filteredMovies.length,
              5
            )}) -
            {displayedKey}
          </p>
          <hr class="h-px bg-textWhite border-0 w-full" />
          <div class="flex mx-auto my-5">
            <div class="grid grid-cols-5 mx-auto gap-5">
              {#each filteredMovies.splice(0, 5) as movie}
                <div class="hover:scale-105 duration-300">
                  <MainCard {movie} />
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
      {#if filterActors.length > 0}
        <div class="actors" transition:fade={{ delay: 250, duration: 300 }}>
          <p class="text-textWhite text-xl mt-4">
            <span class="font-bold">Actors</span> ({Math.min(
              filterActors.length,
              5
            )}) - {displayedKey}
          </p>
          <hr class="h-px bg-textWhite border-0 w-full" />
          <div class="flex mx-auto my-5">
            <div class="grid grid-cols-5 mx-auto gap-5">
              {#each filterActors.splice(0, 5) as actor}
                <div class="hover:scale-105 duration-300">
                  <MainCard movie={actor} isActor={true} />
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
      {#if filterGenres.length > 0}
        <div class="actors" transition:fade={{ delay: 250, duration: 300 }}>
          <p class="text-textWhite text-xl mt-4">
            <span class="font-bold">Genres</span> ({Math.min(
              filterGenres.length,
              5
            )}) - {displayedKey}
          </p>
          <hr class="h-px bg-textWhite border-0 w-full" />
          <div class="flex mx-auto my-5">
            <div class="grid grid-cols-5 mx-auto gap-5">
              {#each filterGenres.splice(0, 5) as movie}
                <div class="hover:scale-105 duration-300">
                  <MainCard {movie} />
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    {/key}
  </div>
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
