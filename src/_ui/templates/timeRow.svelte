<script lang="ts">
  import HallDropdown from "./hallDropdown.svelte";
  import PlusButton from "./plusButton.svelte";
  export let times: any[] = [];
  export let date = "1999-12-09";
  export let hallname = "";
  $: {
    times = times;
    hallname = hallname;
    date = date;
  }
</script>

<div
  class="h-full w-full flex flex-row gap-x-2 items-center px-3 bg-backgroundBlue rounded-md"
>
  <div class="w-[20%] h-[70%]">
    <HallDropdown bind:hallname />
  </div>

  <input
    type="date"
    bind:value={date}
    class="flex w-[13%] h-[70%] bg-gray-50 border border-gray-300 text-gray-900 text-[90%] rounded-lg focus:ring-blue-500
      focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Select date"
  />

  <div
    class="w-[80%] h-full flex flex-row gap-x-4 items-center overflow-x-scroll py-2 px-1"
  >
    {#key times}
      {#each times as time, thisTime}
        <div class="relative flex-none w-[13%] h-full">
          <input
            class="w-full h-full rounded-md text-[90%]"
            type="time"
            bind:value={time}
          />
          <button
            class="absolute w-[16%] h-[30%] top-0 right-0 translate-x-[55%] -translate-y-[50%] rounded-full"
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
    {/key}
  </div>
  <button
    on:click={() => {
      times = [...times, "12:00"];
    }}
    class="flex place-self-end my-auto w-[3%] hover:bg-blue-400 rounded-full"
  >
    <PlusButton />
  </button>
</div>
