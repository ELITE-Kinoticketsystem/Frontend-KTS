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

<div class="flex flex-col w-full h-full mx-auto sm:mt-1 lg:mt-4 mb-4">
  <p
    class="text-center font-semibold text-textWhite text-[3cqw] mb-8"
  >
    Selection
  </p>

  {#each distinctSeatsWithCount as seatWithCount}
    <div class="flex flex-row items-center mx-auto ring-1 ring-white rounded-lg p-">
      <p
        class="text-[3cqw] text-white ring-1 "
      >
        {seatWithCount[1]}x {seatWithCount[0][0].toUpperCase() +
          seatWithCount[0].slice(1)}
      </p>
    </div>
  {/each}
</div>
