<script lang="ts">
  import DrawSeat from "./drawSeat.svelte";
  import Swal from "sweetalert2";

  import { createEventDispatcher } from "svelte";
  import { apiUrl } from "$lib/_services/authService";

  const dispatch = createEventDispatcher();

  export let seats: any[] = [];
  export let seatColors: {
    regular: string;
    vip: string;
    loge: string;
    selected: string;
    blocked: string;
  };
  export let selectedSeats = seats.filter((seat) => seat.Available); //used as an ordered list

  $: seats = seats;
  $: selectedSeats = selectedSeats;

  function blockSeat(seat: any) {
    console.log(
      `${apiUrl}/events/11EE9FED864A27B3B3880242AC120002/seats/${
        seats.at(seat.RowNr).at(seat.ColumnNr).ID
      }`
    );
    fetch(
      `${apiUrl}/events/11ee9fed-864a-27b3-b388-0242ac120002/seats/${
        seats.at(seat.RowNr).at(seat.ColumnNr).ID
      }/block`,
      {
        method: "PATCH",
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log(response);
        } else {
        }
        return response.json();
      })
      .then((details) => {
        console.log(details);
      });
  }

  function isNeighborSeat(x: number, y: number) {
    //all selected seats share y coordinate
    if (selectedSeats.at(0).RowNr != y) {
      return false;
    }
    let leftOffset = 1;
    let rightOffset = 1;
    //go to the left until you encounter a nonempty seat
    while (x - leftOffset >= 0) {
      if (
        seats.at(y).at(x - leftOffset).Type === "empty" ||
        seats.at(y).at(x - leftOffset).Type === "emptyDouble"
      ) {
        ++leftOffset;
        continue;
      }
      break;
    }
    if (
      selectedSeats.at(selectedSeats.length - 1).ColumnNr ===
      x - leftOffset
    ) {
      return true;
    }
    //go to the right until you encounter a nonempty seat
    while (x + rightOffset < seats.at(0).length) {
      if (
        seats.at(y).at(x + rightOffset).Type === "empty" ||
        seats.at(y).at(x + rightOffset).Type === "emptyDouble"
      ) {
        ++rightOffset;
        continue;
      }
      break;
    }
    if (x + rightOffset === selectedSeats.at(0).ColumnNr) {
      return true;
    }
    return false;
  }

  function seatWasSelected(seat: {
    Type: string;
    ColumnNr: number;
    RowNr: number;
    Available: boolean;
    BookedByOther: boolean;
    Category: string;
  }) {
    if (seat.BookedByOther) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        color: "#FAFAFA",
        timer: 25000,
        customClass: "rounded-lg w-[70%] sm:w-[15%] sm:h-[15%]",
        timerProgressBar: true,
        background: "#354A5F",
        text: "This seat is already booked!\nPlease select another seat!",
      });
      return;
    }

    //case: no selected seats yet
    if (selectedSeats.length === 0) {
      blockSeat(seat);
      selectedSeats = [
        {
          Type: seat.Type,
          ColumnNr:
            seat.Type === "emptyDouble" ? seat.ColumnNr - 1 : seat.ColumnNr,
          RowNr: seat.RowNr,
          Category: seat.Category,
          BookedByOther: false,
          Available: false,
        },
      ];
      return;
    }
    //case: already selected seat was clicked
    if (!seat.Available) {
      const index =
        selectedSeats.at(Math.floor(selectedSeats.length / 2)).ColumnNr >
        seat.ColumnNr
          ? 0
          : selectedSeats.length - 1;
      seats
        .at(selectedSeats.at(index).RowNr)
        .at(selectedSeats.at(index).ColumnNr).Available = true;
      if (index === 0) {
        selectedSeats = selectedSeats.slice(1, selectedSeats.length);
      } else {
        selectedSeats = selectedSeats.slice(0, selectedSeats.length - 1);
      }
      return;
    }
    //case: not-selected seat was clicked
    if (!isNeighborSeat(seat.ColumnNr, seat.RowNr)) {
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

    let ColumnNr =
      seat.Type === "emptyDouble" ? seat.ColumnNr - 1 : seat.ColumnNr;
    if (selectedSeats.at(selectedSeats.length - 1).ColumnNr < seat.ColumnNr) {
      selectedSeats = [
        ...selectedSeats,
        {
          Type: seat.Type,
          ColumnNr,
          RowNr: seat.RowNr,
          Category: seat.Category,
          Available: false,
          BookedByOther: false,
        },
      ];
    } else {
      selectedSeats = [
        {
          Type: seat.Type,
          ColumnNr,
          RowNr: seat.RowNr,
          Category: seat.Category,
          Available: false,
          BookedByOther: false,
        },
        ...selectedSeats,
      ];
    }
    seats.at(seat.RowNr).at(seat.ColumnNr).Available = false;
  }

  function getColorKey(seat: any) {
    let found = false;
    for (let i = 0; i < selectedSeats.length; ++i) {
      if (
        selectedSeats[i].ColumnNr === seat.ColumnNr &&
        selectedSeats[i].RowNr === seat.RowNr
      ) {
        found = true;
        break;
      }
    }
    if (found) {
      return seatColors.selected; //user selected color
    }
    if (seat.BookedByOther) {
      return seatColors.blocked;
    }

    switch (seat.Category) {
      case "regular":
        return seatColors.regular;
      case "vip":
        return seatColors.vip;
      case "loge":
        return seatColors.loge;
      default:
        return "#000000";
    }
  }
</script>

<div class="grid grid-cols-1 grid-rows-6 gap-y-12 h-full justify-between">
  <svg class="row-span-1 w-full pt-4 px-2 bg-tileBlue rounded-lg">
    <rect width="100%" height="20%" rx="10" x="0" y="0" fill="#ffffff" />
  </svg>

  <div
    class="row-span-5 w-full p-3 rounded-md bg-tileBlue grid"
    style="grid-template-columns: repeat({seats.at(0)
      .length}, minmax(0, 1fr)); grid-template-rows: repeat({seats.length}, minmax(0, 1fr));"
  >
    {#each seats as seatrow}
      {#each seatrow as seat}
        {#if seat.Type === "regular" || seat.Type === "double"}
          <button
            class="w-full h-full ring-white {seat.Type === 'double'
              ? 'col-span-2'
              : ''} "
            on:click={() => {
              seatWasSelected(seat);
              dispatch("seatWasSelected", { selectedSeats });
            }}
          >
            {#key selectedSeats}
              <DrawSeat
                Type={seat.Type}
                color={getColorKey(seat)}
                BookedByOther={seat.BookedByOther}
              />
            {/key}
          </button>
        {:else if seat.Type === "empty"}
          <div class="w-full h-full"></div>
        {/if}
      {/each}
    {/each}
  </div>
</div>
