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
  let disabled: boolean;
  $: disabled = disabled;
  disabled = true;

  $: {
    seats = seats;
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
        seats = seatData.seat_rows;
        console.log(seatData);
        selectedSeats = seatData.currentUserSeats;
        blockedUntil =
          seatData.blockedUntil === null
            ? 0
            : new Date(Date.parse(seatData.blockedUntil)).getTime();
        timerSignal = selectedSeats.length > 0 ? 1 : 0;
        aspectRatio = `aspect-ratio: ${
          seats.length > 0 ? seats.at(0).length : 0
        }/${seats.length};`;
      });
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

<div class="flex flex-row justify-center w-[80%] sm:w-[80%] mx-auto sm:mt-4">
  <div
    class="flex-col max-h-[80vh] w-auto max-w-[60%] sm:mr-12 sm:ml-24"
    style={aspectRatio}
  >
    <Cinemahall
      bind:seats
      bind:blockedUntil
      {seatColors}
      bind:selectedSeats
      on:seatSelectionChanged={(e) => {
        getDBSeats();
        selectedSeats = selectedSeats;
        timerSignal = e.detail.wasBlock ? 1 : 0;
      }}
    />
  </div>
  <div class="flex flex-col w-1/3">
    <div class="flex flex-col h-[60vh] gap-y-5 bg-tileBlue sm:rounded-md">
      <div class="mx-auto h-[15%] w-[60%] xl:mb-4">
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
    <button
      disabled={selectedSeats.length === 0}
      on:click={() => {
        goto(`/confirmation/${$page.params.eventId}`);
      }}
      class="ring-1 ring-white bg-tileBlue my-4 rounded-lg h-[6vh] enabled:hover:bg-blue-400 duration-300
      disabled:bg-slate-400 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <div class="flex flex-row items-center place-content-evenly h-full">
        <p class="text-textWhite text-[150%]">Book now</p>
      </div>
    </button>
    <div class="w-full">
      <SeatLegend {seatColors} />
    </div>
  </div>
</div>
