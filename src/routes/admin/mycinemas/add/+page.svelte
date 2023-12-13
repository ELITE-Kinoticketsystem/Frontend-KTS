<script lang="ts">
  import HallCreator from "../../../../_ui/templates/hallCreator.svelte";
  import TypeSelector from "../../../../_ui/templates/typeSelector.svelte";

  let seatCategories = ["regular", "loge", "vip"];
  let seatTypes = ["regular", "double", "eraser"];

  let seatTypeToPlace = seatTypes.at(0);
  let curSeatCategory = seatCategories.at(0);
  let X = 11;
  let Y = 11;
  $: seatTypeToPlace = seatTypeToPlace;
  $: curSeatCategory = curSeatCategory;
  $: X = X;
  $: Y = Y;
</script>

<div
  class="grid grid-rows-3 grid-cols-2 gap-y-24 sm:gap-y-0 sm:grid-rows-1 sm:grid-cols-5 gap-x-5 w-[70%] h-[64vh] sm:h-[73vh] mx-auto sm:mt-20 sm:mb-24"
>
  <div class="flex flex-col justify-between col-span-2">
    <div class="">
      <p class="text-center text-textWhite font-bold sm:text-5xl">
        Hall Creator
      </p>
    </div>
    <div class="bg-backgroundBlue ring-1 ring-white rounded-lg my-4 py-2 w-[60%] mx-auto">
      <p class="text-center text-textWhite font-sembold sm:text-2xl">Width: {X} Length: {Y}</p>
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
    <div class="w-[60%] mx-auto">
      <TypeSelector
        title={"Seat Category"}
        items={seatCategories}
        on:itemSelected={(e) => {
          curSeatCategory = e.detail;
        }}
      />
    </div>
  </div>

  <div class="col-span-2 row-span-2 sm:row-span-1 sm:col-span-3">
    <HallCreator
      bind:seatTypeToPlace
      bind:curSeatCategory
      on:xDimChanged={(e) => {
        X = e.detail;
      }}
      on:yDimChanged={(e) => {
        Y = e.detail;
      }}
    />
  </div>
</div>
