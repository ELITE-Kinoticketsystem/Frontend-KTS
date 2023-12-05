<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import Searchbar from "../../_ui/templates/searchbar.svelte";

  export let data;

  const allLocations: any | unknown[] = data.locations;

  let displayedLocations: any[] = JSON.parse(JSON.stringify(allLocations));

  displayedLocations.sort((a: any, b: any) => {
    return a.city.localeCompare(b.city);
  });

  function filterLocations(key: string) {
    if (key === "" || key === undefined) {
      displayedLocations = JSON.parse(JSON.stringify(allLocations));
      return;
    }
    displayedLocations = allLocations.filter((location: any) => {
      return location.city.toLowerCase().includes(key);
    });
  }

  let cinema = "Not selected";
  onMount(() => {
    if (browser) cinema = localStorage.getItem("cinema");
  });
</script>

<head:svelte>
  <title>Cinemika - Locations</title>
</head:svelte>

<div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
<div class="flex flex-col flex-grow w-max mx-auto">
  <div class="mx-auto text-textWhite my-5">
    <span class="text-2xl">Current selection: </span>
    <span class="font-bold text-2xl"> {cinema}</span>
    <button
      class="text-textWhite text-lg py-px px-2 hover:bg-tileBlue duration-300 bg-buttonBlue rounded-lg"
      on:click={() => {
        if (browser) {
          localStorage.setItem("cinema", "Not selected");
          window.location.href = "/";
        }
      }}>Skip</button
    >
  </div>
  <div class="mx-5">
    <Searchbar
      shortSearchBarSize="w-full"
      longSearchBarSize="w-full"
      shortSearchBarText="Search for a location"
      longSearchBarText="Search for a location"
      on:inputChange={(event) => {
        let key = event.detail.toLowerCase().trim();
        filterLocations(key);
      }}
    />
  </div>
  <div class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4 mt-5">
    {#each displayedLocations as location}
      <div
        class="flex flex-col card bg-tileBlue text-white rounded-lg shadow-lg overflow-hidden"
      >
        <img
          class="h-48 w-full object-cover"
          src="https://www.bildagentur-rath.de/fileadmin/_processed_/2/8/csm_2010-05-22__803_D_571klein_ee669368c1.jpg"
          alt={location.city}
        />
        <div class="flex flex-col p-6">
          <h2 class="text-lg font-semibold">
            {location.city}, {location.country}
          </h2>
          <p class="text-sm">{location.address}</p>
          <button
            class="mt-4 bg-buttonBlue hover:bg-green-800 duration-300 text-white font-bold py-2 px-4 rounded"
            on:click={() => {
              if (browser) {
                localStorage.setItem("cinema", location.city);
                window.location.href = "/";
              }
            }}
          >
            Select
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>
<div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
