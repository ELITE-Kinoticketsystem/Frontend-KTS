<script lang="ts">
  export let selectedSeats: { type: string; id: number }[] = [];
  let distinctSeatsWithCount = new Map<string, number>();

  $: selectedSeats = selectedSeats;
  $: {
    distinctSeatsWithCount = distinctSeatsWithCount;

    selectedSeats
      .sort((e, e2) => {
        return e.type < e2.type ? 1 : 0;
      })
      .forEach((seat) => {
        if (distinctSeatsWithCount.has(seat.type)) {
          const currentValue: number =
            distinctSeatsWithCount.get(seat.type) || 0;
          distinctSeatsWithCount.set(seat.type, currentValue + 1);
        } else {
          distinctSeatsWithCount.set(seat.type, 1);
        }
      });
  }
</script>

<div class="flex flex-col w-full h-full mx-auto sm:mt-1 lg:mt-2 mb-4">
  <p
    class="text-center font-semibold text-textWhite text-xs sm:text-sm md:text-sm lg:text-lg xl:text-5xl xl:mb-12"
  >
    Your selection
  </p>

  {#each distinctSeatsWithCount as seatWithCount}
    <div class="flex mx-auto">
      <p
        class="text-xs sm:text-sm md:text-sm lg:text-lg xl:text-4xl xl:mb-6 text-white"
      >
        {seatWithCount[1]}x {seatWithCount[0]}
      </p>
    </div>
  {/each}
</div>
