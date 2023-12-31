<script lang="ts">
  import DrawSeat from "./drawSeat.svelte";
  import Swal from "sweetalert2";
  import { createEventDispatcher, onMount } from "svelte";
  import { apiUrl } from "$lib/_services/authService";
  import { page } from "$app/stores";
  import { fire } from "$lib/swalTemplate";

  const dispatch = createEventDispatcher();

  let eventId: any;
  onMount(() => {
    eventId = $page.params.eventId;
    selectedSeats = selectedSeats;
  });

  export let blockedUntil: number;
  export let seats: any[] = [];
  export let seatColors: any;
  export let clearSeats: number = 0;
  export let selectedSeats: any[] = []; //used as an ordered list

  let seatsLength = 0;
  let seatRowLength = 0;

  $: console.log(selectedSeats);
  $: console.log(seats);
  $: {
    seatsLength = seats.length;
    seatRowLength = seats.length > 0 ? seats.at(0).length : 0;
  }

  $: if (clearSeats === 1) {
    fetch(`${apiUrl}/events/${eventId}/seats/unblock-all`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (response.status !== 200) {
          fire("Not all seats could be freed correctly!", 3000);
        }
        return response.json();
      })
      .then(() => {
        dispatch("seatSelectionChanged");
      });

    clearSeats = 0;
  }

  function getSeatToUnblock(seat: any) {
    if (
      seat.ColumnNr <
      selectedSeats.at(Math.floor(selectedSeats.length / 2)).ColumnNr
    ) {
      return selectedSeats.at(0);
    } else {
      return selectedSeats.at(selectedSeats.length - 1);
    }
  }

  function unblockSeat(seat: any) {
    fetch(
      `${apiUrl}/events/${eventId}/seats/${
        seats.at(seat.RowNr).at(seat.ColumnNr).ID
      }/unblock`,
      {
        method: "PATCH",
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) {
          fire("A database error occured!");
          console.log(response);
        }
        return response.json();
      })
      .then((blockedUnt) => {
        blockedUntil =
          blockedUnt.blockedUntil === null
            ? 0
            : new Date(Date.parse(blockedUnt.blockedUntil)).getTime();
        dispatch("seatSelectionChanged");
      });
  }

  function blockSeat(seat: any) {
    console.log("I want to block: " + JSON.stringify(seat));
    let thereWasAConflict = false;
    fetch(
      `${apiUrl}/events/${eventId}/seats/${
        seats.at(seat.RowNr).at(seat.ColumnNr).ID
      }/block`,
      {
        method: "PATCH",
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 409) {
            dispatch("seatSelectionChanged");
            thereWasAConflict = true;
            fire("There was a conflict!", 3000, false, false);
            return;
          }
          fire("A database error occured!");
          console.log(response);
        }
        return response.json();
      })
      .then((blockedUnt) => {
        if (thereWasAConflict) {
          return;
        }
        blockedUntil =
          blockedUnt.blockedUntil === null
            ? 0
            : new Date(Date.parse(blockedUnt.blockedUntil)).getTime();
        dispatch("seatSelectionChanged");
      });
  }

  function isNeighborSeat(seat: any) {
    console.log(seat);
    console.log(selectedSeats);
    console.log(seats);
    let x = seat.ColumnNr;
    let y = seat.RowNr;
    //all selected seats share y coordinate
    if (selectedSeats.at(0).RowNr != seat.RowNr) {
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

  function seatWasSelected(seat: any) {
    console.log("HERESETS" + JSON.stringify(seat));
    if (seat.BlockedByOther) {
      fire("This seat is already booked!\nPlease select another seat!", 3000);
      return;
    }

    //case: no selected seats yet
    if (selectedSeats.length === 0) {
      blockSeat(seat);
      return;
    }
    //case: already selected seat was clicked
    if (!seat.Available) {
      unblockSeat(getSeatToUnblock(seat));
      return;
    }
    //case: not-selected seat was clicked
    if (!isNeighborSeat(seat)) {
      fire("Please select seats next to each other!", 3000);
      return;
    }
    blockSeat(seat);
  }

  function getColorKey(seat: any) {
    for (let i = 0; i < selectedSeats.length; ++i) {
      if (
        selectedSeats[i].ColumnNr === seat.ColumnNr &&
        selectedSeats[i].RowNr === seat.RowNr
      ) {
        return seatColors.selected;
      }
    }

    if (seat.BlockedByOther) {
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

<div
  class="grid grid-cols-1 grid-rows-6 gap-y-1 sm:gap-y-12 h-full justify-between"
>
  <svg class="row-span-1 w-full pt-4 px-2 bg-tileBlue rounded-lg">
    <rect width="100%" height="20%" rx="10" x="0" y="0" fill="#ffffff" />
  </svg>

  <div
    class="row-span-5 w-full p-3 rounded-md bg-tileBlue grid"
    style="grid-template-columns: repeat({seatRowLength}, minmax(0, 1fr)); grid-template-rows: repeat({seatsLength}, minmax(0, 1fr));"
  >
    {#each seats as seatrow}
      {#each seatrow as seat}
        {#if seat.Type === "regular" || seat.Type === "double"}
          <button
            disabled={seat.BlockedByOther}
            class="disabled:cursor-not-allowed col-start- w-full h-full ring-white {seat.Type ===
            'double'
              ? 'col-span-2'
              : ''} "
            on:click={() => {
              seatWasSelected(seat);
            }}
          >
            {#key selectedSeats}
              <DrawSeat
                Type={seat.Type}
                color={getColorKey(seat)}
                BlockedByOther={seat.BlockedByOther}
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
