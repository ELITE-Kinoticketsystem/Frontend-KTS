<script lang="ts">
  import Searchbar from "../../templates/searchbar.svelte";
  import TheatreCard from "../../templates/theatreCard.svelte";
  import CinemaTileIcon from "$lib/assets/cinemaTile.png";
  import { browser } from "$app/environment";
  import { createEventDispatcher } from "svelte";
  import "flowbite-svelte";
  import "flowbite";

  export let data: any;

  const regions: string[] = [
    "Rheinland-Pfalz",
    "Baden-Württemberg",
    "Berlin",
    "Sachsen",
  ];
  const types: string[] = ["2D", "3D", "4D", "5D"];
  let theatres: any = data.theatres;

  let displayedTheatres = JSON.parse(JSON.stringify(theatres));

  const maxNrOfTheatresToDisplay = 12;

  let theatre = {
    name: "Cineplex",
    logo: CinemaTileIcon,
    location: "Mannheim",
  };

  theatres = [
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
    {
      name: "Cineplex",
      logo: CinemaTileIcon,
      location: "Stuttgart",
    },
    {
      name: "Cineplex",
      logo: CinemaTileIcon,
      location: "Mainz",
    },
    {
      name: "Cineplex",
      logo: CinemaTileIcon,
      location: "Bad Kreuznach",
    },
  ];

  displayedTheatres = [
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
    {
      name: "Cineplex",
      logo: CinemaTileIcon,
      location: "Stuttgart",
      region: "Baden-Württemberg",
      supportedTypes: ["2D", "3D"],
    },
    {
      name: "Cineplex",
      logo: CinemaTileIcon,
      location: "Mainz",
      region: "Rheinland-Pfalz",
      supportedTypes: ["2D", "3D"],
    },
    {
      name: "Cineplex",
      logo: CinemaTileIcon,
      location: "Bad Kreuznach",
      region: "Rheinland-Pfalz",
      supportedTypes: ["2D", "3D"],
    },
  ];

  function filterName(key: string): boolean {
    let filteredTheatres = [];
    for (let i = 0; i < theatres.length; ++i) {
      if (theatres[i].location.includes(key.trim())) {
        filteredTheatres.push(theatres[i]);
      }
    }
    displayedTheatres = filteredTheatres;
    return displayedTheatres.length !== 0;
  }

  const dispatch = createEventDispatcher();

  $: regionsToFilter = [];
  $: typesToFilter = [];
</script>

<div class="flex flex-col">
  <div class="">
    <p
      class="mx-auto mt-16 mb-10 text-2xl text-center text-textWhite font-semibold"
    >
      Please select a cinema to get the showings of the movie
    </p>
  </div>

  <div class="mt-5 mb-2">
    <p class="text-textWhite font-bold text-xl">THEATRES</p>
  </div>

  <div class="flex flex-row w-full justify-between">
    <div class="flex">
      <Searchbar
        shortSearchBarText={"Search cine..."}
        longSearchBarText={"Search cinemas"}
        on:inputChange={(e) => {
          filterName(e.detail);
        }}
      />
    </div>
  </div>
  <div class="">
    <div class="my-4 mb-40">
      <div class="grid grid-cols-6 gap-x-4 gap-y-10">
        {#each displayedTheatres.slice(0, maxNrOfTheatresToDisplay) as theatre}
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
