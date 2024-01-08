<script lang="ts">
  import SelectedSeatCard from "./selectedSeatCard.svelte";

  export let selectedSeats: any[] = [];
  let distinctSeatsWithCount = new Map<String, number>();

  const splitAnchor = ";";
  const prices = { regular: 10, vip: 15, loge: 20 };

  $: {
    distinctSeatsWithCount = distinctSeatsWithCount;
    selectedSeats
      .sort((e, e2) => {
        return e.Type < e2.Type ? 1 : 0;
      })
      .forEach((seat) => {
        let key = seat.Type + splitAnchor + seat.Category;
        if (distinctSeatsWithCount.has(key)) {
          const currentCount = distinctSeatsWithCount.get(key) || 0;
          distinctSeatsWithCount.set(key, currentCount + 1);
        } else {
          distinctSeatsWithCount.set(key, 1);
        }
      });
  }
</script>

<div class="flex flex-col items-center w-full h-full mx-auto mt-2">
  <p class="text-center font-semibold text-textWhite text-[3cqw] mb-8">
    Selection
  </p>

  {#each distinctSeatsWithCount as seat}
    <div class="w-[90%] h-[12%]">
      <SelectedSeatCard
        nrOfSeats={seat[1]}
        seatType={seat[0].split(splitAnchor)[0]}
        seatCategory={seat[0].split(splitAnchor)[1]}
        priceForAllSeats={seat[1] * prices.regular}
      />
    </div>
  {/each}
</div>
