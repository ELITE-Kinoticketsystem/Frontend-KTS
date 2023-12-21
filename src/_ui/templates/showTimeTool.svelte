<script lang="ts">
  import PlusButton from "./plusButton.svelte";
  import TimeRow from "./timeRow.svelte";

  export let allShowings = [{ date: "1999-12-09", times: ["12:00", "08:00"] }];
  export let date = "1999-12-09";
  $: {
    date = date;
    allShowings = allShowings;
  }
</script>

<div class="w-full h-full flex flex-col items-center">
  <div
    class="w-full h-full flex place-self-start flex-col gap-y-1 overflow-y-scroll"
  >
    {#each allShowings as showing}
      <div class="flex-none h-[24%] w-full">
        <TimeRow bind:times={showing.times} bind:date />
      </div>
    {/each}
  </div>
  <button
    on:click={() => {
      allShowings = [...allShowings, { date: date, times: ["12:00"] }];
    }}
    class="flex place-self-end mx-auto w-[3%] my-1 hover:bg-blue-400 rounded-full"
  >
    <PlusButton />
  </button>
</div>
