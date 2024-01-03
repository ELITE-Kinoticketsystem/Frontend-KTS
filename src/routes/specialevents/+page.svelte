<script lang="ts">
  import { onMount } from "svelte";
  import MainCard from "../../_ui/templates/mainCard.svelte";
  import Searchbar from "../../_ui/templates/searchbar.svelte";
  import { invalidateAll } from "$app/navigation";

  let displayedMovies: any[] = [];
  let showFskDropdown = false;
  let showGenreDropdown = false;

  export let data;

  const allSpecialEvents = data.specialEvents;

  let forNow = 0;
  const genres = ["awesome", "action", "adventure", "sci-fi"];

  let checkedGenres: boolean[] = [];
  for (let i = 0; i < genres.length; i++) {
    checkedGenres.push(false);
  }
  onMount(() => {
    //filter();
    invalidateAll();
  });

  let map = new Map();
  map.set("0", 0);
  map.set("25", 6);
  map.set("50", 12);
  map.set("75", 16);
  map.set("100", 18);

  /* function filter() {
    displayedMovies = [];
    let age = map.get(ratingRange.toString());
    ratingText = "0 - " + age;
    if (checkedGenres.includes(true)) {
      for (let i = 0; i < checkedGenres.length; i++) {
        if (checkedGenres[i]) {
          allMovies.forEach((movie: any) => {
            movie.Genres.forEach((genre: any) => {
              genre = genre.toLowerCase();
            });
            if (
              movie.genre.includes(genres[i].toLowerCase()) &&
              movie.Fsk <= age &&
              !displayedMovies.includes(movie)
            ) {
              displayedMovies.push(movie);
            }
          });
        }
      }
    } else {
      if (ratingRange != 100) {
        displayedMovies = allMovies.filter((movie: any) => {
          return movie.Fsk <= age;
        });
      } else {
        displayedMovies = JSON.parse(JSON.stringify(allMovies));
      }
    }
    if (key != "") {
      displayedMovies = displayedMovies.filter((movie: any) => {
        return movie.Title.toLowerCase().includes(key.toLowerCase());
      });
    }
  }*/

  $: ratingRange = 100;
  $: key = "";
  $: genreAmount = checkedGenres.filter((checked) => checked).length;
  $: ratingText = "0 - 18";
  let sort = 1;
</script>

<svelte:head>
  <title>Cinemika - Movies</title>
</svelte:head>

<div class="flex w-screen h-max">
  <div class="w-0 sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col flex-grow w-full pb-5">
    <div
      class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:justify-between sm:px-0"
    >
      <div
        class="flex-wrap sm:flex-nowrap sm:justify-start w-full sm:w-2/5 mx-auto px-3 sm:px-0 sm:mx-0 sm:mt-2"
      >
        <Searchbar
          longSearchBarSize="w-full"
          shortSearchBarSize="w-full"
          shortSearchBarText="Search for a movie"
          longSearchBarText="Search for a movie"
          input={key}
          on:inputChange={(event) => {
            key = event.detail.toLowerCase().trim();
            //filter();
          }}
        />
      </div>
      <div class="flex flex-col lg:mx-0 sm:justify-end">
        <div class="flex space-x-4 relative mx-auto">
          <div class="fskDropdown">
            <button
              id="dropdownBgHoverButton"
              class="text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
              on:click={() => {
                showFskDropdown = !showFskDropdown;
                showGenreDropdown = false;
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 mr-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              {#key ratingText}
                FSK <span class="hidden xl:block"
                  >{ratingText != "" ? `(${ratingText})` : ""}</span
                >
              {/key}
              <svg
                id="fsk"
                class="w-2.5 h-2.5 ms-3 duration-300"
                class:rotate-180={showFskDropdown}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="regionDropDown"
              class:hidden={!showFskDropdown}
              class="z-10 w-max bg-buttonBlue rounded-lg shadow absolute origin-top mt-3 overflow-x-scroll"
            >
              <ul
                class="p-3 space-y-1 text-sm text-textWhite"
                aria-labelledby="regionDropDown"
              >
                <li>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    bind:value={ratingRange}
                    on:change={() => {
                      //filter();
                    }}
                    class="w-full h-2 rounded-lg cursor-pointer"
                    step="25"
                  />
                  <div
                    class="w-full flex justify-between text-xs px-2 text-textWhite"
                  >
                    <span>0</span>
                    <span>6</span>
                    <span>12</span>
                    <span>16</span>
                    <span>18</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="genreDropDown">
            <button
              id="dropdownBgHoverButton"
              class="text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
              on:click={() => {
                showFskDropdown = false;
                showGenreDropdown = !showGenreDropdown;
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 mr-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                />
              </svg>

              Genres
              <span class="hidden lg:block"
                >{genreAmount != 0 ? `(${genreAmount})` : "(All)"}</span
              >
              <svg
                id="genre"
                class="w-2.5 h-2.5 ms-3 duration-300"
                class:rotate-180={showGenreDropdown}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="regionDropDown"
              class:hidden={!showGenreDropdown}
              class="z-10 w-max bg-buttonBlue rounded-lg shadow absolute origin-top mt-3 overflow-x-scroll"
            >
              <ul
                class="p-3 space-y-1 text-sm text-textWhite"
                aria-labelledby="regionDropDown"
              >
                {#each genres as genre, index}
                  <li>
                    <div
                      class="flex items-center p-2 rounded hover:bg-headerBlue duration-300"
                    >
                      <input
                        id="checkbox-item-{genre}"
                        type="checkbox"
                        on:change={() => {
                          checkedGenres[index] = !checkedGenres[index];
                          //filter();
                        }}
                        class="w-4 h-4 text-tileBlue bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
                      />
                      <label
                        for="checkbox-item-{genre}"
                        class="w-full ms-2 text-sm font-medium text-textWhite rounded"
                        >{genre}</label
                      >
                    </div>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
          <div class="sortRating">
            <button
              class="justify-end text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              on:click={() => {
                if (sort % 2 == 1) {
                  displayedMovies = displayedMovies.sort((a, b) => {
                    return a.Rating - b.Rating;
                  });
                } else {
                  displayedMovies = displayedMovies.sort((a, b) => {
                    return b.Rating - a.Rating;
                  });
                }
                sort++;
              }}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 mr-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              Rating
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 ml-1 rotate-90"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr class="h-px bg-textWhite border-0 w-full mt-2" />
    <div class="max-w-xs md:max-w-none mx-9">
      <div
        class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5 gap-5 gap-y-5 md:gap-y-10"
      >
        {#key forNow}
          {#if displayedMovies.length > 0}
            {#each displayedMovies as movie}
              <div class="relative hover:scale-105 duration-300">
                <MainCard {movie} />
              </div>
            {/each}
          {/if}
        {/key}
      </div>
    </div>
    <div class="flex" class:hidden={displayedMovies.length != 0}>
      <p class="text-textWhite text-xl mt-4">
        <span class="font-bold">We are sorry, no movies are found</span><button
          class="ml-5 text-textWhite font-semibold py-2 px-4 bg-buttonBlue hover:bg-headerBlue rounded-lg duration-300"
          on:click={() => {
            ratingRange = 100;
            for (let i = 0; i < checkedGenres.length; i++) {
              checkedGenres[i] = false;
            }
            key = "";
            displayedMovies = JSON.parse(JSON.stringify(allSpecialEvents));
          }}>Reset Filters</button
        >
      </p>
    </div>
  </div>
  <div class="w-0 sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
