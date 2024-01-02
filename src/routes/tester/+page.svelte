<script lang="ts">
  let names = [
    "Elias",
    "Elias",
    "Elias",
    "Elias",
    "Elias",
    "Elias",
    "Elias",
    "Elias",
    "Elias",
    "Elias",
    "Elias",
    "Elias",
    "Elias",
    "Elias",
    "Elias",
  ];
</script>

<!-- {#each names as name}
          <p class="text-black text-[100%]">
            {name}
          </p>
        {/each} -->

<!-- ring-1 ring-white w-[80%] mx-auto h-48  -->

<div class="flex ring-1 ring-white w-[80%] mx-auto h-48">
  <div class="relative w-80 overflow-hidden">
    <div
      class="absolute inset-0 overflow-y-scroll"
      style="width: calc(100% + 16px); scrollbar-width: none; -webkit-scrollbar-width: none;"
    >
      <!-- Your content here -->
      {#each names as name}
        <p class="text-black text-[100%] ring-inset ring-2 ring-white">
          {name}
        </p>
      {/each}
      <!-- Add enough content to cause scrolling -->
    </div>
  </div>
</div>
