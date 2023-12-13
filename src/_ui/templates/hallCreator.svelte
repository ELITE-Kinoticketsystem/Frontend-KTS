<script lang="ts">
  import DrawSeat from "./drawSeat.svelte";
  import Swal from "sweetalert2";
  import PlusButton from "./plusButton.svelte";
  import MinusButton from "./minusButton.svelte";

  export let seatTypeToPlace = "regular";
  export let curPriceCategory = "regular";

  let seats: any[] = [];
  let seatrowforFill = [];
  const xStartDim = 11;
  const yStartDim = 16;

  function fireNotEnoughCols(){
    Swal.fire({
      icon: "warning",
      title:
        "There are no columns left for removal",
      color: "#FAFAFA",
      timer: 5000,
      customClass: "rounded-lg w-[70%] sm:w-1/3",
      timerProgressBar: true,
      background: "#354A5F",
      text: "Add a column first!",
    });
  }
  function fireNotEnoughRows(){
    Swal.fire({
      icon: "warning",
      title:
        "There are no rows left for removal",
      color: "#FAFAFA",
      timer: 5000,
      customClass: "rounded-lg w-[70%] sm:w-1/3",
      timerProgressBar: true,
      background: "#354A5F",
      text: "Add a row first!",
    });
  }
  function fireDoubleSeatHasNoSpace() {
    Swal.fire({
      icon: "warning",
      title:
        "A double seat can not be placed here because there is not enough space!",
      color: "#FAFAFA",
      timer: 5000,
      customClass: "rounded-lg w-[70%] sm:w-1/3",
      timerProgressBar: true,
      background: "#354A5F",
      text: "Select a grid cell where itself and its right neighbor is empty!",
    });
  }

  function getColorFromCategory(category: string) {
    switch (category) {
      case "regular":
        return "#ff0000";
      case "premium":
        return "#00ff00";
      case "student":
        return "#0000ff";
      default:
        console.log("Category does not exist!");
        return "#000000";
    }
  }

  function getSeat(category: string, type: string, x: number, y: number) {
    return { category, type, x, y };
  }

  for (let y = 0; y < yStartDim; ++y) {
    for (let x = 0; x < xStartDim; ++x) {
      seatrowforFill.push(getSeat("regular", "empty", x, y));
    }
    seats.push(seatrowforFill);
    seatrowforFill = [];
  }

  let X = seats.at(0).length;
  let Y = seats.length;

  $: {
    seats = seats;
    X = seats.at(0).length;
  }
  $: {
    seats = seats;
    Y = seats.length;
  }
  $: {
    seatTypeToPlace = seatTypeToPlace;
  }
  $: {
    curPriceCategory = curPriceCategory;
  }

  
  function eraseSeatAt(seatType: string, x: number, y: number) {
    //clicked left part of doubleSeat
    if (seatType === "double") {
      seats.at(y).at(x + 1).type = "empty";
      seats.at(y).at(x + 1).category = "regular";
    }

    //clicked right part of doubleSeat
    if (seatType === "emptyDouble") {
      seats.at(y).at(x - 1).type = "empty";
      seats.at(y).at(x - 1).category = "regular";
    }

    seats.at(y).at(x).type = "empty";
    seats.at(y).at(x).category = "regular";
  }

  function seatWasClicked(x: number, y: number) {
    let clickedType = seats.at(y).at(x).type;
    //check if unnecessary update
    if (seatTypeToPlace === clickedType) {
      return;
    }
    //eraser is selected
    if (seatTypeToPlace === "empty") {
      eraseSeatAt(clickedType, x, y);
      return;
    }

    //regular or double is selected
    eraseSeatAt(clickedType, x, y);
    emptyCellWasClicked(x, y);

    seats = seats;
  }
  function emptyCellWasClicked(x: number, y: number) {
    switch (seatTypeToPlace) {
      case "regular":
        seats.at(y).at(x).type = "regular";
        seats.at(y).at(x).category = curPriceCategory;
        seats = seats;
        break;
      case "double":
        if (x + 1 === X) {
          fireDoubleSeatHasNoSpace();
          break;
        }
        if (seats.at(y).at(x + 1).type !== "empty") {
          fireDoubleSeatHasNoSpace();
          break;
        }
        seats.at(y).at(x).type = "double";
        seats.at(y).at(x).category = curPriceCategory;
        seats.at(y).at(x + 1).type = "doubleEmpty";
        seats.at(y).at(x + 1).category = curPriceCategory;
        seats = seats;
        break;
    }

    seats = seats;
  }
  let mouseDown = false;
  $: mouseDown = mouseDown;

  function addRowToTop() {
    let curRow: any = [];
    for (let x = 0; x < X; ++x) {
      curRow.push(getSeat("regular", "empty", x, 0));
    }

    let newSeats: any[] = [curRow];
    let curSeat = getSeat("regular", "empty", 0, 0);
    curRow = [];
    for (let y = 0; y < Y; ++y) {
      for (let x = 0; x < X; ++x) {
        curSeat = seats.at(y).at(x);
        ++curSeat.y;

        curRow.push(curSeat);
      }
      newSeats.push(curRow);
      curRow = [];
    }
    seats = newSeats;
    ++Y;
  }
  function addRowToBottom() {
    let newRow: any = [];
    for (let x = 0; x < X; ++x) {
      newRow.push(getSeat("regular", "empty", x, Y));
    }
    seats = [...seats, newRow];
    ++Y;
  }
  function addColToLeft() {
    let newSeats: any[] = [];
    let curSeat = getSeat("regular", "empty", 0, 0);
    let curRow = [getSeat("regular", "empty", 0, 0)];

    for (let y = 0; y < Y; ++y) {
      for (let x = 0; x < X; ++x) {
        curSeat = seats.at(y).at(x);
        ++curSeat.x;
        curRow.push(curSeat);
      }
      newSeats.push(curRow);
      curRow = [getSeat("regular", "empty", y + 1, 0)]; //start nextrow with additional seat
    }
    seats = newSeats;
    ++X;
  }
  function addColToRight() {
    if(Y === 0){fireNotEnoughRows(); return;}
    for (let y = 0; y < Y; ++y) {
      seats.at(y).push(getSeat("regular", "empty", X, y));
    }
    seats = seats;
    ++X;
  }

  function removeTopRow() {
    if(Y === 0){fireNotEnoughRows(); return;}
    seats = seats.slice(1, seats.length);
    --Y;
  }
  function removeLeftCol() {
    if(X === 0){fireNotEnoughCols(); return;}
    for (let y = 0; y < Y; ++y) {
      seats[y] = seats.at(y).slice(1, X);
    }
    --X;
  }
  function removeRightCol(){
    if(X === 0){fireNotEnoughCols(); return;}
    for(let y = 0; y < Y; ++y){
        seats[y] = seats.at(y).slice(0, X - 1);
    }
    --X;
  }
  function removeBottomRow(){
    if(Y=== 0){fireNotEnoughRows(); return;}
    seats = seats.slice(0,seats.length-1);
    --Y;
  }

  let sizesForPlusButton = "h-5 w-5 sm:h-8 sm:w-8 xl:h-10 xl:w-10";
