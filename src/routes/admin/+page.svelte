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

  export let data: PageData;
  const revenueData: any = data.revenueData;
  let location = "All";
  let locations = [
    "All",
    "Berlin",
    "Munich",
    "Hamburg",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Düsseldorf",
    "Dortmund",
    "Essen",
    "Leipzig",
    "Bremen",
    "Dresden",
    "Hanover",
    "Nuremberg",
    "Duisburg",
    "Bochum",
    "Wuppertal",
    "Bielefeld",
    "Bonn",
  ];

  function rerunLoadFunction() {
    invalidate("app:newLocation");
    invalidateAll();
  }

  let showDropdown = false;

  const username =
    "<span class='font-semibold text-red-600'>Admin</span> John Doe";

  function getGreetings() {
    const time = new Date();
    if (time.getHours() < 12) return "Good Morning";
    else if (time.getHours() < 18) return "Good Afternoon";
    else return "Good Evening";
  }

  onMount(() => {
    localStorage.getItem("cinema") || "All";
    rerunLoadFunction();
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

  async function addPopUp() {
    await fireSwal("add", "What do you want to add?");
  }
  async function editPopUp() {
    await fireSwal("edit", "What do you want to edit?");
  }
  async function deletePopUp() {
    await fireSwal("remove", "What do you want to remove?");
  }
  async function overViewPopUp() {
    await fireSwal("overview", "What do you want to see?");
  }
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<head:svelte>
  <title>Cinemika - Statistics</title>
</head:svelte>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col max-w-full flex-grow">
    <div class="flex justify-between">
      <div class="text-textWhite my-4 text-xl">
        {getGreetings()}, {@html username}
      </div>
      <div class="text-textWhite my-4 text-xl">
        <div class="flex">
          <button
            id="dropdownBgHoverButton"
            class="text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
            on:click={() => (showDropdown = !showDropdown)}
          >
            {location}
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
          <div class="flex justify-end">
            <div
              class:hidden={!showDropdown}
              class="z-10 bg-buttonBlue rounded-lg shadow absolute origin-top mt-10"
            >
              <ul class="p-3 space-y-1 text-sm text-textWhite grid grid-cols-2">
                {#each locations as l}
                  <button
                    on:click={() => {
                      showDropdown = false;
                      location = l;
                      localStorage.setItem("cinema", l);
                      rerunLoadFunction();
                    }}
                  >
                    <li>
                      <div
                        class="flex items-center p-2 rounded hover:bg-headerBlue duration-300 text-left"
                      >
                        {l}
                      </div>
                    </li>
                  </button>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 w-full h-full gap-5">
      {#key location}
        <div class="grid bg-tileBlue rounded-md w-full h-full col-span-3">
          <div class="flex flex-col relative">
            <div class="absolute text-textWhite text-xl ml-2 mt-1">
              Cinema visted, revenue:
            </div>
            <div class="w-full h-full px-5 py-5">
              <LineChart data={revenueData} />
            </div>
          </div>
        </div>
      {/key}
      <div class="grid bg-tileBlue rounded-md w-full h-full">
        <button
          class="flex px-10 py-5 bg-buttonBlue rounded-md hover:bg-green-500 duration-300 text-textWhite"
          on:click={addPopUp}
        >
          <div class="flex mx-auto my-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 my-auto mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add settings
          </div>
        </button>
      </div>
      <div class="grid bg-tileBlue rounded-md w-full h-full">
        <button
          class="flex bg-buttonBlue rounded-md hover:bg-green-500 duration-300 text-textWhite"
          on:click={editPopUp}
        >
          <div class="flex mx-auto my-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 my-auto mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>

            Edit settings
          </div>
        </button>
      </div>
      <div class="grid bg-tileBlue rounded-md w-full h-full">
        <button
          class="flex bg-buttonBlue rounded-md hover:bg-green-500 duration-300 text-textWhite"
          on:click={deletePopUp}
        >
          <div class="flex mx-auto my-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 my-auto mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            Remove settings
          </div>
        </button>
      </div>
      <div class="grid col-span-3 bg-tileBlue rounded-md w-full h-full">
        <button
          class="flex px-10 py-5 bg-buttonBlue rounded-md hover:bg-green-500 duration-300 text-textWhite"
          on:click={overViewPopUp}
        >
          <div class="flex mx-auto my-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 my-auto mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>

            Overview an element
          </div>
        </button>
      </div>
    </div>
  </div>
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
