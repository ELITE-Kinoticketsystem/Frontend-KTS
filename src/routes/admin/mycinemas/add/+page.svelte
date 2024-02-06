<script lang="ts">
  import Swal from "sweetalert2";
  import HallCreator from "../../../../_ui/templates/hallCreator.svelte";
  import TypeSelector from "../../../../_ui/templates/typeSelector.svelte";
  import { onMount } from "svelte";
  import { fire } from "$lib/swalTemplate";
  import { apiUrl } from "$lib/_services/authService";

  let seatCategories = ["regular", "loge", "vip"];
  let seatTypes = ["regular", "double", "disabled"];
  let clearAllSeatsSignal = 0;
  let theatres: string[] = [];

  onMount(async () => {
    const data = fetch(`${apiUrl}/theatres`, {
      mode: "cors",
      credentials: "include",
    });
    data
      .then((response) => {
        if (response.status !== 200) {
          fire("A database error occured", 3000);
        }
        return response.json();
      })
      .then((fetchedTheatres) => {
        theatres = fetchedTheatres;
      });
  });

  let seatTypeToPlace = seatTypes.at(0);
  let curSeatCategory = seatCategories.at(0);
  let hallWidth = 23;
  let hallHeight = 15;
  let seats: any[] = [];
  let hallName = "";
  $: seats = seats;
  $: seatTypeToPlace = seatTypeToPlace;
  $: curSeatCategory = curSeatCategory;
  $: hallWidth = hallWidth;
  $: hallHeight = hallHeight;


  function postHall(theatre: any) {
    let seatsForMessage: any[] = [];

    seats.forEach((seatrow) => {
      seatrow.forEach((seat: any) => {
        if (!seat.Type.startsWith("empty")) {
          seatsForMessage.push(seat);
        }
      });
    });
    console.log(seatsForMessage);
    fetch(`${apiUrl}/cinema-halls`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        theatreID: theatre.ID,
        hallName,
        seats: seatsForMessage,
        height: hallHeight,
        width: hallWidth,
      }),
    }).then((response) => {
      fire(
        response.status === 201
          ? `${hallName} was created succesfully!`
          : `${hallName} could not be created due to internal problems!`,
        3000
      );
    });
  }

  function hallIsEmpty() {
    let nonEmptySeatFound = false;
    for (let i = 0; i < hallHeight; ++i) {
      for (let j = 0; j < hallWidth; ++j) {
        if (seats.at(i).at(j).Type !== "empty") {
          nonEmptySeatFound = true;
          break;
        }
      }
      if (nonEmptySeatFound) {
        break;
      }
    }
    return !nonEmptySeatFound;
  }

  function checkHall() {
    //assure halls a rectangle
    for (let i = 1; i < hallHeight; ++i) {
      if (seats.at(i).length !== seats.at(0).length) {
        return 1;
      }
    }

    for (let y = 0; y < hallHeight; ++y) {
      for (let x = 0; x < hallWidth - 1; ++x) {
        // check y coordinates
        if (seats.at(y).at(x).Y !== y) {
          return 2;
        }
        // check x coordinates
        if (seats.at(y).at(x).X !== x) {
          return 3;
        }
        // because loop does not cover last element check last x-coordinate as well
        if (seats.at(y).at(x + 1).X !== x + 1) {
          return 4;
        }
        // after double there always has to be an emptyDouble (left,right)
        if (seats.at(y).at(x).Type === "double") {
          if (seats.at(y).at(x + 1).Type !== "emptyDouble") {
            return 5;
          }
        }
      }
    }

    return 0;
  }

  function createHall() {
    if (hallIsEmpty()) {
      fire("Empty halls can not be created", 3000);
      return;
    }
    if (checkHall() !== 0) {
      fire(`The hall can not be created ErrorCode: ${checkHall()}`, 3000);
      return;
    }
    Swal.fire({
      title: "How do you want to name the hall?",
      input: "text",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#888888",
      cancelButtonColor: "#cccccc",
      color: "#FAFAFA",
      customClass: {
        input: "rounded-md text-backgroundBlue",
        title: "text-textWhite bg-backgroundBlue",
        popup: "bg-backgroundBlue",
      },
    }).then((answer) => {
      if (!answer.isConfirmed) {
        fire("Successfully canceled", 1500);
        return;
      }
      let enteredHallName = answer.value;
      // allow only reasonable(see Regex) hallnames
      if (
        !new RegExp("^[a-zA-Z]{1,24}(?:-?[a-zA-Z])*(?:s?d{0,3})?$").test(
          enteredHallName
        )
      ) {
        fire(
          `${
            enteredHallName === "" ? "''" : `'${enteredHallName}'`
          } is not a valid name\nEnter only letters and at most 3 optional digits`,
          3000
        );
        return;
      } else {
        hallName = enteredHallName;
        Swal.fire({
          title: `In which of your theatres is ${enteredHallName}?`,
          input: "select",
          inputOptions: theatres.map((theatre: any) => {
            return theatre.Name;
          }),
          showCancelButton: true,
          confirmButtonColor: "#89a3be",
          customClass: {
            popup: "bg-backgroundBlue text-textWhite text-[100%]",
          },
        }).then((answer: any) => {
          if (!answer.isConfirmed) {
            fire("Successfully canceled", 1500);
            return;
          }
          fire("Your hall is currently being constructed for you..");
          postHall(theatres.at(answer.value));
        });
      }
    });
  }
