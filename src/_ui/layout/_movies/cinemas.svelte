<script lang="ts">
  import Searchbar from "../../templates/searchbar.svelte";
  import TheatreCard from "../../templates/theatreCard.svelte";
  import CinemaTileIcon from "$lib/assets/cinemaTile.png";
  import { browser } from "$app/environment";
  import { createEventDispatcher, onMount } from "svelte";
  import { apiUrl } from "$lib/_services/authService";
  import { goto } from "$app/navigation";

  let theatres: any[] = [];
  let displayedTheatres: any[] = [];

  const maxNrOfTheatresToDisplay = 12;

  let cinema = "All";
  async function getAllTheatres(): Promise<any[]> {
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

  onMount(async () => {
    if (browser) cinema = localStorage.getItem("cinema") || "All";
    theatres = await getAllTheatres();
    displayedTheatres = JSON.parse(JSON.stringify(theatres));
  });

  function filterName(key: string): boolean {
    let filteredTheatres = [];
    for (let i = 0; i < theatres.length; ++i) {
      if (theatres[i].Name.toLowerCase().includes(key.trim().toLowerCase())) {
        filteredTheatres.push(theatres[i]);
      }
    }
    displayedTheatres = filteredTheatres;
    return displayedTheatres.length !== 0;
  }

  const dispatch = createEventDispatcher();
</script>

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
  <div class="my-4 mb-2">
    <div
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10"
    >
      {#each displayedTheatres.slice(0, maxNrOfTheatresToDisplay) as theatre}
        <div
          class="flex flex-col card bg-tileBlue text-white rounded-lg shadow-lg overflow-hidden hover:scale-105 duration-300"
        >
          <img
            class="h-48 w-full object-cover"
            src={theatre.LogoUrl}
            alt={theatre.Name}
          />
          <div class="flex flex-col p-6">
            <h2 class="text-lg font-semibold">
              {theatre.Name}
            </h2>
            <p class="text-sm">
              {theatre.Address.Street}, {theatre.Address.StreetNr}
            </p>
            <p class="text-sm">
              {theatre.Address.Zipcode}
              {theatre.Address.City}
            </p>
            <button
              class="mt-4 bg-buttonBlue hover:bg-green-500 duration-300 text-white font-bold py-2 px-4 rounded"
              on:click={() => {
                if (browser) {
                  dispatch("dataLoaded", {
                    cinema: theatre.Name,
                  });
                  localStorage.setItem("cinema", theatre.Name);
                  localStorage.setItem("cinemaId", theatre.ID);
                }
              }}
            >
              Select
            </button>
          </div>
        </div>
      {/each}
      {#if displayedTheatres.length === 0}
        <p class="text-textWhite text-center text-md font-bold">
          No theatres found!
        </p>
      {/if}
    </div>
  </div>
</div>