</script>

<div class="relative w-full h-full">
  <button
    on:mouseleave={() => {
      mouseDown = false;
    }}
    class=" grid max-w-full max-h-full mx-auto"
    style="aspect-ratio: {X}/{Y}; grid-template-columns: repeat({X}, minmax(0, 1fr)); grid-template-rows: repeat({Y}, minmax(0, 1fr));"
  >
    {#each seats as seatrow, y}
      {#each seatrow as seat, x}
        {#if seat.type === "regular" || seat.type === "double"}
          <button
            on:dblclick={() => {
              eraseSeatAt(seat.type, x, y);
              seats = seats;
            }}
            on:mousedown={() => {
              mouseDown = true;
              seatWasClicked(x, y);
              seats = seats;
            }}
            on:mouseup={() => {
              mouseDown = false;
            }}
            on:mouseenter={() => {
              if (!mouseDown) return;
              seatWasClicked(x, y);
              seats = seats;
            }}
            class="{seat.type === 'double'
              ? 'col-span-2'
              : ''} hover:bg-blue-400"
          >
            <DrawSeat
              type={seat.type}
              color={getColorFromCategory(seat.category)}
            />
          </button>
        {:else if seat.type === "empty"}
          <button
            on:mousedown={() => {
              mouseDown = true;
              seatWasClicked(x, y);
              seats = seats;
            }}
            on:mouseup={() => {
              mouseDown = false;
            }}
            on:mouseenter={() => {
              if (!mouseDown) return;
              seatWasClicked(x, y);
              seats = seats;
            }}
            class="ring-1 ring-inset ring-white hover:bg-blue-400 w-full h-full"
          >
            <svg
              preserveAspectRatio="xMidYMid meet"
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              class="h-full w-full"
            >
              <rect width="100" height="100" fill="none" />
            </svg>
          </button>
        {/if}
      {/each}
    {/each}

    <div
      class="absolute -right-8 sm:-right-14 top-1/2 -translate-y-[125%] {sizesForPlusButton}"
    >
      <button on:click={addColToRight}><PlusButton /></button>
    </div>
    <div
      class="absolute -left-8 sm:-left-14 top-1/2 -translate-y-[125%] {sizesForPlusButton}"
    >
      <button on:click={addColToLeft}><PlusButton /></button>
    </div>
    <div
      class="absolute -bottom-8 sm:-bottom-14 left-1/2 translate-x-[25%] {sizesForPlusButton}"
    >
      <button on:click={addRowToBottom}><PlusButton /></button>
    </div>
    <div
      class="absolute -top-8 sm:-top-14 left-1/2 translate-x-[25%] {sizesForPlusButton}"
    >
      <button on:click={addRowToTop}><PlusButton /></button>
    </div>
    

    <div
      class="absolute -right-8 sm:-right-14 top-1/2 translate-y-[25%] {sizesForPlusButton}"
    >
      <button on:click={removeRightCol}><MinusButton /></button>
    </div>
    <div
      class="absolute -left-8 sm:-left-14 top-1/2 translate-y-[25%] {sizesForPlusButton}"
    >
      <button on:click={removeLeftCol}><MinusButton /></button>
    </div>
    <div
      class="absolute -bottom-8 sm:-bottom-14 left-1/2 -translate-x-[125%] {sizesForPlusButton}"
    >
      <button on:click={removeBottomRow}><MinusButton /></button>
    </div>
    <div
      class="absolute -top-8 sm:-top-14 left-1/2 -translate-x-[125%] {sizesForPlusButton}"
    >
      <button on:click={removeTopRow}><MinusButton /></button>
    </div>
  </button>
</div>
