<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let searchBarIsOpen: Boolean;
  export let shortSearchBarText: string = "shortsearchbartext";
  export let longSearchBarText: string = "longsearchbartext";

  const dispatch = createEventDispatcher();
</script>

<div>
  <div class="relative">
    <div
      class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
    >
      <svg
        class="w-4 h-4 text-textWhite"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
    <input
      type="search"
      id="default-search"
      on:input={(event) => dispatch("inputChange", event.target.value)}
      on:focus={() => (searchBarIsOpen = true)}
      on:blur={() => (searchBarIsOpen = false)}
      class="block p-2 ps-10 {searchBarIsOpen
        ? `w-96`
        : 'w-40'} duration-300 text-sm text-textWhite border border-gray-300 rounded-lg bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      placeholder={searchBarIsOpen ? longSearchBarText : shortSearchBarText}
    />
  </div>
</div>
