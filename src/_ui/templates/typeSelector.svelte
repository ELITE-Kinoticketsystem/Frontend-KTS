<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let title = "Items";
  export let items: string[] = ["Item 1"];

  let selectedItem = items.length > 0 ? items.at(0) : "";

  $: selectedItem = selectedItem;
  const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col items-center gap-y-4 sm:gap-y-12 h-full w-full">
  <div class="mx-auto">
    <p
      class="text-center my-auto font-semibold xl:font-bold text-textWhite text-sm sm:text-xl xl:text-2xl"
    >
      {title}
    </p>
  </div>
  {#each items as item}
    <div class="mx-auto">
      <button
        on:click={() => {
          selectedItem = item;
          dispatch("itemSelected", selectedItem);
        }}
        class="{item === selectedItem
          ? 'bg-blue-500'
          : 'bg-backgroundBlue'} rounded-lg ring-white ring-1 hover:bg-blue-500"
      >
        <p class="m-1 sm:m-2 text-textWhite text-center text-xs sm:text-sm md:text-lg xl:text-xl">
          {item}
        </p>
      </button>
    </div>
  {/each}
</div>
