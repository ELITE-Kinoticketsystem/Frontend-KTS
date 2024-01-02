<script lang="ts">
  import DrawSeat from "./drawSeat.svelte";
  import Swal from "sweetalert2";
  import PlusButton from "./plusButton.svelte";
  import MinusButton from "./minusButton.svelte";
  import { createEventDispatcher } from "svelte";
  import SizeInput from "./sizeInput.svelte";

  const dispatch = createEventDispatcher();

  export let seatTypeToPlace = "regular";
  export let curSeatCategory = "regular";
  export let clearAllSeatsSignal = 0;
  export let seats: any[] = [];

  let seatrowforFill = [];
  const xStartDim = 23;
  const yStartDim = 15;
  let mouseDown = false;
  $: mouseDown = mouseDown;
  // $: console.log(seats);

  function fireNotEnoughCols() {
    Swal.fire({
      icon: "warning",
      title: "There are no columns left for removal",
      color: "#FAFAFA",
      timer: 5000,
      customClass: "rounded-lg text-textWhite w-[70%] sm:w-1/3",
      timerProgressBar: true,
      background: "#1a1f25",
      text: "Add a column first!",
    });
    mouseDown = false;
  }
  function fireNotEnoughRows() {
    Swal.fire({
      icon: "warning",
      title: "There are no rows left for removal",
      color: "#FAFAFA",
      timer: 5000,
      customClass: "rounded-lg text-textWhite w-[70%] sm:w-1/3",
      timerProgressBar: true,
      background: "#1a1f25",
      text: "Add a row first!",
    });
    mouseDown = false;
  }
  function fireDoubleSeatHasNoSpace() {
    Swal.fire({
      icon: "warning",
      title:
        "A double seat can not be placed here because there is not enough space!",
      color: "#FAFAFA",
      timer: 5000,
      customClass: "rounded-lg w-[70%] text-textWhite sm:w-1/3",
      timerProgressBar: true,
      background: "#1a1f25",
      text: "Select a grid cell where itself and its right neighbor is empty!",
    });
    mouseDown = false;
  }

  function getColorFromCategory(Category: string) {
    switch (Category) {
      case "regular":
        return "#ff0000";
      case "vip":
        return "#00ff00";
      case "loge":
        return "#0000ff";
      default:
        console.log("Category does not exist!");
        return "#000000";
    }
  }

  function getSeat(
    Category: string,
    Type: string,
    ColumnNr: number,
    RowNr: number
  ) {
    return { Category, Type, ColumnNr, RowNr };
  }

  for (let y = 0; y < yStartDim; ++y) {
    for (let x = 0; x < xStartDim; ++x) {
      seatrowforFill.push(getSeat("regular", "empty", x, y));
    }
    seats.push(seatrowforFill);
    seatrowforFill = [];
  }

  let hallWidth = seats.at(0).length;
  let hallHeight = seats.length;

  $: {
    seats = seats;
    hallWidth = seats.length > 0 ? seats.at(0).length : 0;
    dispatch("xDimChanged", hallWidth);
    seats = seats;
    hallHeight = seats.length > 0 ? seats.length : 0;
    dispatch("yDimChanged", hallHeight);
    seatTypeToPlace = seatTypeToPlace;
    curSeatCategory = curSeatCategory;
  }

  $: if (clearAllSeatsSignal === 1) {
    for (let y = 0; y < hallHeight; ++y) {
      for (let x = 0; x < hallWidth; ++x) {
        seats.at(y).at(x).Type = "empty";
        seats.at(y).at(x).Category = "regular";
      }
    }
    seats = seats;
    clearAllSeatsSignal = 0;
  }

  function eraseSeatAt(seatType: string, x: number, y: number) {
    //clicked left part of doubleSeat
    if (seatType === "double") {
      seats.at(y).at(x + 1).Type = "empty";
      seats.at(y).at(x + 1).Category = "regular";
    }

    //clicked right part of doubleSeat
    if (seatType === "emptyDouble") {
      seats.at(y).at(x - 1).Type = "empty";
      seats.at(y).at(x - 1).Category = "regular";
    }

    seats.at(y).at(x).Type = "empty";
    seats.at(y).at(x).Category = "regular";
    seats = seats;
  }

  function seatWasClicked(x: number, y: number) {
    switch (seatTypeToPlace) {
      //eraser is selected
      case "empty":
        eraseSeatAt(seatTypeToPlace, x, y);
        break;
      case "regular":
        let previousType = seats.at(y).at(x).Type;
        if (previousType === "double") {
          seats.at(y).at(x + 1).Type = "empty";
        }
        if (previousType === "emptyDouble") {
          seats.at(y).at(x - 1).Type = "empty";
        }
        seats.at(y).at(x).Type = "regular";
        seats.at(y).at(x).Category = curSeatCategory;
        break;
      case "double":
        if (x + 1 === hallWidth) {
          fireDoubleSeatHasNoSpace();
          break;
        }
        let rightNeighbourType = seats.at(y).at(x + 1).Type;
        if (rightNeighbourType === "regular") {
          fireDoubleSeatHasNoSpace();
          break;
        }
        if (rightNeighbourType === "double") {
          if (seats.at(y).at(x - 1).Type === "empty" && x - 1 >= 0) {
            seats.at(y).at(x - 1).Type = "double";
            seats.at(y).at(x - 1).Category = curSeatCategory;
            seats.at(y).at(x).Type = "emptyDouble";
            seats.at(y).at(x).Category = curSeatCategory;
            return;
          } else {
            fireDoubleSeatHasNoSpace();
            return;
          }
        }
        seats.at(y).at(x).Type = "double";
        seats.at(y).at(x).Category = curSeatCategory;
        seats.at(y).at(x + 1).Type = "emptyDouble";
        seats.at(y).at(x + 1).Category = curSeatCategory;
        break;
    }
    seats = seats;
  }

  async function placeSeat(x: number, y: number) {}
  function cleanHalfDoubleSeatsRight() {
    for (let y = 0; y < hallHeight; ++y) {
      if (seats.at(y).at(hallWidth - 1).Type === "double") {
        seats[y][hallWidth - 1].Type = "empty";
      }
    }
  }
  function cleanHalfDoubleSeatsLeft() {
    for (let y = 0; y < hallHeight; ++y) {
      if (seats.at(y).at(0).Type === "emptyDouble") {
        seats[y][0].Type = "empty";
      }
    }
  }

  function addRowToTop() {
    let curRow: any = [];
    for (let x = 0; x < hallWidth; ++x) {
      curRow.push(getSeat("regular", "empty", x, 0));
    }

    let newSeats: any[] = [curRow];
    let curSeat = getSeat("regular", "empty", 0, 0);
    curRow = [];
    for (let y = 0; y < hallHeight; ++y) {
      for (let x = 0; x < hallWidth; ++x) {
        curSeat = seats.at(y).at(x);
        ++curSeat.RowNr;

        curRow.push(curSeat);
      }
      newSeats.push(curRow);
      curRow = [];
    }
    seats = newSeats;
    ++hallHeight;
  }
  function addRowToBottom() {
    let newRow: any = [];
    for (let x = 0; x < hallWidth; ++x) {
      newRow.push(getSeat("regular", "empty", x, hallHeight));
    }
    seats = [...seats, newRow];
    ++hallHeight;
  }
  function addColToLeft() {
    let newSeats: any[] = [];
    let curSeat = getSeat("regular", "empty", 0, 0);
    let curRow = [getSeat("regular", "empty", 0, 0)];

    for (let y = 0; y < hallHeight; ++y) {
      for (let x = 0; x < hallWidth; ++x) {
        curSeat = seats.at(y).at(x);
        ++curSeat.ColumnNr;
        curRow.push(curSeat);
      }
      newSeats.push(curRow);
      curRow = [getSeat("regular", "empty", y + 1, 0)]; //start nextrow with additional seat
    }
    seats = newSeats;
    ++hallWidth;
    cleanHalfDoubleSeatsLeft();
  }
  function addColToRight() {
    if (hallHeight === 0) {
      fireNotEnoughRows();
      return;
    }
    for (let y = 0; y < hallHeight; ++y) {
      seats.at(y).push(getSeat("regular", "empty", hallWidth, y));
    }
    seats = seats;
    ++hallWidth;
    cleanHalfDoubleSeatsRight();
  }

  function removeTopRow() {
    if (hallHeight === 0) {
      fireNotEnoughRows();
      return;
    }
    seats = seats.slice(1, seats.length);
    --hallHeight;
  }
  function removeLeftCol() {
    if (hallWidth === 0) {
      fireNotEnoughCols();
      return;
    }
    for (let y = 0; y < hallHeight; ++y) {
      seats[y] = seats.at(y).slice(1, hallWidth);
    }
    --hallWidth;
    cleanHalfDoubleSeatsLeft();
  }
  function removeRightCol() {
    if (hallWidth === 0) {
      fireNotEnoughCols();
      return;
    }
    for (let y = 0; y < hallHeight; ++y) {
      seats[y] = seats.at(y).slice(0, hallWidth - 1);
    }
    --hallWidth;
    cleanHalfDoubleSeatsRight();
  }
  function removeBottomRow() {
    if (hallHeight === 0) {
      fireNotEnoughRows();
      return;
    }
    seats = seats.slice(0, seats.length - 1);
    --hallHeight;
  }
  function setRowsFromTop(newYDim: number) {
    if (newYDim > hallHeight) {
      let newSeats: any[] = [];
      let additionalRows = newYDim - hallHeight;
      let curRow: any = [];
      for (let y = 0; y < additionalRows; ++y) {
        for (let x = 0; x < hallWidth; ++x) {
          curRow.push(getSeat("regular", "empty", x, y));
        }
        newSeats.push(curRow);
        curRow = [];
      }

      let curSeat = getSeat("regular", "empty", 0, 0);
      curRow = [];
      for (let y = additionalRows; y < newYDim; ++y) {
        for (let x = 0; x < hallWidth; ++x) {
          curSeat = seats.at(y - additionalRows).at(x);
          curSeat.RowNr += additionalRows;

          curRow.push(curSeat);
        }
        newSeats.push(curRow);
        curRow = [];
      }
      seats = newSeats;
    } else {
      seats = seats.slice(hallHeight - newYDim, seats.length);
    }

    hallHeight = newYDim;
  }
  function setRowsFromBottom(newYDim: number) {
    if (newYDim > hallHeight) {
      let additionalRows = newYDim - hallHeight;
      let curRow: any = [];
      for (let y = 0; y < additionalRows; ++y) {
        for (let x = 0; x < hallWidth; ++x) {
          curRow.push(getSeat("regular", "empty", x, y + hallHeight));
        }
        seats.push(curRow);
        curRow = [];
      }
    } else {
      seats = seats.slice(0, newYDim);
    }

    hallHeight = newYDim;
  }
  function setColsFromLeft(newHallWidth: number) {
    if (newHallWidth > hallWidth) {
      let additionalColumns = newHallWidth - hallWidth;
      let curSeat: any;
      let curAdditionalPartOfRow = [];
      for (let y = 0; y < hallHeight; ++y) {
        for (let i = 0; i < additionalColumns; ++i) {
          curSeat = getSeat("regular", "empty", i, y);
          curAdditionalPartOfRow.push(curSeat);
        }
        seats[y] = [...curAdditionalPartOfRow, ...seats.at(y)];
        curAdditionalPartOfRow = [];
        for (let x = additionalColumns; x < newHallWidth; ++x) {
          seats.at(y).at(x).ColumnNr += additionalColumns;
        }
      }
    } else {
      for (let y = 0; y < hallHeight; ++y) {
        seats[y] = seats.at(y).slice(hallWidth - newHallWidth, hallWidth);
      }
    }

    hallWidth = newHallWidth;
    cleanHalfDoubleSeatsLeft();
  }

  function setColsFromRight(newHallWidth: number) {
    if (newHallWidth > hallWidth) {
      for (let y = 0; y < hallHeight; ++y) {
        for (let i = hallWidth; i < newHallWidth; ++i) {
          seats.at(y).push(getSeat("regular", "empty", i, y));
        }
      }
    } else {
      for (let y = 0; y < hallHeight; ++y) {
        seats[y] = seats.at(y).slice(0, newHallWidth);
      }
    }
    hallWidth = newHallWidth;
    cleanHalfDoubleSeatsRight();
  }

  let sizesForPlusButton = "h-5 w-5 sm:h-8 sm:w-8 xl:h-10 xl:w-10";
