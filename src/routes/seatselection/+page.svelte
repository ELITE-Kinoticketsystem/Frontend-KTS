<script lang="ts">
  import Swal from "sweetalert2";
  import Cinemahall from "../../_ui/templates/cinemahall.svelte";
  import SelSeatOverview from "../../_ui/templates/selSeatOverview.svelte";
  import Timer from "../../_ui/templates/timer.svelte";
  import CinemaSeat from "../../_ui/templates/cinemaSeat.svelte";

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
  export let nrOfRows = 24;
  export let nrOfCols = 18;

  for (let y = 0; y < nrOfRows; ++y) {
    for (let x = 0; x < nrOfCols; ++x) {
      let choice = getRandomInt(100);
      let booked = getRandomInt(100) > 80 ? true : false;
      let category = "regular";
      if (getRandomInt(100) < 40) {
        category = "premium";
      }
      if (getRandomInt(100) < 40) {
        category = "student";
      }
      if (getRandomInt(100) < 40) {
        category = "regular";
      }

      if (choice < 20) {
        if (x < nrOfCols - 1) {
          seatrow.push(getSeat("double", x, y, booked, category));
          seatrow.push(getSeat("emptyDouble", x + 1, y, booked, category));
          ++x;
        } else {
          seatrow.push(getSeat("regular", x, y, booked, category));
        }
      } else if (choice >= 20 && choice <= 80) {
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

  let aspectRatio = `aspect-ratio: ${seats.at(0).length}/${seats.length};`;
  console.log(aspectRatio);
</script>

<div
  class="flex flex-col items-center w-[80%] sm:w-[50%] mx-auto sm:mx-auto sm:mt-4"
>
  <div class="relative flex w-full mb-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 700 150"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      class="bg-backgroundBlue"
    >
      <path
        d="m-34.35531,454.77409l0.56913,0l0.17587,-0.54067l0.17587,0.54067l0.56913,0l-0.46044,0.33415l0.17588,0.54067l-0.46044,-0.33416l-0.46044,0.33416l0.17588,-0.54067l-0.46044,-0.33415z"
        stroke-width="5"
        stroke="#000"
        fill="none"
      />
      <path
        d="m-48.67183,249.33199l0.56913,0l0.17587,-0.54067l0.17587,0.54067l0.56913,0l-0.46044,0.33415l0.17588,0.54067l-0.46044,-0.33416l-0.46044,0.33416l0.17588,-0.54067l-0.46044,-0.33415z"
        stroke-width="5"
        stroke="#000"
        fill="none"
      />

      <rect
        stroke="#000"
        stroke-width="5"
        height="146.61333"
        width="697.14151"
        y="1.26105"
        x="1.68279"
        fill="none"
      />
      <ellipse
        stroke="#000"
        stroke-width="5"
        ry="127.66335"
        rx="86.68803"
        cy="2.75692"
        cx="699.43101"
        fill="none"
      />
      <ellipse
        stroke="#000"
        stroke-width="5"
        ry="127.66335"
        rx="86.68803"
        cy="2.75693"
        cx="2.28852"
        fill="none"
      />
      <ellipse
        stroke="#000"
        ry="30.33304"
        rx="259.76095"
        cy="-1.06992"
        cx="350.25356"
        stroke-width="5"
        fill="none"
      />
    </svg>
    <div
      class="absolute mx-auto inset-x-0 top-0 -translate-y-1/2 flex-none w-[18%] sm:w-1/5"
    >
      <Timer startTime={120} {signal} on:timerFinished={timerFinished} />
    </div>
    {#key selectedSeats}
      <div
        class="absolute inset-x-0 top-[20%] sm:top-[15%] flex-none basis-1/5"
      >
        <SelSeatOverview {selectedSeats} />
      </div>
    {/key}
  </div>

  <div class="ring-2 ring-white max-h-[60vh] w-auto max-w-full"
  style="{aspectRatio}">
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
</div>
