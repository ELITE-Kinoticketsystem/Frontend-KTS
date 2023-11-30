<script lang="ts">
  export let type = "item";
  let isOpen = false;
  let selectedItem = `Select a ${type}`;
  export let items = ["Item 1", "Item 2"];
  export let color = "bg-white";
  export let hoverColor = "hover:bg-slate-300";
  export let func: any;
  export let paramForFunc: any; //Workaround currently only one param is allowed, works for now.
</script>

<div class="flex-col min-w-fit">
  <button
    class="flex-start relative rounded-t-md w-56 h-2.4rem {color} {hoverColor} ring-1 ring-inset ring-slate-300"
    on:click={() => {
      isOpen = !isOpen;
    }}
  >
    <div class="flex flex-row mx-2">
      <div class="text-left text-lg flex">
        <p class="w-44 font-thin text-left">{selectedItem}</p>
      </div>
      <div class="flex my-auto ml-auto">
        {#if isOpen}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="flex w-7 h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="flex w-7 h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        {/if}
      </div>
    </div>
  </button>

  {#if isOpen}
    <div class="flex flex-col absolute origin-bottom">
      {#each items as item, i}
        <button
          class="flex {i === items.length - 1
            ? 'rounded-b-md'
            : ''} w-56 h-2.4rem {color} {hoverColor} py-1 ring-1 ring-inset ring-slate-300"
          on:click={() => {
            selectedItem = item;
            func(item);
            isOpen = !isOpen;
          }}
        >
          <div class="mx-1">
            <p class="font-thin text-left text-lg w-44">{item}</p>
          </div>
        </button>
      {/each}
    </div>
  {/if}
</div>