</script>

<div class="relative w-full h-full mx-32">
  <button
    on:mouseleave={() => {
      mouseDown = false;
    }}
    class=" grid max-w-full max-h-full mx-auto"
    style="aspect-ratio: {hallWidth}/{hallHeight}; grid-template-columns: repeat({hallWidth}, minmax(0, 1fr)); grid-template-rows: repeat({hallHeight}, minmax(0, 1fr));"
  >
    {#each seats as seatrow, y}
      {#each seatrow as seat, x}
        {#if seat.Type === "regular" || seat.Type === "double"}
          <button
            on:dblclick={() => {
              eraseSeatAt(seat.Type, x, y);
            }}
            on:mousedown={() => {
              mouseDown = true;
              seatWasClicked(x, y);
            }}
            on:mouseup={() => {
              mouseDown = false;
            }}
            on:mouseenter={() => {
              if (!mouseDown) return;
              seatWasClicked(x, y);
            }}
            class="{seat.Type === 'double'
              ? 'col-span-2'
              : ''} hover:bg-blue-400"
          >
            <DrawSeat
              Type={seat.Type}
              color={getColorFromCategory(seat.Category)}
            />
          </button>
        {:else if seat.Type === "empty"}
          <button
            on:mousedown={() => {
              mouseDown = true;
              seatWasClicked(x, y);
            }}
            on:mouseup={() => {
              mouseDown = false;
            }}
            on:mouseenter={() => {
              if (!mouseDown) return;
              seatWasClicked(x, y);
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
      class="absolute -right-8 sm:-right-0 translate-x-[150%] top-1/2 -translate-y-[190%] hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}"
    >
      <button on:click={addColToRight}><PlusButton /></button>
    </div>
    <div
      class="absolute -right-8 sm:-right-0 sm:translate-x-[120%] top-1/2 -translate-y-1/2 w-14"
    >
      <SizeInput
        placeholder={"X:"}
        bind:updateSize={hallWidth}
        on:sizeChanged={(e) => {
          setColsFromRight(e.detail);
        }}
      />
    </div>
    <div
      class="absolute -right-8 sm:-right-0 translate-x-[150%] top-1/2 translate-y-[90%] hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}"
    >
      <button on:click={removeRightCol}><MinusButton /></button>
    </div>

    <div
      class="absolute -left-8 sm:-left-0 top-1/2 -translate-x-[150%] -translate-y-[190%] hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}"
    >
      <button on:click={addColToLeft}><PlusButton /></button>
    </div>
    <div
      class="absolute -left-8 sm:-left-0 top-1/2 -translate-x-[120%] -translate-y-1/2 w-14"
    >
      <SizeInput
        placeholder={"X:"}
        bind:updateSize={hallWidth}
        on:sizeChanged={(e) => {
          setColsFromLeft(e.detail);
        }}
      />
    </div>
    <div
      class="absolute -left-8 sm:-left-0 top-1/2 translate-y-[90%] -translate-x-[150%] hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}"
    >
      <button on:click={removeLeftCol}><MinusButton /></button>
    </div>

    <div
      class="absolute -bottom-8 sm:-bottom-0 translate-y-[150%] left-1/2 translate-x-[90%] hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}"
    >
      <button on:click={addRowToBottom}><PlusButton /></button>
    </div>
    <div
      class="absolute -bottom-8 sm:-bottom-0 translate-y-[155%] left-1/2 -translate-x-1/2 w-14"
    >
      <SizeInput
        placeholder={"Y:"}
        bind:updateSize={hallHeight}
        on:sizeChanged={(e) => {
          setRowsFromBottom(e.detail);
        }}
      />
    </div>
    <div
      class="absolute -bottom-8 sm:-bottom-0 translate-y-[150%] left-1/2 -translate-x-[190%] hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}"
    >
      <button on:click={removeBottomRow}><MinusButton /></button>
    </div>

    <div
      class="absolute -top-8 sm:-top-0 -translate-y-[150%] left-1/2 translate-x-[90%] hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}"
    >
      <button on:click={addRowToTop}><PlusButton /></button>
    </div>
    <div
      class="absolute -top-8 sm:-top-0 -translate-y-[155%] left-1/2 -translate-x-1/2 w-14"
    >
      <SizeInput
        placeholder={"Y:"}
        bind:updateSize={hallHeight}
        on:sizeChanged={(e) => {
          setRowsFromTop(e.detail);
        }}
      />
    </div>
    <div
      class="absolute -top-8 sm:-top-0 -translate-y-[150%] left-1/2 -translate-x-[190%] hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}"
    >
      <button on:click={removeTopRow}><MinusButton /></button>
    </div>
  </button>
</div>
