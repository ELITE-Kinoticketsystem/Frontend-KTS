<script lang="ts">
  export let selectedSeats: any[] = [];
  let distinctSeatsWithCount = new Map<string, number>();

  $: {
    distinctSeatsWithCount = distinctSeatsWithCount;

    selectedSeats
      .sort((e, e2) => {
        return e.Type < e2.Type ? 1 : 0;
      })
      .forEach((seat) => {
        if (distinctSeatsWithCount.has(seat.Type)) {
          const currentValue: number =
            distinctSeatsWithCount.get(seat.Type) || 0;
          distinctSeatsWithCount.set(seat.Type, currentValue + 1);
        } else {
          distinctSeatsWithCount.set(seat.Type, 1);
        }
      });
  }
</script>

<div class="flex flex-col w-full h-full mx-auto sm:mt-1 lg:mt-2 mb-4">
  <p
    class="text-center font-semibold text-textWhite text-xs sm:text-sm md:text-sm lg:text-lg xl:text-4xl xl:mb-8"
  >
    Your selection
  </p>

  {#each distinctSeatsWithCount as seatWithCount}
    <div class="flex mx-auto">
      <p
        class="text-xs sm:text-sm md:text-sm lg:text-lg xl:text-4xl xl:mb-2 text-white"
      >
        {seatWithCount[1]}x {seatWithCount[0]}
      </p>
    </div>
  {/each}
</div>
