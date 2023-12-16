<script lang="ts">
  import { Datepicker } from "flowbite-svelte";
  import PlusButton from "./plusButton.svelte";
  import TimePicker from "./timePicker.svelte";
  export let times: any[] = [];
  export let date = "";
  $: console.log(date);
</script>

<div
  class="h-full w-full flex flex-row gap-x-2 items-center px-1 bg-tileBlue rounded-md"
>
  <Datepicker
    bind:value={date}
    class="flex w-[20%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
      focus:border-blue-500 ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Select date"
  />

  <div
    class="flex flex-row gap-x-4 items-center w-[80%] overflow-x-scroll p-1 h-full"
  >
    {#each times as time}
      <div class="flex-none w-[15%] h-full">
        <TimePicker bind:hours={time.hours} bind:minutes={time.mins} />
      </div>
    {/each}
  </div>
  <button
    on:click={() => {
      times = [...times, { hours: 12, mins: 0 }];
    }}
    class="flex place-self-end my-auto w-[3%] mr-2"
  >
    <PlusButton />
  </button>
</div>
