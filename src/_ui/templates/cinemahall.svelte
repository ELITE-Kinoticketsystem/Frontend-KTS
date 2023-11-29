<script lang="ts">
  import type { SweetAlertUpdatableParameters } from "sweetalert2";
  import DrawSeat from "./drawSeat.svelte";
  import Swal from "sweetalert2";

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  export const nrOfRows = 6;
  export const nrOfCols = 10;
  const selectedSeatColor = "#ccffee";

  let seat = { type: "regular", available: true };
  let doubleSeat = { type: "double", available: true };
  let emptySeat = { type: "empty", available: false };
  let emptyDoubleSeat = { type: "emptyDouble", available: false };

  let seatrow: any[] = [];
  let seats: any[] = [];
  for (let y = 0; y < nrOfRows; ++y) {
    for (let x = 0; x < nrOfCols; ++x) {
      let choice = getRandomInt(100);
      if (choice < 20) {
        if (x < nrOfCols - 1) {
          seatrow.push(doubleSeat);
          seatrow.push(emptyDoubleSeat);
          ++x;
        } else {
          seatrow.push(seat);
        }
      } else if (choice >= 20 && choice <= 80) {
        seatrow.push(seat);
      } else {
        seatrow.push(emptySeat);
      }
    }
    seats.push(seatrow);
    seatrow = [];
  }

  seats = [
    [
      { available: false, type: "empty" },
      { available: true, type: "regular" },
      { available: true, type: "double" },
      { available: true, type: "emptyDouble" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "double" },
      { available: true, type: "emptyDouble" },
      { available: true, type: "regular" },
      { available: false, type: "empty" },
    ],

    [
      { available: false, type: "empty" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: false, type: "empty" },
    ],

    [
      { available: false, type: "empty" },
      { available: true, type: "double" },
      { available: false, type: "emptyDouble" },
      { available: false, type: "empty" },
      { available: true, type: "double" },
      { available: false, type: "emptyDouble" },
      { available: false, type: "empty" },
      { available: true, type: "double" },
      { available: false, type: "emptyDouble" },
      { available: false, type: "empty" },
    ],

    [
      { available: false, type: "empty" },
      { available: false, type: "empty" },
      { available: false, type: "empty" },
      { available: false, type: "empty" },
      { available: false, type: "empty" },
      { available: false, type: "empty" },
      { available: false, type: "empty" },
      { available: false, type: "empty" },
      { available: false, type: "empty" },
      { available: false, type: "empty" },
    ],

    [
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
    ],

    [
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
      { available: true, type: "regular" },
    ],
  ];
  let selectedSeats: any[] = []; //used as an ordered list
  $: nrOfSelectedSeats = selectedSeats.length;

  function isNeighborSeat(x: number, y: number) {
    //all selected seats share y coordinate
    if (selectedSeats.at(0).y != y) {
      return false;
    }

    let leftOffset = 1;
    let rightOffset = 1;
    //go to the left until you encounter a nonempty seat
    while (x - leftOffset >= 0) {
      if (
        seats.at(y).at(x - leftOffset).type === "empty" ||
        seats.at(y).at(x - leftOffset).type === "emptyDouble"
      ) {
        ++leftOffset;
        continue;
      }
      break;
    }
    if (selectedSeats.at(selectedSeats.length - 1).x === x - leftOffset) {
      return true;
    }
    //go to the right until you encounter a nonempty seat
    while (x + rightOffset < nrOfCols) {
      if (
        seats.at(y).at(x + rightOffset).type === "empty" ||
        seats.at(y).at(x + rightOffset).type === "emptyDouble"
      ) {
        ++rightOffset;
        continue;
      }
      break;
    }
    if (x + rightOffset === selectedSeats.at(0).x) {
      return true;
    }

    return false;
  }

  function clearAllSelectedSeats() {
    selectedSeats = [];
    nrOfSelectedSeats = 0;
  }

  function seatWasSelected(seat: any, x: number, y: number) {
    //case: no selected seats yet
    if (selectedSeats.length === 0) {
      if (seat.type === "emptyDouble") {
        selectedSeats.push({ x: x - 1, y });
      } else {
        selectedSeats.push({ x, y });
      }

      console.log(selectedSeats);
      seats.at(y).at(x).available = false;
      ++nrOfSelectedSeats;
      return;
    }
    //case: already selected seat was clicked
    if (!seat.available) {
      if (selectedSeats.at(Math.floor(selectedSeats.length / 2)).x > x) {
        seats.at(selectedSeats.at(0).y).at(selectedSeats.at(0).x).available =
          true;
        selectedSeats = selectedSeats.slice(1, selectedSeats.length);
      } else {
        seats
          .at(selectedSeats.at(selectedSeats.length - 1).y)
          .at(selectedSeats.at(selectedSeats.length - 1).x).available = true;
        selectedSeats.pop();
      }
      nrOfSelectedSeats = selectedSeats.length;
      return;
    }
    //case: not-selected seat was clicked
    if (isNeighborSeat(x, y)) {
      if (selectedSeats.at(selectedSeats.length - 1).x < x) {
        if (seat.type === "emptyDouble") {
          selectedSeats.push({ x: x - 1, y });
        } else {
          selectedSeats.push({ x, y });
        }
      } else {
        if (seat.type === "emptyDouble") {
          selectedSeats.unshift({ x: x - 1, y });
        } else {
          selectedSeats.unshift({ x, y });
        }
      }
      seats.at(y).at(x).available = false;
      ++nrOfSelectedSeats; //necessary(?) to trigger update of svg..
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        color: "#FAFAFA",
        timer: 5000,
        customClass: "rounded-lg w-[70%] sm:w-1/2 md:1/3",
        timerProgressBar: true,
        background: "#354A5F",
        text: "Please select seats next to each other!",
      });
    }
    console.log(selectedSeats);
  }
</script>

<div class="min-w-fit overflow-hidden ring-1 ring-inset-0 ring-white">
  <div class="">
    <div class="grid grid-rows-6 grid-cols-10">
      {#each seats as seatrow, y}
        {#each seatrow as seat, x}
          {#if seat.type === "regular" || seat.type === "double"}
            <div
              class="grid {seat.type === 'double'
                ? 'col-span-2'
                : ''} bg-white hover:bg-slate-300 ring-black ring-1 ring-inset"
            >
              <button
                on:click={() => {
                  seatWasSelected(seat, x, y);
                }}
              >
                <div class="relative">
                  {#key nrOfSelectedSeats}
                    <DrawSeat
                      type={seat.type}
                      color={seat.available ? "#cccccc" : selectedSeatColor}
                    />
                  {/key}
                  <!-- <p class="absolute inset-0 text-3xl text-center">{x} {y}</p> -->
                </div>
              </button>
            </div>
          {:else if seat.type === "empty"}
            <div class="grid">
              <!-- <p class="text-textWhite text-xl text-center">{x} {y}</p> -->
            </div>
          {/if}
        {/each}
      {/each}
    </div>
  </div>
</div>
