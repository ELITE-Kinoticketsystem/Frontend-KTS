<script lang="ts">
  import Swal from "sweetalert2";
  import HallCreator from "../../../../_ui/templates/hallCreator.svelte";
  import TypeSelector from "../../../../_ui/templates/typeSelector.svelte";
  import { onMount } from "svelte";
  import { fire } from "$lib/swalTemplate";
  import { apiUrl } from "$lib/_services/authService";

  let seatCategories = ["regular", "loge", "vip"];
  let seatTypes = ["regular", "double", "eraser"];
  let clearAllSeatsSignal = 0;
  let theatres: string[] = [];

  onMount(async () => {
    const data = fetch(`${apiUrl}/theatres`, {
      mode: "cors",
      credentials: "include",
    });
    data
      .then((response) => {
        if (!response.ok) {
          fire("A database error occured", 3000);
        }
        return response.json();
      })
      .then((fetchedTheatres) => {
        console.log(fetchedTheatres);
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
  $:console.log(hallName);

  function postHall(theatre: any) {
    let success = false;
    fetch(`${apiUrl}/cinema-halls`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        theatreID: theatre.ID,
        hallName,
        seats,
      }),
    }).then((response) => {
      success = response.status === 200;
    });

    return success;
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

  function createHall() {
    if (hallIsEmpty()) {
      fire("Empty halls can not be created", 3000);
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
      console.log(answer);
      let enteredHallName = answer.value;
      let nameIsValid = true;
      if (!nameIsValid) {
        fire(`${enteredHallName.value} is not a valid name`, 3000);
      } else {
        hallName = enteredHallName;
        console.log(hallName);
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
        }).then((selectedHallIndex: any) => {
          fire(
            postHall(theatres.at(selectedHallIndex))
              ? `${hallName} was created succesfully!`
              : `${hallName} could not be created due to internal problems!`
          );
        });
      }
    });
  }
</script>

<div
  class="grid grid-rows-3 grid-cols-2 gap-y-24 sm:gap-y-0 sm:grid-rows-1 sm:grid-cols-10 gap-x-5 w-[85%] h-[64vh] sm:h-[80vh] sm:mt sm:mb-24"
>
  <div class="flex flex-col justify-between col-span-3">
    <div class="">
      <p class="text-center text-textWhite font-bold sm:text-5xl">
        Hall Creator
      </p>
    </div>
    <div
      class="bg-backgroundBlue ring-1 ring-white rounded-lg my-4 py-2 w-[60%] mx-auto"
    >
      <p class="text-center text-textWhite font-semibold sm:text-xl px-2">
        Width: {hallWidth} Length: {hallHeight}
      </p>
    </div>

    <div class="w-[60%] mx-auto mb-4">
      <TypeSelector
        title={"Seat Type"}
        items={seatTypes}
        on:itemSelected={(e) => {
          seatTypeToPlace = e.detail === "eraser" ? "empty" : e.detail;
        }}
      />
    </div>
    <div class="w-[60%] mx-auto mb-4 ring-1 ring-white rounded-lg">
      <TypeSelector
        title={"Seat Category"}
        items={seatCategories}
        on:itemSelected={(e) => {
          curSeatCategory = e.detail;
        }}
      />
    </div>

    <div
      class="bg-backgroundBlue ring-1 ring-white rounded-lg w-[60%] flex flex-col mx-auto"
    >
      <div class="flex flex-row my-5 w-full place-content-evenly">
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

  <div class="col-span-2 row-span-2 sm:row-span-1 sm:col-span-7 sm:mt-20">
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
