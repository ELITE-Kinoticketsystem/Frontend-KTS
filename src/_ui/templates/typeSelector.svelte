<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let title = "Items";
  export let items: string[] = ["Item 1"];

  let selectedItem = items.length > 0 ? items.at(0) : "";

  $: selectedItem = selectedItem;
  const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col items-center h- w-full bg-backgroundBlue rounded-lg ring-1 ring-white">
  <div class="w-full mt-5 mb-5">
    <p
      class="text-center font-semibold xl:font-bold text-textWhite text-sm sm:text-xl xl:text-2xl"
    >
      {title}
    </p>
  </div>
  {#each items as item}
    <div class="mx-auto w-[60%]">
      <button
        on:click={() => {
          selectedItem = item;
          dispatch("itemSelected", selectedItem);
        }}
        class="{item === selectedItem
          ? 'bg-blue-500'
          : 'bg-backgroundBlue'} rounded-lg mb-5 ring-white ring-1 hover:bg-blue-400 w-full"
      >
        <p class="m-1 sm:m-2 text-textWhite text-center text-xs sm:text-sm md:text-lg xl:text-xl">
          {item}
        </p>
      </button>
    </div>
  {/each}
</div>
