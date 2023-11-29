<script lang="ts">
  import DropDownMenu from "../../templates/dropDownMenu.svelte";
  import Searchbar from "../../templates/searchbar.svelte";
  import TheatreCard from "../../templates/theatreCard.svelte";
  import CinemaTileIcon from "$lib/assets/cinemaTile.png";
  import { browser } from "$app/environment";
  import { createEventDispatcher } from "svelte";

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

  const frstDropDownItemType = "Region";
  const sndDropDownItemType = "Typ";
  const maxNrOfTheatresToDisplay = 12;

  function filterRegion(regionToFilterFor: string) {
    let filteredTheatres = [];
    for (let i = 0; i < theatres.length; ++i) {
      if (theatres[i].region === regionToFilterFor) {
        filteredTheatres.push(theatres[i]);
      }
    }
    displayedTheatres = filteredTheatres;
  }
  function filterType(typeToFilterFor: string) {
    let filteredTheatres = [];
    for (let i = 0; i < theatres.length; ++i) {
      if (theatres[i].supportedTypes.includes(typeToFilterFor)) {
        filteredTheatres.push(theatres[i]);
      }
    }
    if (filteredTheatres.length === 0) {
      return "No theatres found";
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
</script>

<div class="flex flex-col">
  <div class="">
    <p
      class="mx-auto mt-16 mb-10 text-2xl text-center text-textWhite dark:text-gra"
    >
      Please select a cinema to get the showings of the movie
    </p>
  </div>

  <div class="mt-5 mb-2">
    <p class="text-textWhite">THEATRES</p>
  </div>

  <div class="flex flex-row w-full justify-between">
    <div class="flex">
      <div class="flex flex-start flex-row">
        <div class="mr-5">
          <DropDownMenu
            color="bg-buttonBlue"
            items={regions}
            type={"Region"}
            func={filterRegion}
            paramForFunc={frstDropDownItemType}
          />
        </div>
        <div class="">
          <div class="flex">
            <DropDownMenu
              color="bg-buttonBlue"
              items={types}
              type={"Typ"}
              func={filterType}
              paramForFunc={sndDropDownItemType}
            />
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
