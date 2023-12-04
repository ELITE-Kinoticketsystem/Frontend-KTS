<script lang="ts">
  import MainCard from "../../_ui/templates/mainCard.svelte";
  import Searchbar from "../../_ui/templates/searchbar.svelte";
  import { load } from "./+page";

  let key: string = "";
  let displayedKey: string = "";

  let filteredMovies: any[] = [];
  let filterActors: any[] = [];

  export let data;

  let allMovies: any[] = data.movies;

  let allActors: any[] = data.actors;

  allMovies.push({
    movieName: "The Matrix",
    movieId: "1",
    tags: "Action, Sci-Fi",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    src: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    specialEventId: "1",
    fsk: "16",
  });

  function loadFilterMovies() {
    if (key === "" || key === undefined) {
      filteredMovies = [];
      return;
    }
    filteredMovies = allMovies.filter((movie: any) => {
      return movie.movieName.toLowerCase().includes(key);
    });
  }

  function loadFilterActors() {
    if (key === "" || key === undefined) {
      filterActors = [];
      return;
    }
    filterActors = allActors.filter((actor: any) => {
      return actor.name.toLowerCase().includes(key);
    });
  }
</script>

<svelte:head>
  <title>Search movies</title>
</svelte:head>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col flex-grow w-max">
    <Searchbar
      longSearchBarSize="w-full"
      shortSearchBarSize="w-full"
      shortSearchBarText="Search for a movie"
      longSearchBarText="Search for a movie"
      on:inputChange={(event) => {
        key = event.detail.toLowerCase().trim();
        displayedKey = event.detail.trim();
        loadFilterMovies();
        loadFilterActors();
      }}
    />
    {#key key}
      <div class="movies">
        <p class="text-textWhite text-xl mt-4">
          <span class="font-bold">Movies</span> ({Math.min(
            filteredMovies.length,
            5
          )})
        </p>
        <hr class="h-px bg-textWhite border-0 w-full -my-1" />
        <div class="flex mx-auto mt-5">
          <div class="grid grid-cols-5 mx-auto gap-5">
            {#each filteredMovies.splice(0, 5) as movie}
              <MainCard {movie} />
            {/each}
          </div>
        </div>
      </div>
      <div class="actors">
        <p class="text-textWhite text-xl mt-4">
          <span class="font-bold">Actors</span> ({Math.min(
            filterActors.length,
            5
          )})
        </p>
        <hr class="h-px bg-textWhite border-0 w-full -my-1" />
        <div class="flex mx-auto mt-5">
          <div class="grid grid-cols-5 mx-auto gap-5">
            {#each filterActors.splice(0, 5) as actor}
              <MainCard movie={actor} isActor={true} />
            {/each}
          </div>
        </div>
      </div>
    {/key}
  </div>
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
