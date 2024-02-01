<script lang="ts">
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
  } from "chart.js";
  import { onMount } from "svelte";
  import LineChart from "../../_ui/charts/LineChart.svelte";
  import Swal from "sweetalert2";
  import { goto, invalidate, invalidateAll } from "$app/navigation";
  import type { PageData } from "./$types";
  import EditButton from "../../_ui/templates/editButton.svelte";
  import { apiUrl } from "$lib/_services/authService";
  import { fire } from "$lib/swalTemplate";

  export let data: PageData;

  $: revenueData = data.revenueData;

  let theatres: any[] = [];

  let currentTheatre = "All";

  function rerunLoadFunction() {
    invalidate("app:newLocation");
    invalidateAll();
  }

  let showDropdown = false;

  let username = "";

  function getGreetings() {
    const time = new Date();
    if (time.getHours() < 12) return "Good Morning";
    else if (time.getHours() < 18) return "Good Afternoon";
    else return "Good Evening";
  }
  function getTheatres() {
    fetch(`${apiUrl}/theatres`, {
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          fire("A database error occured when trying to get theatres", 3000);
          return;
        }

        return response.json();
      })
      .then((fetchedTheatres) => {
        theatres = fetchedTheatres;
        theatres.push({ Name: "All" });
      });
  }

  onMount(() => {
    currentTheatre = localStorage.getItem("admin-view") || "All";
    username = "John Doe";
    // "<span class='font-semibold text-red-600'>Admin</span> " +
    // JSON.parse(sessionStorage.getItem("user")!).Username;
    rerunLoadFunction();
    getTheatres();
  });

  async function fireSwal(type: string, title: string) {
    const inputOptions = new Promise((resolve) => {
      if (type.toLowerCase() === "add") {
        resolve({
          "/admin/mylocations/add": "Location",
          "/admin/mycinemas/add": "Cinema",
          "/admin/mymovies/add": "Movie",
          "/admin/myevents/add": "Event",
        });
      } else if (type.toLowerCase() === "edit") {
        resolve({
          "/admin/mylocations/edit": "Location",
          "/admin/mycinemas/edit": "Cinema",
          "/admin/mymovies/edit": "Movie",
          "/admin/myevents/edit": "Event",
        });
      } else if (type.toLowerCase() === "overview") {
        resolve({
          "/admin/mylocations": "Location",
          "/admin/mycinemas": "Cinema",
          "/admin/mymovies": "Movie",
          "/admin/myevents": "Event",
        });
      } else {
        resolve({
          "/admin/mylocations/remove": "Location",
          "/admin/mycinemas/remove": "Cinema",
          "/admin/mymovies/remove": "Movie",
          "/admin/myevents/edit": "Event",
        });
      }
    });
    const { value: option } = await Swal.fire({
      title: title,
      input: "radio",
      inputOptions,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to choose something!";
        }
      },
    });
    if (option) {
      goto(option);
    }
  }

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<head:svelte>
  <title>Cinemika - Statistics</title>
</head:svelte>

<div class="flex flex-col items-center gap-y-6 w-[70%] h-[87vh] mx-auto mb-2">
  <div class="flex flex-row items-center w-full h-[6%] justify-between">
    <div class="text-textWhite my-4 text-xl">
      {getGreetings()}, {@html username}
    </div>
  </div>

  {#key location}
    <div class="relative bg-tileBlue rounded-md w-full h-[75%] p-3">
      <div class="absolute top-1 left-2 text-textWhite text-xl">
        Cinema visted, revenue:
      </div>
      <div class="absolute z-40 w-[12%] -top-0 right-0 text-textWhite text-xl">
        <button
          id="dropdownBgHoverButton"
          class="w-full flex flex-row justify-between text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none
          focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center items-center"
          type="button"
          on:click={() => (showDropdown = !showDropdown)}
        >
          {currentTheatre}
          <svg
            id="arrowRegion"
            class="w-2.5 h-2.5 ms-3 duration-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
            class:rotate-180={showDropdown}
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
          class:hidden={!showDropdown}
          class=" z-40 bg-buttonBlue rounded-lg shadow mt-1 p-3 flex flex-col text-sm text-textWhite max-h-[15vh] w-full overflow-y-auto"
        >
          {#each theatres as theatre}
            {#if theatre.Name !== currentTheatre}
              <button
                class="w-full"
                on:click={() => {
                  showDropdown = false;
                  currentTheatre = theatre.Name;
                  localStorage.setItem("admin-view", theatre.Name);
                  rerunLoadFunction();
                }}
              >
                <div
                  class="flex items-center p-2 rounded hover:bg-headerBlue duration-300 text-left"
                >
                  {theatre.Name}
                </div>
              </button>
            {/if}
          {/each}
        </div>
      </div>
      <div class="w-full h-full">
        <LineChart data={revenueData} />
      </div>
    </div>
  {/key}
  <div
    class="flex flex-row items-center place-content-evenly w-full h-[8%] mb-2"
  >
    <div class="w-[18%] h-full">
      <EditButton
        name={"Theatres"}
        routeWhenClicked={"admin/mylocations/add"}
      />
    </div>
    <div class="w-[18%] h-full">
      {#key theatres}
        <EditButton
          isDisabled={theatres === null ? true : theatres.length === 0}
          name={"Halls"}
          routeWhenClicked={"admin/mycinemas/add"}
        />
      {/key}
    </div>
    <div class="w-[18%] h-full">
      <EditButton name={"Events"} routeWhenClicked={"admin/myshowings/add"} />
    </div>
    <div class="w-[18%] h-full">
      <EditButton name={"Movies"} routeWhenClicked={"admin/mymovies/add"} />
    </div>
    <div class="w-[18%] h-full">
      <EditButton name={"Genres"} routeWhenClicked={"admin/mygenres"} />
    </div>
  </div>
</div>
