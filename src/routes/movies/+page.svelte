<script lang="ts">
  import MainCard from "../../_ui/templates/mainCard.svelte";
  import Searchbar from "../../_ui/templates/searchbar.svelte";

  let movieInput: string = "";
  let displayedMovieInput: string = "";

  let filteredMovies: any[] = [];

  export let data;

  let allMovies: any[] = data.movies;

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
    if (movieInput === "" || movieInput === undefined) {
      filteredMovies = [];
      return;
    }
    filteredMovies = allMovies.filter((movie: any) => {
      return movie.movieName.toLowerCase().includes(movieInput);
    });
  }
</script>

<svelte:head>
  <title>Search movies</title>
</svelte:head>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col flex-grow w-max">
    <p class="text-textWhite text-xl font-semibold mb-3">Enter a movie</p>
    <div class="mx-auto w-full">
      <Searchbar
        longSearchBarSize="w-full"
        shortSearchBarSize="w-full"
        shortSearchBarText="Search for a movie"
        longSearchBarText="Search for a movie"
        on:inputChange={(event) => {
          movieInput = event.detail.toLowerCase().trim();
          displayedMovieInput = event.detail.trim();
          loadFilterMovies();
        }}
      />
    </div>
    <hr
      class="h-px my-2 bg-textWhite border-0"
      class:hidden={movieInput === "" || movieInput === undefined}
    />
    {#key movieInput}
      <p
        class="my-3 text-textWhite text-xl"
        class:hidden={movieInput === "" ||
          movieInput === undefined ||
          filteredMovies.length === 0}
      >
        Results for <span class="underline-offset-2 underline"
          >{displayedMovieInput}</span
        >
      </p>
      <p
        class="my-3 text-textWhite text-xl"
        class:hidden={filteredMovies.length > 0 || movieInput === ""}
      >
        No results for <span class="underline-offset-2 underline"
          >{displayedMovieInput}</span
        >
      </p>

      <div class="grid grid-cols-5 mx-auto gap-5">
        {#each filteredMovies as movie}
          <MainCard {movie} />
        {/each}
      </div>
    {/key}
  </div>
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
