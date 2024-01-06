<script lang="ts">
  import Swal from "sweetalert2";
  import Cinemahall from "../../../_ui/templates/cinemahall.svelte";
  import SelSeatOverview from "../../../_ui/templates/selSeatOverview.svelte";
  import Timer from "../../../_ui/templates/timer.svelte";
  import SeatLegend from "../../../_ui/templates/seatLegend.svelte";
  import { onMount } from "svelte";
  import { apiUrl } from "$lib/_services/authService";
  import { page } from "$app/stores";
  import { fire } from "$lib/swalTemplate";
  import { goto } from "$app/navigation";

  let seats: any[] = [];

  let selectedSeats: any[] = [];
  let timerSignal = 0;
  let blockedUntil = 0;
  let disabled: boolean = true;
  let clearSeats = 0;

  $: {
    seats = seats;
    clearSeats = clearSeats;
    disabled = disabled;
    aspectRatio = aspectRatio;
    blockedUntil = blockedUntil;
  }
  const seatColors = {
    regular: "#86BBD8",
    vip: "#F6AE2D",
    loge: "#33658A",
    selected: "#00cc00",
    blocked: "#777777",
  };

  let aspectRatio = "";

  async function getDBSeats() {
    fetch(`${apiUrl}/events/${$page.params.eventId}/seats`, {
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          goto(`/auth/login?redirect=/seatselection/${$page.params.eventId}`);
          return;
        } else if (response.status === 404) {
          goto("/movies");
          return;
        }
        return response.json();
      })
      .then((seatData) => {
        console.log(seatData);
        seats = seatData.seat_rows;
        selectedSeats =
          seatData.currentUserSeats === null ? [] : seatData.currentUserSeats;
        blockedUntil =
          seatData.blockedUntil === null
            ? 0
            : new Date(Date.parse(seatData.blockedUntil)).getTime();
        timerSignal =
          seatData.currentUserSeats === null ||
          seatData.currentUserSeats.length == 0
            ? 0
            : 1;
        aspectRatio = `aspect-ratio: ${
          seats.length > 0 ? seats.at(0).length : 0
        }/${seats.length};`;
      });
    selectedSeats = selectedSeats;
    seats = seats;
  }
  function timerFinished() {
    getDBSeats();
    fire(
      "Timer ran out!\nSeats only get blocked for a certain amount of time",
      4500
    );
  }

  onMount(async () => {
    getDBSeats();
  });
</script>

<div
  class="flex sm:flex-row flex-col gap-y-5 sm:gap-y-0 items-center w-[80%] mx-auto mt-4"
>
  <div
    class=" max-w-full sm:max-h-[80vh] sm:max-w-[60%] mx-auto"
    style={aspectRatio}
  >
    <Cinemahall
      bind:clearSeats
      bind:seats
      bind:blockedUntil
      {seatColors}
      bind:selectedSeats
      on:seatSelectionChanged={() => {
        getDBSeats();
      }}
    />
  </div>
  <div class="flex flex-col w-[90%] sm:w-1/3">
    <div
      class="flex flex-col h-[30vh] sm:h-[60vh] gap-y-5 bg-tileBlue rounded-md"
    >
      <div class="mx-auto h-[15%] w-[50%] sm:w-[60%] mb-4">
        {#key timerSignal}
          <Timer
            bind:blockedUntil
            bind:timerSignal
            on:timerFinished={timerFinished}
          />
        {/key}
      </div>
      {#key selectedSeats}
        <div class="mx-auto w-full h-full">
          <SelSeatOverview {selectedSeats} />
        </div>
      {/key}
    </div>
    <div class="flex flex-row justify-between w-full">
      <button
        disabled={selectedSeats.length === 0}
        on:click={() => {
          goto(`/confirmation/${$page.params.eventId}`);
        }}
        class="w-[48%] ring-1 ring-white bg-tileBlue my-4 rounded-lg enabled:hover:bg-blue-400 duration-300
      disabled:bg-slate-400 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <div class="flex flex-row items-center place-content-evenly h-full">
          <p class="text-textWhite text-[150%]">Book now</p>
        </div>
      </button>
      <button
        disabled={selectedSeats.length === 0}
        on:click={() => {
          Swal.fire({
            title: "Are you sure you want to free all your seats?",
            showDenyButton: true,
            confirmButtonText: "I'm sure",
            denyButtonColor: "#888888",
            denyButtonText: "Cancel",
            confirmButtonColor: "#89a3be",
            customClass: {
              popup: "bg-backgroundBlue text-textWhite text-[100%]",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              clearSeats = 1;
              timerSignal = 0;
            }
          });
        }}
        class="w-[48%] ring-1 ring-white bg-tileBlue my-4 rounded-lg enabled:hover:bg-blue-400 duration-300
      disabled:bg-slate-400 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <div class="flex flex-row items-center place-content-evenly h-full">
          <p class="text-textWhite text-[150%]">Cancel</p>
        </div>
      </button>
    </div>
    <div class="w-full">
      <SeatLegend {seatColors} />
    </div>
  </div>
</div>
