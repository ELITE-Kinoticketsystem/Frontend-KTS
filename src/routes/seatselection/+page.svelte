<script lang="ts">
  import Swal from "sweetalert2";
  import Cinemahall from "../../_ui/templates/cinemahall.svelte";
  import SelSeatOverview from "../../_ui/templates/selSeatOverview.svelte";
  import Timer from "../../_ui/templates/timer.svelte";
  import SeatLegend from "../../_ui/templates/seatLegend.svelte";

  let seats: any[] = [];
  let selectedSeats: any[] = [];

  $: selectedSeats = selectedSeats;
  $: seats = seats;
  $: signal = selectedSeats.length > 0 ? 1 : 0;

  let seatrow: any[] = [];
  function getSeat(
    type: string,
    x: number,
    y: number,
    bookedByOther: boolean,
    category: string
  ) {
    return { type, x, y, available: true, bookedByOther, category };
  }
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  export let nrOfRows = 12;
  export let nrOfCols = 12;

  for (let y = 0; y < nrOfRows; ++y) {
    for (let x = 0; x < nrOfCols; ++x) {
      let choice = getRandomInt(100);
      let booked = getRandomInt(100) > 80 ? true : false;
      let category = "regular";
      if (getRandomInt(100) < 40) {
        category = "vip";
      }
      if (getRandomInt(100) < 40) {
        category = "loge";
      }

      if (choice < 20) {
        if (x < nrOfCols - 1) {
          seatrow.push(getSeat("double", x, y, booked, category));
          seatrow.push(getSeat("emptyDouble", x + 1, y, booked, category));
          ++x;
        } else {
          seatrow.push(getSeat("regular", x, y, booked, category));
        }
      } else if (choice >= 20 && choice <= 50) {
        seatrow.push(getSeat("regular", x, y, booked, category));
      } else {
        seatrow.push(getSeat("empty", x, y, booked, category));
      }
    }
    seats.push(seatrow);
    seatrow = [];
  }

  function timerFinished() {
    for (let i = 0; i < selectedSeats.length; ++i) {
      seats.at(selectedSeats.at(i).y).at(selectedSeats.at(i).x).available =
        true;
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
  $: console.log(seats);
  let aspectRatio = `aspect-ratio: ${seats.at(0).length}/${seats.length};`;
</script>

<div class="flex flex-row justify-center w-[80%] sm:w-[80%] mx-auto sm:mt-4">
  <div
    class="flex-col max-h-[80vh] w-auto max-w-[60%] sm:mr-12 sm:ml-24"
    style={aspectRatio}
  >
    <Cinemahall
      {seats}
      {selectedSeats}
      on:seatWasSelected={(e) => {
        selectedSeats = e.detail.selectedSeats;
        seats = seats;
        signal = signal;
      }}
    />
  </div>
  <div class="flex flex-col  w-1/3">
    <div class="flex flex-col  h-[60vh] bg-tileBlue sm:rounded-md">
      <div class="mx-auto w-[20%] sm:w-[60%] xl:mb-4">
        <Timer startTime={120} {signal} on:timerFinished={timerFinished} />
      </div>
      {#key selectedSeats}
        <div class="mx-auto w-full h-full">
          <SelSeatOverview {selectedSeats} />
        </div>
      {/key}
    </div>
    <button class="bg-tileBlue rounded-lg ring-1 ring-white text-textWhite text-xl hover:bg-blue-400 h-12 my-4">
      Book now
    </button>
    <div class="w-full">
      <SeatLegend />
    </div>
  </div>
</div>
