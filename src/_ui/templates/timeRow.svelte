<script lang="ts">
  import HallDropdown from "./hallDropdown.svelte";
  import PlusButton from "./plusButton.svelte";
  import TheatreDropdown from "./theatreDropdown.svelte";
  export let times: any[] = [];
  export let date: string;
  export let selectedTheatre = {
    Name: "Select Theatre",
    ID: "",
    LogoURL: null,
    AddressID: "",
  };
  export let selectedHall = {
    ID: "",
    Name: "No halls",
    Capacity: 0,
    TheatreID: "",
  };

  $: {
    times = times;
    selectedHall = selectedHall;
    selectedTheatre = selectedTheatre;
  }
</script>

<div
  class="h-full w-full flex flex-row gap-x-2 items-center px-3 bg-backgroundBlue rounded-md"
>
  <div class="w-[24%] h-[70%]">
    <TheatreDropdown
      on:theatreWasSelected={() => {
        selectedHall = {
          ID: "",
          Name: "Select Hall",
          Capacity: 0,
          TheatreID: "",
        };
      }}
      bind:selectedTheatre
    />
  </div>
  <div class="w-[20%] h-[70%]">
    <HallDropdown bind:selectedTheatre bind:selectedHall />
  </div>

  <input
    type="date"
    bind:value={date}
    class="flex-none w-[15%] h-[70%] bg-gray-50 border border-gray-300 text-gray-900 text-[90%] rounded-lg focus:ring-blue-500
      focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  />

  <div
    class="w-[80%] h-full flex flex-row gap-x-3 items-center overflow-x-auto overflow-y-hidden py-[0.4rem] px-1"
  >
    {#each times as time, thisTime}
      <div class="relative w-[26%] flex h-[90%]">
        <input class="w-full h-auto rounded-md" type="time" bind:value={time} />
        <button
          class:hidden={times.length === 1}
          class="absolute z-10 w-[16%] h-[30%] top-0 right-0 translate-x-[55%] -translate-y-[50%] rounded-full"
          on:click={() => {
            times.splice(thisTime, 1);
            times = times;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            viewBox="7 3 9 18"
            stroke-width="1.5"
            stroke="#000000"
            class="w-full h-full"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    {/each}
  </div>
  <button
    on:click={() => {
      times = [...times, "12:00"];
    }}
    class="flex place-self-end my-auto w-[4%] hover:bg-blue-400 rounded-full"
  >
    <PlusButton />
  </button>
</div>
