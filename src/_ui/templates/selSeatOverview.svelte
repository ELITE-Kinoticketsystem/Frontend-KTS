<script lang="ts">
  export let selectedSeats: { type: string; id: number }[] = [];

  let distinctSeatsWithCount = new Map<string, number>();
  selectedSeats.forEach((seat) => {
    if (distinctSeatsWithCount.has(seat.type)) {
      const currentValue: number = distinctSeatsWithCount.get(seat.type) || 0;
      distinctSeatsWithCount.set(seat.type, currentValue + 1);
    } else {
      distinctSeatsWithCount.set(seat.type, 1);
    }
  });
</script>

<div class="w-full h-full ring-1 ring-inset ring-white">
  <div class="flex flex-col w-full mx-auto my-4">
    <p class="text-center sm:text-left text-textWhite sm:text-lg">Your selection</p>

      <div class="flex text-xs sm:text-sm {selectedSeats.length === 0 ? "invisible" : "hidden"}">
        <p class="">This will never be seen, hopefully..</p>
      
      </div>

    {#each distinctSeatsWithCount as seatWithCount}
      <div class="flex mx-auto">
        <p class="text-xs sm:text-sm text-white">
          {seatWithCount[1]}x {seatWithCount[0]}
        </p>
      </div>
    {/each}
  </div>

</div>
