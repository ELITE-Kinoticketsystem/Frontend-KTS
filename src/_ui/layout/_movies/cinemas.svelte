<script lang="ts">
  import Searchbar from "../../templates/searchbar.svelte";
  import TheatreCard from "../../templates/theatreCard.svelte";
  import CinemaTileIcon from "$lib/assets/cinemaTile.png";
  import { browser } from "$app/environment";
  import { createEventDispatcher } from "svelte";
  import { apiUrl } from "$lib/_services/authService";

  let theatres: any = [];

  let displayedTheatres = JSON.parse(JSON.stringify(theatres));

  const maxNrOfTheatresToDisplay = 12;

  async function getAllTheatres() {
    return new Promise(async (resolve, reject) => {
      await fetch(apiUrl + "/theatres").then((res) => {
        if (res.ok) {
          resolve(res.json());
        } else {
          reject(res);
        }
      });
    });
  }

  function filterName(key: string): boolean {
    let filteredTheatres = [];
    for (let i = 0; i < theatres.length; ++i) {
      if (
        theatres[i].location.toLowerCase().includes(key.trim().toLowerCase())
      ) {
        filteredTheatres.push(theatres[i]);
      }
    }
    displayedTheatres = filteredTheatres;
    return displayedTheatres.length !== 0;
  }

  const dispatch = createEventDispatcher();
</script>

{#await getAllTheatres then theatres}
  <div class="flex flex-col">
    <div class="">
      <p class="mx-auto mt-2 text-2xl text-center text-textWhite font-semibold">
        Please select a cinema to get the showings of the movie
      </p>
    </div>

    <div class="mt-5 mb-2">
      <p class="text-textWhite font-bold text-xl">THEATRES</p>
    </div>

    <div class="flex flex-row w-full">
      <div class="flex">
        <Searchbar
          shortSearchBarText={"Search for a theatre"}
          longSearchBarText={"Search for a theatre"}
          on:inputChange={(e) => {
            filterName(e.detail);
          }}
        />
      </div>
    </div>
    <div class="">
      <div class="my-4 mb-2">
        <div
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10"
        >
          {#each theatres.slice(0, maxNrOfTheatresToDisplay) as theatre}
            <button
              on:click={() => {
                if (browser) {
                  dispatch("dataLoaded", {
                    cinema: theatre.name + " " + theatre.location,
                  });
                  window.localStorage.setItem(
                    "cinema",
                    theatre.name + " " + theatre.location
                  );
                  window.localStorage.setItem(
                    "cinemaId",
                    "CD452F0C99F84176B5BE5FCCB19C0B33"
                  );
                }
              }}
            >
              <TheatreCard {theatre} />
            </button>
          {/each}
          {#if displayedTheatres.length === 0}
            <p class="text-textWhite text-center text-md font-bold">
              No theatres found!
            </p>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/await}
