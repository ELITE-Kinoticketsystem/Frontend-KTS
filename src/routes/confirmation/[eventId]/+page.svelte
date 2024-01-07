<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { AuthService, apiUrl } from "$lib/_services/authService";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  export let data;

  let eventInformation: any = data.eventInformation;
  let seats: any[] = [];
  let priceCategories: any = data.priceCategories;

  let showDropdown: boolean[] = [];
  let types: string[] = [];

  let title: string;
  if (eventInformation.Movies.length === 1) {
    title = eventInformation.Movies[0].Title;
  } else {
    title = eventInformation.Title;
  }

  let isUserLoggedIn = false;
  onMount(async () => {
    await AuthService.isUserLoggedIn().then((res) => {
      isUserLoggedIn = res;
    });
    if (!isUserLoggedIn) {
      goto("/auth/login?redirect=/confirmation/" + $page.params.eventId);
    }
    await getEventTickets().then((data) => {
      seats = data.selectedSeats;
      for (let i = 0; i < seats.length; i++) {
        if (
          sessionStorage.getItem("selectedSeats-" + seats[i].EventSeat.ID) !==
          null
        ) {
          seats[i].type = sessionStorage.getItem(
            "selectedSeats-" + seats[i].EventSeat.ID
          );
        } else {
          seats[i].type = "adult";
          sessionStorage.setItem(
            "selectedSeats-" + seats[i].EventSeat.ID,
            "adult"
          );
        }
      }
    });
    priceCategories.forEach((category: any) => {
      types.push(category.CategoryName);
    });

    for (let i = 0; i < seats.length; i++) {
      showDropdown.push(false);
    }
  });

  function calculatePrice(
    price: number,
    discount: number,
    seatType: string
  ): number {
    return price * (1 - discount / 100) * (seatType === "double" ? 2 : 1);
  }
  function priceOfType(type: string): number {
    let price = 0;
    priceCategories.forEach((category: any) => {
      if (category.CategoryName === type) {
        price = category.Price;
      }
    });
    return price;
  }

  async function getEventTickets() {
    const ticketsResponse = await fetch(
      apiUrl + "/events/" + $page.params.eventId + "/user-seats",
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );

    if (!ticketsResponse.ok) {
      goto("/seatselection/" + $page.params.eventId);
    } else return await ticketsResponse.json();
  }

  $: totalCost = seats.reduce((acc, seat) => {
    return (
      acc +
      calculatePrice(
        seat.EventSeatCategory.Price,
        priceOfType(seat.type),
        seat.Seat.Type
      )
    );
  }, 0);
</script>

<svelte:head>
  <title>Cinemika - Confirmation</title>
</svelte:head>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col w-max mx-auto flex-grow">
    <div class="flex flex-col text-textWhite font-semibold text-center mb-10">
      <p class="text-4xl">Review and confirm tickets</p>
      <p class="text-2xl">{title}</p>
      <p class="text-2xl">
        {new Date(eventInformation.Start).toLocaleString()}
      </p>
    </div>
    <div class="table w-full">
      <div class="relative">
        <table class="w-full text-sm text-left text-textWhite sm:rounded-lg">
          <thead class="text-xs text-textWhite uppercase bg-tileBlue">
            <tr>
              <th scope="col" class="px-6 py-3"> Seat </th>
              <th scope="col" class="px-6 py-3"> Type </th>
              <th scope="col" class="px-6 py-3"> Category </th>
              <th scope="col" class="px-6 py-3"> Price </th>
            </tr>
          </thead>
          <tbody>
            {#each seats as seat, index}
              <tr
                class="bg-headerBlue border-b text-textWhite hover:bg-inputBlue duration-300"
              >
                <td class="px-6 py-2">
                  Row {seat.Seat.VisibleRowNr}, Seat {seat.Seat.VisibleColumnNr}
                </td>
                <td class="p-2">
                  <div class="flex">
                    <button
                      id="dropdownBgHoverButton"
                      class="text-white duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 focus:bg-tileBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center capitalize"
                      type="button"
                      on:click={() => {
                        showDropdown[index] = !showDropdown[index];
                        for (let i = 0; i < showDropdown.length; i++) {
                          if (i !== index) {
                            showDropdown[i] = false;
                          }
                        }
                      }}
                    >
                      {seat.type}
                      <svg
                        id="arrowRegion"
                        class="w-2.5 h-2.5 ms-3 duration-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                        class:rotate-180={showDropdown[index]}
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      id="regionDropDown"
                      class="absolute z-10 hidden w-48 bg-buttonBlue rounded-lg shadow origin-top mt-10"
                      class:hidden={!showDropdown[index]}
                    >
                      <ul
                        class="p-3 space-y-1 text-sm text-textWhite"
                        aria-labelledby="regionDropDown"
                      >
                        {#each types as type}
                          {#if type !== seat.type}
                            <li>
                              <button
                                on:click={() => {
                                  seat.type = type;
                                  showDropdown[index] = false;
                                  sessionStorage.setItem(
                                    "selectedSeats-" + seat.EventSeat.ID,
                                    type
                                  );
                                }}
                                class="w-full"
                              >
                                <div
                                  class="flex items-center p-2 rounded hover:bg-headerBlue duration-300 capitalize"
                                >
                                  {type}
                                </div>
                              </button>
                            </li>
                          {/if}
                        {/each}
                      </ul>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-2 capitalize">
                  {seat.SeatCategory.CategoryName}
                </td>
                <td class="px-6 py-2">
                  {(
                    calculatePrice(
                      seat.EventSeatCategory.Price,
                      priceOfType(seat.type),
                      seat.Seat.Type
                    ) / 100
                  ).toFixed(2)} €
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <div class="price text-center text-textWhite text-2xl mt-5">
      <p>Total cost: {(totalCost / 100).toFixed(2)} €</p>
    </div>
    <div class="flex flex-row space-x-10 mx-auto mt-5 w-full">
      <button
        class="bg-buttonBlue w-1/2 py-2 text-textWhite text-xl rounded-lg hover:bg-green-500 duration-300"
        on:click={() => {
          goto("/reservation/" + $page.params.eventId);
        }}>Confirm reservation</button
      >
      <button
        class="bg-buttonBlue w-1/2 py-2 text-textWhite text-xl rounded-lg hover:bg-green-500 duration-300"
        on:click={() => {
          goto("/booking/" + $page.params.eventId);
        }}>Confirm purchase</button
      >
    </div>
    <button
      class="mx-auto text-textWhite hover:text-blue-400 duration-300 mt-5"
      on:click={() => {
        Swal.fire({
          title: "Booking vs Reserving tickets",
          text: "Booking involves immediate payment for purchased tickets, while reserving allows for temporary hold of desired tickets with payment and collection at a later date.",
          icon: "info",
          color: "#fff",
          background: "#1F2937",
          footer:
            "<a href='/help' class='text-textWhite hover:text-blue-500 duration-300'>Learn more</a>",
          confirmButtonText: "Ok",
          allowEnterKey: true,
        });
      }}
    >
      What is the difference between reservation and purchase?
    </button>
  </div>
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