</script>

<div class="flex flex-row w-[93%] h-[66vh] sm:h-[80vh] mx-auto sm:mb-24">
  <div class="flex flex-col justify-between w-[22%]">
    <div class="">
      <p class="text-center text-textWhite font-bold sm:text-5xl">
        Hall Creator
      </p>
    </div>
    <div
      class="bg-backgroundBlue ring-1 ring-white rounded-lg my-4 py-2 w-[70%] mx-auto"
    >
      <p class="text-center text-textWhite font-semibold sm:text-xl px-2">
        Width: {hallWidth} Length: {hallHeight}
      </p>
    </div>

    <div class="w-[70%] mx-auto mb-3">
      <TypeSelector
        title={"Seat Type"}
        items={seatTypes}
        on:itemSelected={(e) => {
          seatTypeToPlace = e.detail;
        }}
      />
    </div>
    <div class="w-[70%] mx-auto mb-3 ring-1 ring-white rounded-lg">
      <TypeSelector
        title={"Seat Category"}
        items={seatCategories}
        on:itemSelected={(e) => {
          curSeatCategory = e.detail;
        }}
      />
    </div>

    <div
      class="bg-backgroundBlue ring-1 ring-white rounded-lg w-[70%] flex flex-col mx-auto"
    >
      <div class="flex flex-row my-4 w-full place-content-evenly">
        <button
          on:click={createHall}
          class="rounded-md bg-tileBlue ring-1 ring-white text-textWhite py-1 px-4 hover:bg-blue-500 duration-300"
          >Create</button
        >
        <button
          on:click={() => {
            if (hallIsEmpty()) {
              return;
            }
            Swal.fire({
              title: "Do you want to remove all placed seats?",
              showDenyButton: true,
              confirmButtonText: "Delete",
              denyButtonColor: "#888888",
              denyButtonText: "Cancel",
              confirmButtonColor: "#89a3be",
              customClass: {
                popup: "bg-backgroundBlue text-textWhite text-[100%]",
              },
            }).then((result) => {
              if (result.isConfirmed) {
                clearAllSeatsSignal = 1;
              }
            });
          }}
          class="rounded-md bg-tileBlue ring-1 ring-white text-textWhite py-1 px-4 hover:bg-blue-500 duration-300"
          >Clear all</button
        >
      </div>
    </div>
  </div>

  <div class="w-[72%] flex flex-col items-center justify-between mx-auto">
    <svg class="w-full h-[8%] p-4 rounded-lg">
      <rect width="100%" height="100%" rx="10" x="0" y="0" fill="#ffffff" />
    </svg>
    <div class="w-[83%] h-[82%] p-[3%]">
      <HallCreator
        bind:seats
        bind:seatTypeToPlace
        bind:curSeatCategory
        bind:clearAllSeatsSignal
        on:xDimChanged={(e) => {
          hallWidth = e.detail;
        }}
        on:yDimChanged={(e) => {
          hallHeight = e.detail;
        }}
      />
    </div>
  </div>
</div>
