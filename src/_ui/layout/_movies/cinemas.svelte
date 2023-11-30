<script lang="ts">
  import DropDownMenu from "../../templates/dropDownMenu.svelte";
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

  function filterRegion() {
    let filteredTheatres = [];
    for (let i = 0; i < theatres.length; ++i) {
      if (regionsToFilter.length === 0) {
        displayedTheatres = theatres;
        return;
      }
      for (let j = 0; j < regionsToFilter.length; ++j) {
        if (theatres[i].region === regionsToFilter[j]) {
          filteredTheatres.push(theatres[i]);
        }
      }
    }
    displayedTheatres = filteredTheatres;
  }
  function filterType() {
    let filteredTheatres = [];
    for (let i = 0; i < theatres.length; ++i) {
      if (typesToFilter.length === 0) {
        displayedTheatres = theatres;
        return;
      }
      for (let j = 0; j < typesToFilter.length; ++j) {
        if (theatres[i].supportedTypes.includes(typesToFilter[j])) {
          filteredTheatres.push(theatres[i]);
        }
      }
    }
    displayedTheatres = filteredTheatres;
  }
  let theatre = {
    name: "Cineplex",
    logo: CinemaTileIcon,
    location: "Mannheim",
    region: "Baden-Württemberg",
    supportedTypes: ["2D", "3D"],
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
      region: "Baden-Württemberg",
      supportedTypes: ["2D"],
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
      supportedTypes: ["2D", "4D"],
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
      <div class="flex flex-start flex-row">
        <div class="mr-5">
          <button
            id="dropdownBgHoverButton"
            data-dropdown-toggle="dropdownBgHover"
            on:click={() => {
              document
                .getElementById("regionDropDown")
                .classList.toggle("hidden");
              document
                .getElementById("arrowRegion")
                .classList.toggle("rotate-180");
            }}
            class="text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            {#key displayedTheatres}
              Regions ({regionsToFilter.length})
            {/key}
            <svg
              id="arrowRegion"
              class="w-2.5 h-2.5 ms-3 duration-300"
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
            class="z-10 hidden w-48 bg-buttonBlue rounded-lg shadow absolute origin-top mt-2"
          >
            {#each regions as region}
              <ul
                class="p-3 space-y-1 text-sm text-textWhite"
                aria-labelledby="regionDropDown"
              >
                <li>
                  <div
                    class="flex items-center p-2 rounded hover:bg-headerBlue duration-300"
                  >
                    <input
                      id="checkbox-item-{region}"
                      type="checkbox"
                      value=""
                      on:click={() => {
                        if (regionsToFilter.includes(region)) {
                          regionsToFilter.splice(
                            regionsToFilter.indexOf(region),
                            1
                          );
                        } else {
                          regionsToFilter.push(region);
                        }
                        filterRegion();
                      }}
                      class="w-4 h-4 text-tileBlue bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
                    />
                    <label
                      for="checkbox-item-{region}"
                      class="w-full ms-2 text-sm font-medium text-textWhite rounded"
                      >{region}</label
                    >
                  </div>
                </li>
              </ul>
            {/each}
          </div>
        </div>
        <div class="">
          <div class="flex">
            <div class="mr-5">
              <button
                id="dropdownBgHoverButton"
                data-dropdown-toggle="dropdownBgHover"
                on:click={() => {
                  document
                    .getElementById("typeDropDown")
                    .classList.toggle("hidden");
                  document
                    .getElementById("arrowType")
                    .classList.toggle("rotate-180");
                }}
                class="text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                {#key displayedTheatres}
                  Types ({typesToFilter.length})
                {/key}
                <svg
                  id="arrowType"
                  class="w-2.5 h-2.5 ms-3 duration-300"
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
                id="typeDropDown"
                class="z-10 hidden w-48 bg-buttonBlue rounded-lg shadow absolute origin-top mt-2"
              >
                {#each types as type}
                  <ul
                    class="p-3 space-y-1 text-sm text-textWhite"
                    aria-labelledby="regionDropDown"
                  >
                    <li>
                      <div
                        class="flex items-center p-2 rounded hover:bg-headerBlue duration-300"
                      >
                        <input
                          id="checkbox-item-{type}"
                          type="checkbox"
                          value=""
                          on:click={() => {
                            if (typesToFilter.includes(type)) {
                              typesToFilter.splice(
                                typesToFilter.indexOf(type),
                                1
                              );
                            } else {
                              typesToFilter.push(type);
                            }
                            filterType();
                          }}
                          class="w-4 h-4 text-tileBlue bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
                        />
                        <label
                          for="checkbox-item-{type}"
                          class="w-full ms-2 text-sm font-medium text-textWhite rounded"
                          >{type}</label
                        >
                      </div>
                    </li>
                  </ul>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
