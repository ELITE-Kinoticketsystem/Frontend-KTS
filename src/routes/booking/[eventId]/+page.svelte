<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { AuthService, apiUrl } from "$lib/_services/authService.js";
  import { fire } from "$lib/swalTemplate.js";
  import { onMount } from "svelte";
  import { useLazyImage as lazyImage } from "svelte-lazy-image";
  import Swal from "sweetalert2";

  export let data;

  const eventInformation: any = data.eventInformation;
  const priceCategories: any = data.priceCategories;

  let seats: any[] = [];

  async function createOrder() {
    let eventSeatPriceCategory: any[] = [];
    for (let i = 0; i < seats.length; i++) {
      eventSeatPriceCategory.push({
        eventSeatId: seats[i].EventSeat.ID,
        priceCategoryId: getCategorieIdByType(seats[i].type),
      });
    }
    await fetch(apiUrl + "/events/" + $page.params.eventId + "/book", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventSeatPriceCategories: eventSeatPriceCategory,
        paymentMethodID: "2B1F7FB2881C4F2DBD4677A48D2846C8",
      }),
    }).then(async (res) => {
      const json = await res.json();
      if (res.ok) {
        fire(
          "Successfuly booked. You will be redirected to your tickets.",
          3000
        );
        goto("/tickets/" + json.id);
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    });
  }
  let rowNr = 0;
  let cinemaHallName = "";
  let theatreName = "";
  let isUserLoggedIn = false;
  let title = "";
  if (eventInformation.Movies.length === 1) {
    title = eventInformation.Movies[0].Title;
  } else {
    title = eventInformation.Title;
  }
  onMount(async () => {
    await AuthService.isUserLoggedIn().then((res) => {
      isUserLoggedIn = res;
    });
    if (!isUserLoggedIn) {
      goto("/auth/login?redirect=/confirmation/" + $page.params.eventId);
    }
    await getEventTickets().then((data) => {
      seats = data.selectedSeats;
      seats.forEach((seat) => {
        seat.type = sessionStorage.getItem(
          "selectedSeats-" + seat.EventSeat.ID
        );
      });
      cinemaHallName = seats[0].CinemaHall.Name;
      theatreName = seats[0].Theatre.Name;
      rowNr = seats[0].Seat.RowNr;
    });
  });

  async function getEventTickets() {
    const ticketsResponse = await fetch(
      apiUrl + "/events/" + $page.params.eventId + "/user-seats",
      {
        credentials: "include",
      }
    );

    if (!ticketsResponse.ok) {
      goto("/seatselection/" + $page.params.eventId);
    } else return await ticketsResponse.json();
  }

  $: totalPrice = seats.reduce((acc, seat) => {
    return (
      acc +
      calculatePrice(
        seat.EventSeatCategory.Price,
        priceOfType(seat.type),
        seat.Seat.Type
      )
    );
  }, 0);

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
  function getCategorieIdByType(type: string) {
    let uuid = "";
    priceCategories.forEach((category: any) => {
      if (category.CategoryName === type) {
        uuid = category.ID;
      }
    });
    return uuid;
  }
</script>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div
    class="flex flex-col w-max flex-grow space-x-5 bg-tileBlue px-10 py-10 rounded-2xl space-y-5"
  >
    <div class="mx-auto text-textWhite text-4xl font-semibold">Payment</div>
    <div class="flex flex-row justify-between">
      <div class="w-1/3 justify-start">
        <img
          src={eventInformation.Movies[0].CoverPicURL}
          alt=""
          class="w-full h-full object-cover rounded-sm"
          use:lazyImage
        />
      </div>
      <div class="flex flex-col w-2/3 text-right text-textWhite text-xl">
        <p>{title}</p>
        <p>{cinemaHallName}</p>
        <p>{new Date(eventInformation.Start).toLocaleString()}</p>
        <p>
          Row {rowNr}: Seat
          {#each seats as seat, index}
            {#if index === seats.length - 1}
              {seat.Seat.ColumnNr}
            {:else}
              {seat.Seat.ColumnNr},&nbsp;
            {/if}
          {/each}
        </p>
        <p>{(totalPrice / 100).toFixed(2)} €</p>
        <p>{theatreName}</p>
        <p>{eventInformation.Is3d ? "3D" : "2D"}</p>
        <p class="text-buttonBlue mt-10 ml-10 text-justify">
          Please note that the next step is the payment step and by completing
          it, you will be purchasing the ticket at the cost of {(
            totalPrice / 100
          ).toFixed(2)} €.
        </p>
      </div>
    </div>
    <div class="flex w-full">
      <button
        class="text-textWhite py-3 w-1/2 bg-buttonBlue hover:bg-green-500 duration-300 mx-auto rounded-md"
        on:click={() => {
          createOrder();
          //goto("/tickets/" + 1);
        }}>Pay</button
      >
    </div>
  </div>
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
