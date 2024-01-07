<script lang="ts">
  export let nrOfSeats = 0;
  export let seatCategory = "regular";
  export let seatType = "regular";
  export let priceForAllSeats = 0;
  $: {
    nrOfSeats = nrOfSeats;
    seatCategory = seatCategory;
    seatType = seatType;
    priceForAllSeats = priceForAllSeats;
  }
</script>

<div
  class="w-full h-full flex flex-row items-center place-content-evenly rounded-md ring-1 ring-white bg-headerBlue"
>
  <p class="text-textWhite text-[2cqw]">
    {nrOfSeats}x {seatCategory.at(0).toUpperCase() + seatCategory.slice(1)}
    {seatType === "double" ? "Double Seat" : "Normal Seat"}
  </p>
  <div class="w-[10%] h-[80%]">
    {#if seatCategory === "regular"}
      <svg class="w-full h-full">
        <rect width="100%" height="100%" fill={"#550055"} />
      </svg>
    {:else if seatCategory === "vip"}
      <svg class="w-full h-full">
        <rect width="100" height="50" rx="20" fill={"#005555"} />
      </svg>
    {:else if seatCategory === "loge"}
      <svg class="w-full h-full">
        <rect width="100" height="50" rx="20" fill={"#555500"} />
      </svg>
    {/if}
  </div>
</div>
