<script lang="ts">
  import Swal from "sweetalert2";
  import Cinemahall from "../../_ui/templates/cinemahall.svelte";
  import SelSeatOverview from "../../_ui/templates/selSeatOverview.svelte";
  import Timer from "../../_ui/templates/timer.svelte";

  let seats: any[] = [];
  let selectedSeats: any[] = [];
  let signal = 0;

  $: nrOfSelectedSeats = selectedSeats.length;
  let seat = { type: "regular", available: true, x: 0, y: 0 };
  let doubleSeat = { type: "double", available: true, x: 0, y: 0 };
  let emptySeat = { type: "empty", available: false, x: 0, y: 0 };
  let emptyDoubleSeat = { type: "emptyDouble", available: false, x: 0, y: 0 };

  let seatrow: any[] = [];
  function getSeat(type: string, x: number, y: number) {
    return { type, x, y, available: true };
  }
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  export const nrOfRows = 6;
  export const nrOfCols = 10;

  for (let y = 0; y < nrOfRows; ++y) {
    for (let x = 0; x < nrOfCols; ++x) {
      let choice = getRandomInt(100);
      if (choice < 20) {
        if (x < nrOfCols - 1) {
          doubleSeat.x = x;
          doubleSeat.y = y;
          seatrow.push(getSeat("double", x, y));
          seatrow.push(getSeat("emptyDouble", x + 1, y));
          ++x;
        } else {
          seatrow.push(getSeat("regular", x, y));
        }
      } else if (choice >= 20 && choice <= 80) {
        seatrow.push(getSeat("regular", x, y));
      } else {
        seatrow.push(getSeat("empty", x, y));
      }
    }
    seats.push(seatrow);
    seatrow = [];
  }

  function timerFinished() {
    for(let i = 0; i < selectedSeats.length; ++i){
      seats.at(selectedSeats.at(i).y).at(selectedSeats.at(i).x).available = true;
    }
    selectedSeats = [];
    nrOfSelectedSeats = 0;
    Swal.fire({
      icon: "error",
      title: "Timer ran out!",
      color: "#FAFAFA",
      timer: 5000,
      customClass: "rounded-lg w-[70%] sm:w-1/3",
      timerProgressBar: true,
      background: "#354A5F",
      text: "Please select seats next to each other!",
    });
  }
</script>

<div class="flex">
  <div class="mx-10 h-full">
    <div class="relative flex flex-col items-center sm:flex-row">
      <div class="w-1/5 absolute top-0 right-0 translate-y-1 z-50">
        <Timer startTime={100} {signal} on:timerFinished={timerFinished} />
      </div>
      <div class="flex w-full h-fit mx-5 mb-20 bg-red-100">
        <svg
          id="itself"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 3"
          preserveAspectRatio="xMidYMid meet"
          class="w-full h-auto"
          fill="#ffffff"
        >
          <rect width="100" height="3" rx="1" ry="1" fill="#ffffff" />
        </svg>
      </div>

      <div class=" flex basis-3/4">
        <Cinemahall
          {nrOfSelectedSeats}
          {seats}
          on:seatWasSelected={(e) => {
            selectedSeats = e.detail.selectedSeats;
            console.log(selectedSeats.length);
            signal = selectedSeats.length > 0 ? 1 : 0;
          }}
        />
      </div>
      <div class="flex basis-1/5">
        {#key nrOfSelectedSeats}
          <SelSeatOverview {selectedSeats} />
        {/key}
      </div>
    </div>
  </div>
</div>