<script lang="ts">
  import Swal from "sweetalert2";
  import HallCreator from "../../../../_ui/templates/hallCreator.svelte";
  import TypeSelector from "../../../../_ui/templates/typeSelector.svelte";

  let seatCategories = ["regular", "loge", "vip"];
  let seatTypes = ["regular", "double", "eraser"];
  let clearAllSeatsSignal = 0;

  let seatTypeToPlace = seatTypes.at(0);
  let curSeatCategory = seatCategories.at(0);
  let X = 23;
  let Y = 15;
  $: seatTypeToPlace = seatTypeToPlace;
  $: curSeatCategory = curSeatCategory;
  $: X = X;
  $: Y = Y;

  function createHall() {
    Swal.fire({
      title: "Creating Hall...",
    });
  }
</script>

<div
  class="grid grid-rows-3 grid-cols-2 gap-y-24 sm:gap-y-0 sm:grid-rows-1 sm:grid-cols-10 gap-x-5 w-[85%] h-[64vh] sm:h-[80vh] sm:mt sm:mb-24"
>
  <div class="flex flex-col justify-between col-span-3">
    <div class="">
      <p class="text-center text-textWhite font-bold sm:text-5xl">
        Hall Creator
      </p>
    </div>
    <div
      class="bg-backgroundBlue ring-1 ring-white rounded-lg my-4 py-2 w-[60%] mx-auto"
    >
      <p class="text-center text-textWhite font-sembold sm:text-2xl">
        Width: {X} Length: {Y}
      </p>
    </div>

    <div class="w-[60%] mx-auto mb-4">
      <TypeSelector
        title={"Seat Type"}
        items={seatTypes}
        on:itemSelected={(e) => {
          seatTypeToPlace = e.detail === "eraser" ? "empty" : e.detail;
        }}
      />
    </div>
    <div class="w-[60%] mx-auto mb-4 ring-1 ring-white rounded-lg">
      <TypeSelector
        title={"Seat Category"}
        items={seatCategories}
        on:itemSelected={(e) => {
          curSeatCategory = e.detail;
        }}
      />
    </div>

    <div
      class="bg-backgroundBlue ring-1 ring-white rounded-lg w-[60%] flex flex-col mx-auto"
    >
      <div class="flex flex-row my-5 w-full place-content-evenly">
        <button
          on:click={createHall}
          class="rounded-md bg-tileBlue ring-1 ring-white text-textWhite py-1 px-4 hover:bg-blue-500"
          >Create</button
        >
        <button
          on:click={() => {
            clearAllSeatsSignal = 1;
          }}
          class="rounded-md bg-tileBlue ring-1 ring-white text-textWhite py-1 px-4 hover:bg-blue-500"
          >Clear all</button
        >
      </div>
    </div>
  </div>

  <div class="col-span-2 row-span-2 sm:row-span-1 sm:col-span-7 sm:mt-20">
    <HallCreator
      bind:seatTypeToPlace
      bind:curSeatCategory
      bind:clearAllSeatsSignal
      on:xDimChanged={(e) => {
        X = e.detail;
      }}
      on:yDimChanged={(e) => {
        Y = e.detail;
      }}
    />
  </div>
</div>
