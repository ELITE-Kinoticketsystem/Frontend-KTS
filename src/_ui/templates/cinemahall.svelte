<script lang="ts">
  import DrawSeat from "./drawSeat.svelte";
  import Swal from "sweetalert2";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function addColors(part1: number, col1: string, part2: number, col2: string) {
    if (part1 + part2 > 1) {
      console.log("Sum of parts were greater one");
      return "#000000";
    }

    let red = Math.floor(
      part1 * parseInt(col1.slice(0, 2), 16) +
        part2 * parseInt(col2.slice(0, 2), 16)
    );
    let green = Math.floor(
      part1 * parseInt(col1.slice(2, 4), 16) +
        part2 * parseInt(col2.slice(2, 4), 16)
    );
    let blue = Math.floor(
      part1 * parseInt(col1.slice(4, 6), 16) +
        part2 * parseInt(col2.slice(4, 6), 16)
    );

    return red.toString(16) + green.toString(16) + blue.toString(16);
  }

  export let seats: any[] = [];
  export let selectedSeats = seats.filter((seat) => seat.available); //used as an ordered list

  $: seats = seats;
  $: selectedSeats = selectedSeats;

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
    bookedByOther: boolean;
    category: string;
  }) {
    if (seat.bookedByOther) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        color: "#FAFAFA",
        timer: 5000,
        customClass: "rounded-lg w-[70%] sm:w-1/3",
        timerProgressBar: true,
        background: "#354A5F",
        text: "This seat is already booked!\nPlease select another seat!",
      });
      return;
    }

    //case: no selected seats yet
    if (selectedSeats.length === 0) {
      seats.at(seat.y).at(seat.x).available = false;
      selectedSeats = [
        {
          type: seat.type,
          x: seat.type === "emptyDouble" ? seat.x - 1 : seat.x,
          y: seat.y,
        },
      ];
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
        selectedSeats = selectedSeats.slice(0, selectedSeats.length - 1);
      }
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
      selectedSeats = [
        ...selectedSeats,
        { type: seat.type, x: xCor, y: seat.y },
      ];
    } else {
      selectedSeats = [
        { type: seat.type, x: xCor, y: seat.y },
        ...selectedSeats,
      ];
    }
    seats.at(seat.y).at(seat.x).available = false;
  }

  function getColorKey(seat: any) {
    let found = false;
    for (let i = 0; i < selectedSeats.length; ++i) {
      if (selectedSeats[i].x === seat.x && selectedSeats[i].y === seat.y) {
        found = true;
        break;
      }
    }
    if (found) {
      return "#00ff00";
    }

    switch (seat.category) {
      case "regular":
        return "#dd0000";
      case "premium":
        return "#cccc0c";
      case "student":
        return "#0000cc";
      default:
        return "#000000";
    }
  }
</script>

<div
  class="w-full h-full bg-backgroundBlue ring-1 ring-black ring-inset-1 grid"
  style="grid-template-columns: repeat({seats.at(0).length}, minmax(0, 1fr)); grid-template-rows: repeat({seats.length}, minmax(0, 1fr));"
>
  {#each seats as seatrow}
    {#each seatrow as seat}
      {#if seat.type === "regular" || seat.type === "double"}
        <button
          class="w-full h-full ring-white {seat.type === 'double'
            ? 'col-span-2'
            : ''} "
          on:click={() => {
            seatWasSelected(seat);
            dispatch("seatWasSelected", { selectedSeats });
          }}
        >
          {#key selectedSeats}
            <DrawSeat
              type={seat.type}
              color={getColorKey(seat)}
              bookedByOther={seat.bookedByOther}
            />
          {/key}
        </button>
      {:else if seat.type === "empty"}
        <div class="w-full h-full"></div>
      {/if}
    {/each}
  {/each}
</div>
