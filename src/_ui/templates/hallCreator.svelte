<script lang="ts">
  import DrawSeat from "./drawSeat.svelte";
  import Swal from "sweetalert2";
  import PlusButton from "./plusButton.svelte";
  import MinusButton from "./minusButton.svelte";
  import { createEventDispatcher } from "svelte";
  import SizeInput from "./sizeInput.svelte";
  import { fire } from "$lib/swalTemplate";

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

  function fireDoubleSeatHasNoSpace() {
    fire(
      "A double seat can not be placed here because there is not enough space!\n" +
        "Select a grid cell where itself and its right neighbor is empty!",
      3000
    );
    mouseDown = false;
  }

  function getColorFromCategory(Category: string) {
    switch (Category) {
      case "regular":
        return "#86BBD8";
      case "vip":
        return "#7b2cbf";
      case "loge":
        return "#F6AE2D";
      default:
        console.log("Category does not exist!");
        return "#000000";
    }
  }
  //helper function
  function getSeat(
    Category: string,
    Type: string,
    X: number,
    Y: number
  ) {
    return { Category, Type, X, Y };
  }
  //initial setup
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
        eraseSeatAt(seats.at(y).at(x).Type, x, y);
        break;
      case "regular":
        {
          let previousType = seats.at(y).at(x).Type;
          if (previousType === "double") {
            seats.at(y).at(x + 1).Type = "empty";
          }
          if (previousType === "emptyDouble") {
            seats.at(y).at(x - 1).Type = "empty";
          }
          seats.at(y).at(x).Type = "regular";
          seats.at(y).at(x).Category = curSeatCategory;
        }
        break;
      case "disabled":
        let previousType = seats.at(y).at(x).Type;
        if (previousType === "double") {
          seats.at(y).at(x + 1).Type = "empty";
        }
        if (previousType === "emptyDouble") {
          seats.at(y).at(x - 1).Type = "empty";
        }
        seats.at(y).at(x).Type = "disabled";
        seats.at(y).at(x).Category = curSeatCategory;
        break;
      case "double":
        let rightNeighbourType = seats.at(y).at(x + 1).Type;
        if (x + 1 === hallWidth || rightNeighbourType === "regular") {
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

  function setRowsFromTop(newYDim: number) {
    if (newYDim < 1) {
      fire("There has to be at least one row!", 3000);
      return;
    }
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
    correctCoordinates();
  }

  function setRowsFromBottom(newYDim: number) {
    if (newYDim < 1) {
      fire("There has to be at least one row!", 3000);
      return;
    }
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
    if (newHallWidth < 1) {
      fire("There has to be at least one column!", 3000);
      return;
    }
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
      }
    } else {
      for (let y = 0; y < hallHeight; ++y) {
        seats[y] = seats.at(y).slice(hallWidth - newHallWidth, hallWidth);
      }
    }
    hallWidth = newHallWidth;
    cleanHalfDoubleSeatsLeft();
    correctCoordinates();
  }

  function setColsFromRight(newHallWidth: number) {
    if (newHallWidth < 1) {
      fire("There has to be at least one column!", 3000);
      return;
    }
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

  function correctCoordinates() {
    for (let y = 0; y < hallHeight; ++y) {
      for (let x = 0; x < hallWidth; ++x) {
        seats.at(y).at(x).Y = y;
        seats.at(y).at(x).X = x;
      }
    }
  }

  let sizesForPlusButton = "h-5 w-5 sm:h-8 sm:w-8 xl:h-10 xl:w-10";
</script>

<div class="relative w-full h-full">
  <button
    on:mouseleave={() => {
      mouseDown = false;
    }}
    class="grid max-w-full max-h-full mx-auto"
    style="aspect-ratio: {hallWidth}/{hallHeight}; grid-template-columns: repeat({hallWidth}, minmax(0, 1fr)); grid-template-rows: repeat({hallHeight}, minmax(0, 1fr));"
  >
    {#each seats as seatrow, y}
      {#each seatrow as seat, x}
        {#if !seat.Type.startsWith("empty")}
          <button
            on:contextmenu|preventDefault={() => {
              eraseSeatAt(seat.Type, x, y);
            }}
            on:dblclick={() => {
              eraseSeatAt(seat.Type, x, y);
            }}
            on:mousedown={() => {
              mouseDown = true;
            }}
            on:mouseup={() => {
              mouseDown = false;
            }}
            on:mouseenter={(e) => {
              if (!mouseDown) return;
              if (e.buttons === 1) seatWasClicked(x, y);
              if (e.buttons === 2) eraseSeatAt(seat.Type, x, y);
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
            on:contextmenu|preventDefault|stopPropagation={() => {}}
            on:mousedown={(e) => {
              if (e.button === 0) seatWasClicked(x, y);
              mouseDown = true;
            }}
            on:mouseup={() => {
              mouseDown = false;
            }}
            on:mouseenter={(e) => {
              if (!mouseDown) return;
              if (e.buttons === 1) seatWasClicked(x, y);
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
      class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[120%] flex flex-col items-center justify-between h-[30%] w-[15%]"
    >
      <div class="hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}">
        <button
          on:click={() => {
            setColsFromRight(hallWidth + 1);
          }}><PlusButton /></button
        >
      </div>
      <div class="w-[50%]">
        <SizeInput
          placeholder={"X:"}
          bind:updateSize={hallWidth}
          on:sizeChanged={(e) => {
            setColsFromRight(e.detail);
          }}
        />
      </div>
      <div class="hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}">
        <button
          on:click={() => {
            setColsFromRight(hallWidth - 1);
          }}><MinusButton /></button
        >
      </div>
    </div>

    <div
      class="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[120%] flex flex-col items-center justify-between h-[30%] w-[15%]"
    >
      <div class="hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}">
        <button
          on:click={() => {
            setColsFromLeft(hallWidth + 1);
          }}><PlusButton /></button
        >
      </div>
      <div class="w-[50%]">
        <SizeInput
          placeholder={"X:"}
          bind:updateSize={hallWidth}
          on:sizeChanged={(e) => {
            setColsFromLeft(e.detail);
          }}
        />
      </div>
      <div class="hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}">
        <button
          on:click={() => {
            setColsFromLeft(hallWidth - 1);
          }}><MinusButton /></button
        >
      </div>
    </div>

    <div
      class="absolute -bottom-8 left-1/2 flex flex-row justify-between translate-y-[70%] -translate-x-1/2 w-[22%]"
    >
      <div class="hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}">
        <button
          on:click={() => {
            setRowsFromBottom(hallHeight - 1);
          }}><MinusButton /></button
        >
      </div>
      <div class="w-[35%]">
        <SizeInput
          placeholder={"Y:"}
          bind:updateSize={hallHeight}
          on:sizeChanged={(e) => {
            setRowsFromBottom(e.detail);
          }}
        />
      </div>
      <div class="hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}">
        <button
          on:click={() => {
            setRowsFromBottom(hallHeight + 1);
          }}><PlusButton /></button
        >
      </div>
    </div>
    <div
      class="absolute -top-8 -translate-y-[70%] left-1/2 -translate-x-1/2 flex flex-row justify-between w-[22%]"
    >
      <div class="hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}">
        <button
          on:click={() => {
            setRowsFromTop(hallHeight - 1);
          }}><MinusButton /></button
        >
      </div>
      <div class="w-[35%]">
        <SizeInput
          placeholder={"Y:"}
          bind:updateSize={hallHeight}
          on:sizeChanged={(e) => {
            setRowsFromTop(e.detail);
          }}
        />
      </div>
      <div class="hover:bg-blue-400 hover:rounded-full {sizesForPlusButton}">
        <button
          on:click={() => {
            setRowsFromTop(hallHeight + 1);
          }}><PlusButton /></button
        >
      </div>
    </div>
  </button>
</div>
