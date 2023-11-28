<script lang="ts">
  import DrawSeat from "./drawSeat.svelte";

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  export const nrOfRows = 6;
  export const nrOfCols = 10;

  let seat = { type: "regular", available: true };
  let doubleSeat = { type: "double", available: true };

  let seatrow: any[] = [];
  let seats: any[] = [];
  for (let y = 0; y < nrOfRows; ++y) {
    for (let x = 0; x < nrOfCols; ++x) {
      if (getRandomInt(100) > 10) {
        seatrow.push(seat);
      } else {
        if (x < nrOfRows + 1) {
          seatrow.push(doubleSeat);
          seatrow.push({ type: "empty", available: false });
          ++x;
        } else {
          seatrow.push(seat);
        }
      }
    }
    seats.push(seatrow);
    seatrow = [];
  }
  let seatColor = "#FFE6E2";
</script>

<div class="min-w-fit overflow-hidden">
  <div class="">
    <div class="grid grid-rows-6 grid-cols-10">
      {#each seats as seatrow, y}
        {#each seatrow as seat, x}
          {#if seat.type === "regular"}
            <div
              class=" bg-white hover:bg-blue-500 ring-black ring-1 ring-inset"
            >
              <div class="">
                <DrawSeat type={seat.type} />
              </div>
            </div>
          {:else if seat.type === "double"}
            <div
              class="col-span-2 bg-white hover:bg-blue-500 ring-black ring-1 ring-inset"
            >
              <div class="">
                <DrawSeat type={seat.type} />
              </div>
            </div>
          {/if}
        {/each}
      {/each}
    </div>
  </div>
</div>
