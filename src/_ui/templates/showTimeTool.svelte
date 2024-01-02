<script lang="ts">
  import PlusButton from "./plusButton.svelte";
  import TimeRow from "./timeRow.svelte";

  export let allShowings = [
    {
      hallname: "Select a hall",
      date: "1999-12-09",
      times: ["12:00", "08:00"],
    },
  ];
  export let date = "1999-12-09";
  let hallname = "Select a hall";
  $: {
    date = date;
    hallname = hallname;
    allShowings = allShowings;
  }
</script>

<div class="w-full h-full flex flex-col items-center">
  <div class="w-full h-[80%] flex flex-col gap-y-3 overflow-y-auto p-2">
    {#each allShowings as showing, thisShowing}
      <div class="relative flex-none h-[27%] w-full">
        <TimeRow
          bind:times={showing.times}
          bind:date
          bind:hallname={showing.hallname}
        />
        <button
          class="z-10 w-[3%] aspect-1 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          on:click={() => {
            allShowings.splice(thisShowing, 1);
            allShowings = allShowings;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            viewBox="3 -2 15 25"
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
      allShowings = [...allShowings, { hallname, date, times: ["12:00"] }];
    }}
    class="flex mx-auto w-[3%] my-3 hover:bg-blue-400 rounded-full"
  >
    <PlusButton />
  </button>
</div>
