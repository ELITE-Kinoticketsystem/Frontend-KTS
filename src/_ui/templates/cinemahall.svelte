<script lang="ts">
  import type { SweetAlertUpdatableParameters } from "sweetalert2";
  import DrawSeat from "./drawSeat.svelte";
  import Swal from "sweetalert2";

  import { createEventDispatcher } from "svelte";

  export let nrOfSelectedSeats = 0;
  $: nrOfSelectedSeats = 0;

  const dispatch = createEventDispatcher();
  
  const selectedSeatColor = "#ff0055";
  const unselectedSeatColor = "#00ff80";

  export let seats: any[] = [];
  

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
    while (x + rightOffset < seats.at(0).length) {
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

  function seatWasSelected(seat: {
    type: string;
    x: number;
    y: number;
    available: boolean;
  }) {
    //case: no selected seats yet
    if (selectedSeats.length === 0) {
      selectedSeats.push({
        type: seat.type,
        x: seat.type === "emptyDouble" ? seat.x - 1 : seat.x,
        y: seat.y,
      });

      seats.at(seat.y).at(seat.x).available = false;
      ++nrOfSelectedSeats;

      return;
    }
    //case: already selected seat was clicked
    if (!seat.available) {
      const index =
        selectedSeats.at(Math.floor(selectedSeats.length / 2)).x > seat.x
          ? 0
          : selectedSeats.length - 1;
      seats
        .at(selectedSeats.at(index).y)
        .at(selectedSeats.at(index).x).available = true;
      if (index === 0) {
        selectedSeats = selectedSeats.slice(1, selectedSeats.length);
      } else {
        selectedSeats.pop();
      }
      nrOfSelectedSeats = selectedSeats.length;
      return;
    }
    //case: not-selected seat was clicked
    if (!isNeighborSeat(seat.x, seat.y)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        color: "#FAFAFA",
        timer: 5000,
        customClass: "rounded-lg w-[70%] sm:w-1/3",
        timerProgressBar: true,
        background: "#354A5F",
        text: "Please select seats next to each other!",
      });
      return;
    }

    let xCor = seat.type === "emptyDouble" ? seat.x - 1 : seat.x;
    if (selectedSeats.at(selectedSeats.length - 1).x < seat.x) {
      selectedSeats.push({ type: seat.type, x: xCor, y: seat.y });
    } else {
      selectedSeats.unshift({ type: seat.type, x: xCor, y: seat.y });
    }
    seats.at(seat.y).at(seat.x).available = false;
    ++nrOfSelectedSeats; //necessary(?) to trigger update of svg..
  }
</script>

<div class="min-w-fit overflow-hidden ring-1 ring-inset-0 ring-white">
  <div class="">
    <div class="grid grid-rows-6 grid-cols-10">
      {#each seats as seatrow}
        {#each seatrow as seat}
          {#if seat.type === "regular" || seat.type === "double"}
            <div class="grid {seat.type === 'double' ? 'col-span-2' : ''}">
              <button
                on:click={() => {
                  seatWasSelected(seat);
                  dispatch("seatWasSelected", { selectedSeats });
                }}
              >
                <div class="relative">
                  {#key nrOfSelectedSeats}
                    <DrawSeat
                      type={seat.type}
                      color={seat.available
                        ? unselectedSeatColor
                        : selectedSeatColor}
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
