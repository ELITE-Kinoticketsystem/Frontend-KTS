<script lang="ts">
  import Swal from "sweetalert2";
  import Cinemahall from "../../_ui/templates/cinemahall.svelte";
  import SelSeatOverview from "../../_ui/templates/selSeatOverview.svelte";
  import Timer from "../../_ui/templates/timer.svelte";
  import SeatLegend from "../../_ui/templates/seatLegend.svelte";
  import { onMount } from "svelte";

  export let data: { first: any };

  let seats: any[] = data.first.seat_rows;

  let selectedSeats: any[] = [];
  let startTime = 900;

  $: selectedSeats = selectedSeats;
  $: seats = seats;
  $: signal = selectedSeats.length > 0 ? 1 : 0;

  const seatColors = {
    regular: "#86BBD8",
    vip: "#F6AE2D",
    loge: "#33658A",
    selected: "#00cc00",
    blocked: "#777777",
  };

  function timerFinished() {
    for (let i = 0; i < selectedSeats.length; ++i) {
      seats
        .at(selectedSeats.at(i).RowNr)
        .at(selectedSeats.at(i).ColumnNr).available = true;
    }
    seats = seats;
    selectedSeats = [];
    signal = signal;
    Swal.fire({
      icon: "warning",
      title: "Timer ran out!",
      color: "#FAFAFA",
      timer: 5000,
      customClass: "rounded-lg w-[70%] sm:w-1/3",
      timerProgressBar: true,
      background: "#354A5F",
      text: "Be quicker!",
    });
  }
  function bookSelectedSeats() {
    Swal.fire({ title: "Booking seats..." });
  }
  let aspectRatio = "";
  onMount(async () => {
    aspectRatio = `aspect-ratio: ${seats.at(0).length}/${seats.length};`;
  });
</script>

<div class="flex flex-row justify-center w-[80%] sm:w-[80%] mx-auto sm:mt-4">
  <div
    class="flex-col max-h-[80vh] w-auto max-w-[60%] sm:mr-12 sm:ml-24"
    style={aspectRatio}
  >
    <Cinemahall
      {seats}
      {seatColors}
      {selectedSeats}
      on:seatWasSelected={(e) => {
        selectedSeats = e.detail.selectedSeats;
        seats = seats;
        signal = signal;
      }}
    />
  </div>
  <div class="flex flex-col w-1/3">
    <div class="flex flex-col h-[60vh] gap-y-5 bg-tileBlue sm:rounded-md">
      <div class="mx-auto h-[15%] w-[60%] xl:mb-4">
        <Timer {startTime} {signal} on:timerFinished={timerFinished} />
      </div>
      {#key selectedSeats}
        <div class="mx-auto w-full h-full">
          <SelSeatOverview {selectedSeats} />
        </div>
      {/key}
    </div>
    <a
      href="confirmation"
      class="ring-1 ring-white bg-tileBlue my-4 rounded-lg h-12 hover:bg-blue-400"
    >
      <p class="bg-rd-50 mt-[0.6rem] text-center text-textWhite text-xl">
        Book now
      </p>
    </a>
    <div class="w-full">
      <SeatLegend {seatColors} />
    </div>
  </div>
</div>
