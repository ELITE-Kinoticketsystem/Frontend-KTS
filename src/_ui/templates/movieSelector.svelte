<script lang="ts">
  import Swal from "sweetalert2";
  import ImgWithUndertitle from "./imgWithUndertitle.svelte";

  let inputValue = "";
  let eligibleMoviePreviewIsVisible = false;
  let moviesEligibleToBeAdded: any[] = [];
  $: moviesEligibleToBeAdded = moviesEligibleToBeAdded;

  let exampleMovie = {
    title: "Steph Curry Underrated",
    start: new Date("2023-12-09T12:00:00.000Z"),
    end: new Date("2023-12-09T14:00:00.000Z"),
    description: "Awesome movie with Wardell Stephen the goat Curry",
    eventType: "regular",
    is3D: true,
    cover:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  };
  moviesEligibleToBeAdded = [exampleMovie];

  export let movies: {
    title: string;
    start: Date;
    end: Date;
    description: string;
    eventType: string;
    is3D: boolean;
    cover: string;
  }[] = [];
  $: {
    movies = movies;
    console.log(movies);
  }

  async function showEligibleMovies(searchPattern: string) {
    // const movieData = await fetch("https://www.google.de");
    // moviesEligibleToBeAdded = await movieData.json();
    moviesEligibleToBeAdded = [
      exampleMovie,
      exampleMovie,
      exampleMovie,
      exampleMovie,
    ];
    eligibleMoviePreviewIsVisible = true;
  }
</script>

<div
  class="w-full h-full flex flex-col items-center justify-between ring-1 ring-white bg-tileBlue rounded-md pb-3 px-3"
>
  <div class="flex flex-row w-full h-[87%] overflow-x-scroll pt-5">
    {#if movies.length === 0}
      <div class="w-full h-full flex flex-col place-content-evenly">
        <p class="text-center text-textWhite text-xl font-semibold">
          Select a movie
        </p>
      </div>
    {/if}
    {#each movies as movie, thisMovie}
      <div class="relative flex-none w-[80%] h-full mx-5">
        <ImgWithUndertitle
          element={{ src: movie.cover, undertitle: movie.title }}
        />
        <button
          class="absolute w-[18%] h-[9%] top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full"
          on:click={() => {
            movies.splice(thisMovie, 1);
            movies = movies;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            viewBox="7 3 9 18"
            stroke-width="1.5"
            stroke="#000000"
            class="w-full h-full"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    {/each}
  </div>
  <div class="relative flex w-full h-[10%]">
    <input
      class="w-full h-full rounded-lg p-2 duration-300 text-sm text-textWhite
      border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      maxlength="24"
      placeholder="Search for movies..."
      bind:value={inputValue}
      on:focus={() => {
        if (inputValue.length > 0) {
          showEligibleMovies(inputValue);
        }
      }}
      on:keydown={() => {
        showEligibleMovies(inputValue);
      }}
      on:blur={() => {
        eligibleMoviePreviewIsVisible = false;
      }}
    />
    <div
      class="absolute flex flex-col bottom-0 translate-y-[100.7%] left-0 z-10 w-[100%] min-h-[200%] max-h-[420%]
      overflow-y-scroll ring-1 ring-slate-50 rounded-md
      {eligibleMoviePreviewIsVisible ? 'flex' : 'hidden'}"
    >
      {#each moviesEligibleToBeAdded as movie}
        <button
          class="flex flex-row w-full h-full bg-buttonBlue ring-1 ring-slate-50 hover:bg-blue-300"
          on:mousedown={() => {
            movies = [...movies, movie];
            eligibleMoviePreviewIsVisible = false;
          }}
        >
          <img
            class="w-[20%] h-[90%] object-cover aspect-auto my-auto rounded-md p-1"
            src={movie.cover}
            alt="movie preview"
          />
          <p
            class="w-[75%] mx-auto my-auto text-center font-semibold text-[88%] text-textWhite"
          >
            {movie.title}
          </p>
        </button>
      {/each}
    </div>
  </div>
</div>
