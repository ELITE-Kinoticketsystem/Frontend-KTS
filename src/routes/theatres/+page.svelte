<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import Searchbar from "../../_ui/templates/searchbar.svelte";
  import { goto } from "$app/navigation";

  export let data;

  const allLocations: any | unknown[] = data.locations;

  let displayedLocations: any[] = JSON.parse(JSON.stringify(allLocations));

  displayedLocations.sort((a: any, b: any) => {
    return a.Name.localeCompare(b.Name);
  });

  function filterLocations(key: string) {
    if (key === "" || key === undefined) {
      displayedLocations = JSON.parse(JSON.stringify(allLocations));
      return;
    }
    displayedLocations = allLocations.filter((location: any) => {
      return location.Name.toLowerCase().includes(key);
    });
  }

  let cinema = "All";
  onMount(() => {
    if (browser) cinema = localStorage.getItem("cinema") || "All";
  });
</script>

<head:svelte>
  <title>Cinemika - Theatresg</title>
</head:svelte>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col w-full h-full flex-grow mx-auto">
    <div
      class="flex flex-row mx-auto text-textWhite my-2 w-full justify-between"
    >
      <div class="justify-start w-1/2">
        <Searchbar
          shortSearchBarSize="w-[38%]"
          longSearchBarSize="w-2/3"
          shortSearchBarText="Search for a theatre"
          longSearchBarText="Search for a theatre"
          on:inputChange={(event) => {
            let key = event.detail.toLowerCase().trim();
            filterLocations(key);
          }}
        />
      </div>
      <div class="justify-end flex flex-row">
        <span class="text-2xl"
          >{cinema === "All" ? "Theatres: " : "Theatre:"}</span
        >
        <span class="font-bold text-2xl ml-1"> {cinema}</span>
        <div class="ml-2 mt-px">
          <button
            class="text-textWhite text-lg py-px px-1 hover:bg-tileBlue duration-300 bg-buttonBlue rounded-lg"
            on:click={() => {
              if (browser) {
                localStorage.setItem("cinema", "All");
                goto("/");
              }
            }}>Skip</button
          >
        </div>
      </div>
    </div>
    <hr />
    <div class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4 mt-5">
      {#each displayedLocations as location}
        <div
          class="flex flex-col card bg-tileBlue text-white rounded-lg shadow-lg overflow-hidden"
        >
          <img
            class="h-48 w-full object-cover"
            src={location.LogoURL}
            alt={location.Name}
          />
          <div class="flex flex-col p-6">
            <h2 class="text-lg font-semibold">
              {location.Name}
            </h2>
            <p class="text-sm">Location WIP</p>
            <button
              class="mt-4 bg-buttonBlue hover:bg-green-500 duration-300 text-white font-bold py-2 px-4 rounded"
              on:click={() => {
                if (browser) {
                  localStorage.setItem("cinema", location.Name);
                  localStorage.setItem("cinemaId", location.ID);
                  goto("/");
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
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
