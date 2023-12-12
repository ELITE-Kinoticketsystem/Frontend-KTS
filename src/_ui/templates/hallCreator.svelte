<script lang="ts">
  import DrawSeat from "./drawSeat.svelte";

  let seats: any[] = [];
  let seatrowforFill = [];
  const xStartDim = 11;
  const yStartDim = 11;

  function getSeat(category: string, type: string, x: number, y: number) {
    return { category, type, x, y };
  }

  for (let y = 0; y < yStartDim; ++y) {
    for (let x = 0; x < xStartDim; ++x) {
      seatrowforFill.push(getSeat("regular", "empty", x, y));
    }
    seats.push(seatrowforFill);
    seatrowforFill = [];
  }

  let X = seats.at(0).length;
  let Y = seats.length;

  $: {
    seats = seats;
    X = seats.at(0).length;
  }
  $: {
    seats = seats;
    Y = seats.length;
  }

  seats.at(5).at(5).type = "regular";

  function seatWasClicked(x: number, y: number){
    let c = seats.at(y).at(x).category;
    console.log("At " + x + "," + y + ": "+ c);
    seats=seats;
  }
  function emptyCellWasClicked(x:number, y:number){
    console.log("Empty cell at" + x + "," + y );
    seats.at(y).at(x).type = "regular";
    seats=seats;
  }

  console.log("X: " + X + "Y: " + Y);
</script>

<div
  class="grid ring-2 ring-white max-w-full max-h-full mx-auto"
  style="aspect-ratio: {X}/{Y}; grid-template-columns: repeat({X}, minmax(0, 1fr)); grid-template-rows: repeat({Y}, minmax(0, 1fr));"
>
  {#each seats as seatrow, y}
    {#each seatrow as seat, x}
      <div class="ring-1 ring-white">
        {#if seat.type !== "empty"}
          <button on:click={()=>{seatWasClicked(x,y);}} class="hover:bg-blue-500">
            <DrawSeat type={seat.category} />
          </button>
        {:else}
          <button on:click={()=>{emptyCellWasClicked(x,y);}} class=" hover:bg-blue-500 w-full h-full">
            <svg
              preserveAspectRatio="xMidYMid meet"
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              class="h-full w-full"
            >
              <rect width="100" height="100" fill="none" />
            </svg>
        </button>
        {/if}
      </div>
    {/each}
  {/each}
</div>
