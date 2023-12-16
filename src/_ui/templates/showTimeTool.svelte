<script lang="ts">
  import PlusButton from "./plusButton.svelte";
  import TimeRow from "./timeRow.svelte";

  export let daysOfShowings: any[] = [];
</script>

<div
  class="w-full h-full flex flex-col items-center"
>
  <div class="w-full h-full flex place-self-start flex-col gap-y-1 overflow-y-scroll">
    {#each daysOfShowings as times}
      <div class="flex-none h-[18%] w-full">
        <TimeRow bind:times />
      </div>
    {/each}
  </div>
  <button
    on:click={() => {
      daysOfShowings = [...daysOfShowings, []];
    }}
    class="flex place-self-end mx-auto w-[3%] my-1"
  >
    <PlusButton />
  </button>
</div>
