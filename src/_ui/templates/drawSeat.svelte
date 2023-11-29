<script>
  export let color = "#cccccc";
  export let type = "regular";
</script>

{#if type === "regular"}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    class="w-full h-auto"
  >
    <rect
      x="10"
      y="50"
      width="80"
      height="30"
      rx="5"
      ry="5"
      fill={color}
      class=""
    />
    <path d="M20,50 A15,15 0 0,1 80,50" fill="#CCCCCC" />
  </svg>
{:else if type === "double"}
  <svg
    viewBox="-10 -10 115 45"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full h-auto"
  >
    <path
      d="M0 26C0 20.4772 4.47715 16 10 16H85C90.5228 16 95 20.4772 95 26V40H0V26Z"
      fill={color}
    />
    <path
      d="M6 10C6 4.47715 10.4772 0 16 0H79C84.5229 0 89 4.47715 89 10V40H6V10Z"
      fill={color}
    />
  </svg>
{/if}

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
