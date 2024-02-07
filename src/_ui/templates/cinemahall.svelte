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
  export let hallHeight = 10;
  export let hallWidth = 10;

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

  function getRightSeatToUnblock(seat: any): any {
    if (selectedSeats.at(selectedSeats.length / 2).ColumnNr > seat.ColumnNr) {
      return selectedSeats.at(0);
    } else {
      return selectedSeats.at(selectedSeats.length - 1);
    }
  }

  function unblockSeat(seat: any) {
    fetch(
      `${apiUrl}/events/${eventId}/seats/${getRightSeatToUnblock(seat).ID}/unblock`,
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
    let thereWasAConflict = false;
    fetch(`${apiUrl}/events/${eventId}/seats/${seat.ID}/block`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
    })
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

  function isNeighbor(seat: any) {
    let seatIndex = seats.findIndex((s) => {
      return s.ID === seat.ID;
    });

    let leftIsNeighbor =
      seatIndex !== 0 &&
      !seats.at(seatIndex - 1).Available &&
      !seats.at(seatIndex - 1).BlockedByOther;
    let rightIsNeighbour =
      seatIndex !== seats.length - 1 &&
      !seats.at(seatIndex + 1).Available &&
      !seats.at(seatIndex + 1).BlockedByOther;

    return leftIsNeighbor || rightIsNeighbour;
  }

  function seatWasSelected(seat: any) {
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
      unblockSeat(seat);
      return;
    }
    //case: not-selected seat was clicked
    if (!isNeighbor(seat)) {
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

<div class="h-full flex flex-col justify-between">
  <div class="w-full h-[4%] pt-4 px-2 bg-white rounded-lg"></div>
  <div
    style="grid-template-columns: repeat({hallWidth}, minmax(0, 1fr)); grid-template-rows: repeat({hallHeight}, minmax(0, 1fr));"
    class="h-[90%] grid p-3 rounded-md bg-tileBlue"
  >
    {#each seats as seat}
      <button
        style={`grid-column-start: ${seat.ColumnNr + 1}; grid-row-start: ${seat.RowNr + 1};`}
        disabled={seat.BlockedByOther}
        class="h-full disabled:cursor-not-allowed {seat.Type === 'double'
          ? 'col-span-2'
          : ''}
          "
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
    {/each}
  </div>
</div>
