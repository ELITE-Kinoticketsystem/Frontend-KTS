<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Searchbar from "../../_ui/templates/searchbar.svelte";
  import Swal from "sweetalert2";
  import { fire } from "$lib/swalTemplate";

  export let data;

  let specialEvents = data.specialEvents;

  $: displayedSpecialEvents = JSON.parse(JSON.stringify(specialEvents));

  let showFskDropdown = false;

  onMount(() => {
    displayedSpecialEvents.sort((a: any, b: any) => {
      return new Date(a.Start).getTime() - new Date(b.Start).getTime();
    });
    displayedSpecialEvents = displayedSpecialEvents;
  });

  $: ratingText = "0 - 18";
  $: ratingRange = 100;
  let fromDate: any = new Date().toISOString().split("T")[0];
  let toDate: any = "";
  let key = "";

  $: minValueFromDate =
    toDate == "" ? new Date().toISOString().split("T")[0] : toDate;
  $: minValueToDate =
    fromDate == "" ? new Date().toISOString().split("T")[0] : fromDate;
  function getTotalTime(specialEvent: any): number {
    let movies = specialEvent.Movies;
    let totalTime = 0;
    for (let i = 0; i < movies.length; i++) {
      totalTime += movies[i].TimeInMin;
    }
    return totalTime;
  }
  function getMaxFsk(specialEvent: any): number {
    let movies = specialEvent.Movies;
    let maxFsk = 0;
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].Fsk > maxFsk) {
        maxFsk = movies[i].Fsk;
      }
    }
    return maxFsk;
  }

  let fskMap = new Map();
  fskMap.set("0", 0);
  fskMap.set("25", 6);
  fskMap.set("50", 12);
  fskMap.set("75", 16);
  fskMap.set("100", 18);

  function filter() {
    let age = fskMap.get(ratingRange.toString());
    ratingText = "0 - " + age;

    if (key != "") {
      displayedSpecialEvents = specialEvents.filter((specialEvent: any) => {
        return specialEvent.Title.toLowerCase().includes(
          key.toLowerCase().trim()
        );
      });
    } else {
      displayedSpecialEvents = JSON.parse(JSON.stringify(specialEvents));
    }
    displayedSpecialEvents = displayedSpecialEvents.filter(
      (specialEvent: any) => {
        return getMaxFsk(specialEvent) <= age;
      }
    );
    if (fromDate != "") {
      displayedSpecialEvents = displayedSpecialEvents.filter(
        (specialEvent: any) => {
          return new Date(specialEvent.Start) >= new Date(fromDate);
        }
      );
    }
    if (toDate != "") {
      displayedSpecialEvents = displayedSpecialEvents.filter(
        (specialEvent: any) => {
          return new Date(specialEvent.Start) <= new Date(toDate);
        }
      );
    }
    displayedSpecialEvents.sort((a: any, b: any) => {
      return new Date(a.Start).getTime() - new Date(b.Start).getTime();
    });
    if (displayedSpecialEvents.length == 0) {
      document.getElementById("nospecialEvents")!.hidden = false;
    } else {
      document.getElementById("nospecialEvents")!.hidden = true;
    }
    displayedSpecialEvents = displayedSpecialEvents;
  }

  function resetFilters() {
    displayedSpecialEvents = JSON.parse(JSON.stringify(specialEvents));
    ratingRange = 100;
    fromDate = new Date().toISOString().split("T")[0];
    toDate = "";
    key = "";
    displayedSpecialEvents.sort((a: any, b: any) => {
      return new Date(a.Start).getTime() - new Date(b.Start).getTime();
    });
  }
  function validateDate() {
    if (fromDate != "" && toDate != "") {
      if (fromDate > toDate) {
        toDate = fromDate;
      }
      filter();
    } else {
      displayedSpecialEvents = JSON.parse(JSON.stringify(specialEvents));
      filter();
    }
  }
</script>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col w-full h-full flex-grow mx-auto">
    <div
      class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:justify-between sm:px-0"
    >
      <div
        class="flex-wrap sm:flex-nowrap sm:justify-start w-full sm:w-2/5 mx-auto px-3 sm:px-0 sm:mx-0 sm:mt-2"
      >
        <Searchbar
          longSearchBarSize="w-full"
          shortSearchBarSize="w-48"
          shortSearchBarText="Search for a movie ..."
          longSearchBarText="Search for a movie or the name of a special event"
          input={key}
          on:inputChange={(event) => {
            key = event.detail;

            filter();
          }}
        />
      </div>
      <div class="flex flex-col lg:mx-0 sm:justify-end">
        <div class="flex space-x-4 relative mx-auto">
          <div class="fromDatepicker">
            <input
              type="date"
              name=""
              on:change={validateDate}
              bind:value={fromDate}
              id="fromDatePicker"
              class="text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            />
          </div>
          <p class="my-auto text-textWhite">to</p>
          <div class="toDatepicker">
            <input
              type="date"
              name=""
              on:change={validateDate}
              bind:value={toDate}
              id="toDatepicker"
              class="text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            />
          </div>
          <div class="fskDropdown">
            <button
              id="dropdownBgHoverButton"
              class="text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
              on:click={() => {
                showFskDropdown = !showFskDropdown;
                filter();
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
                      filter();
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
        </div>
      </div>
    </div>
    <hr class="h-px bg-textWhite border-0 w-full mt-2" />
    {#each displayedSpecialEvents as specialEvent}
      <p class="mt-3 mb-2 leading-none text-textWhite text-2xl font-semibold">
        {new Date(specialEvent.Start).toLocaleDateString()} - {specialEvent.Title}
      </p>
      <button
        class="flex flex-row bg-tileBlue rounded-md px-2 py-2 hover:scale-[1.02] duration-300 mb-10"
        on:click={() => {
          goto(`/specialevents/${specialEvent.ID}`);
        }}
      >
        <div class="relative basis-1/4 flex-shrink-0 h-max">
          <img
            src={specialEvent.Movies[0].CoverPicURL}
            alt={specialEvent.Movies[0].Title}
            class="min-w-full h-auto aspect-auto overflow-hidden rounded-md"
          />
        </div>
        <div class="flex flex-col mx-auto">
          <div class="text-2xl font-semibold text-textWhite">
            <div class="flex text-center justify-center">
              {specialEvent.Title}
            </div>
            <div
              class="flex flex-col sm:flex-row md:flex-row gap-2 text-textWhite mt-5 gap-x-5 justify-center"
            >
              <p class="flex text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span class="ml-1">FSK {getMaxFsk(specialEvent)}</span>
              </p>
              <p class="flex text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="ml-1">{getTotalTime(specialEvent)}min</span>
              </p>
            </div>
          </div>
          <p class="my-4 text-base font-normal text-textWhite px-4">
            {#if specialEvent.Description.length > 450}
              {specialEvent.Description.substring(0, 450)}...
            {:else}
              {specialEvent.Description}
            {/if}
          </p>
        </div>
      </button>
    {/each}
    <p
      id="nospecialEvents"
      class="text-textWhite text-xl font-semibold mx-auto mt-10"
      hidden
    >
      No special events were found! <button
        class="bg-buttonBlue hover:bg-green-600 duration-300 rounded-md px-2 py-1"
        on:click={resetFilters}>Reset filters</button
      >
    </p>
  </div>
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
