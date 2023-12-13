<script lang="ts">
  import HallCreator from "../../../../_ui/templates/hallCreator.svelte";
  import TypeSelector from "../../../../_ui/templates/typeSelector.svelte";

  let priceCategories = ["regular", "premium", "student"];
  let seatTypes = ["regular", "double", "eraser"];

  let seatTypeToPlace = seatTypes.at(0);
  let curPriceCategory = priceCategories.at(0);
  $: seatTypeToPlace = seatTypeToPlace;
  $: curPriceCategory = curPriceCategory;
</script>

<div
  class="grid grid-rows-3 grid-cols-2 gap-y-24 sm:gap-y-0 sm:grid-rows-1 sm:grid-cols-5 sm:gap-x-48 w-[60%] h-[64vh] sm:h-[73vh] mx-auto sm:mt-12 sm:mb-12"
>
  <div class="">
    <TypeSelector
      title={"Seat Type"}
      items={seatTypes}
      on:itemSelected={(event) => {
        seatTypeToPlace = event.detail === "eraser" ? "empty" : event.detail;
      }}
    />
  </div>
  <div class="">
    <TypeSelector
      title={"Price Category"}
      items={priceCategories}
      on:itemSelected={(event) => {
        curPriceCategory = event.detail;
      }}
    />
  </div>

  <div class="col-span-2 row-span-2 sm:row-span-1 sm:col-span-3">
    <HallCreator bind:seatTypeToPlace bind:curPriceCategory />
  </div>
</div>
