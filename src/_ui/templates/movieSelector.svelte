<script lang="ts">
  import Swal from "sweetalert2";
  import ImgWithUndertitle from "./imgWithUndertitle.svelte";
  import SeatLegend from "./seatLegend.svelte";

  export let allDbMovies: any[] = [];
  export let selectedMovies: any[] = [];
  const maxNrOfChar = 15;

  let inputValue = "";
  let eligibleMoviePreviewIsVisible = false;
  let moviesEligibleToBeAdded: any[] = [];
  let hoveredMovieSize = "h-[100%]";

  $: {
    moviesEligibleToBeAdded = moviesEligibleToBeAdded;
    hoveredMovieSize = hoveredMovieSize;
    console.log(hoveredMovieSize);
  }

  $: {
    selectedMovies = selectedMovies;
    moviesEligibleToBeAdded = allDbMovies.filter((movie) => {
      if (movie.Title.toLowerCase().includes(inputValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
  }
</script>

<div
  class="w-full h-full flex flex-col items-center justify-between ring-1 ring-white bg-tileBlue rounded-md pb-3 px-3"
>
  <div
    class="flex flex-row w-full h-[88%] overflow-y-hidden overflow-x-scroll pt-5 pb-1"
  >
    {#if selectedMovies.length === 0}
      <div class="w-full h-full flex flex-col place-content-evenly">
        <p class="text-center text-textWhite text-xl font-semibold">
          Select a movie
        </p>
      </div>
    {/if}
    {#each selectedMovies as movie, thisMovie}
      <div class="relative flex-none w-[80%] h-full mx-5">
        <ImgWithUndertitle
          element={{ src: movie.CoverPicURL, undertitle: movie.Title }}
        />
        <button
          class="absolute w-[18%] h-[9%] top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full"
          on:click={() => {
            selectedMovies.splice(thisMovie, 1);
            selectedMovies = selectedMovies;
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
          eligibleMoviePreviewIsVisible = true;
        }
      }}
      on:keydown={() => {
        eligibleMoviePreviewIsVisible = true;
      }}
      on:blur={() => {
        eligibleMoviePreviewIsVisible = false;
      }}
    />
    <div
      class="absolute flex flex-col bottom-0 translate-y-[100.7%] left-0 z-10 w-[100%] min-h-[140%] max-h-[420%]
      overflow-y-scroll ring-1 ring-slate-50 rounded-md
      {eligibleMoviePreviewIsVisible ? 'flex' : 'hidden'}"
    >
      {#if moviesEligibleToBeAdded.length == 0}
        <p
          class="h-full text-textWhite text-center my-auto bg-buttonBlue py-[0.95rem] rounded-md ring-1 ring-slate-50"
        >
          No movies found!
        </p>
      {/if}

      {#each moviesEligibleToBeAdded as movie}
        <button
          class="flex flex-row w-full h-full bg-buttonBlue ring-1 ring-slate-50 hover:bg-blue-300"
          on:mousedown={() => {
            selectedMovies = [...selectedMovies, movie];
            eligibleMoviePreviewIsVisible = false;
          }}
        >
          <img
            class="w-[20%] h-[90%] object-cover aspect-auto my-auto rounded-md p-1"
            src={movie.CoverPicURL}
            alt="movie preview"
          />
          <p
            class="w-[75%] h-[80%] mx-auto my-auto text-center font-semibold text-[100%] leading-tight text-textWhite"
          >
            {movie.Title.length > maxNrOfChar
              ? movie.Title.slice(0, maxNrOfChar) + ".."
              : movie.Title}
          </p>
        </button>
      {/each}
    </div>
  </div>
</div>
