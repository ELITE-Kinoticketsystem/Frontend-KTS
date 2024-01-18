<script lang="ts">
  import { browser } from "$app/environment";
  import { AuthService, apiUrl } from "$lib/_services/authService";
  import "chart.js/auto";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";
  import { InvoiceTemplate } from "$lib/invoice";
  import { goto } from "$app/navigation";

  const invoicetemplate = new InvoiceTemplate();
  let ticketHistory: any[] = [];

  let isUserLoggedIn = false;
  async function fetchOrders() {
    const ticketsResponse = await fetch(apiUrl + "/orders", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    if (!ticketsResponse.ok) return [];
    return await ticketsResponse.json();
  }

  let username = "";
  let email = "";

  function getGreetings() {
    const time = new Date();
    if (time.getHours() < 12) return "Good Morning";
    else if (time.getHours() < 18) return "Good Afternoon";
    else return "Good Evening";
  }

  function animateValue(
    obj: HTMLElement | null,
    start: number,
    end: number,
    duration: number
  ) {
    let startTimestamp: number | null = null;
    const step = (timestamp: number | null) => {
      if (!startTimestamp) startTimestamp = timestamp;
      //@ts-ignore
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      //@ts-ignore
      obj.innerHTML =
        obj?.id === "totalAmountSpend"
          ? (Math.floor(progress * (end - start) + start) / 100).toFixed(2)
          : Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  $: sorted = 0;
  function sortHistory(type: string) {
    if (type === "date") {
      if (sorted % 2 === 0) {
        ticketHistory.sort((a, b) => {
          return (
            new Date(a.Event.Start).getTime() -
            new Date(b.Event.Start).getTime()
          );
        });
      } else {
        ticketHistory.sort((a, b) => {
          return (
            new Date(b.Event.Start).getTime() -
            new Date(a.Event.Start).getTime()
          );
        });
      }
    } else if (type === "price") {
      if (sorted % 2 === 0) {
        ticketHistory.sort((a, b) => {
          return a.Order.Totalprice - b.Order.Totalprice;
        });
      } else {
        ticketHistory.sort((a, b) => {
          return b.Order.Totalprice - a.Order.Totalprice;
        });
      }
    }
  }
  sortHistory("date");
  let checkBoxValues: any[] = [];
  let checkedAll = false;

  for (let i = 0; i < ticketHistory.length; i++) {
    checkBoxValues.push(false);
  }

  function atLeastOneCheckBoxIsTrue(): boolean {
    let amount = 0;
    checkBoxValues.map((value) => {
      if (value) amount++;
    });
    return amount >= 1;
  }
  function atLeastTwoCheckBoxIsTrue(): boolean {
    let amount = 0;
    checkBoxValues.map((value) => {
      if (value) amount++;
    });
    return amount >= 2;
  }

  let currentUsername: string = "";
  let currentEmail: string = "";
  let currentPassword: string = "";
  let nextUsername: string = "";
  let nextEmail: string = "";
  let nextPassword: string = "";

  let totalSpend = 0;
  $: visitedMovies = 0;
  $: upcomingMovies = [];
  onMount(async () => {
    await AuthService.isUserLoggedIn().then((res) => {
      isUserLoggedIn = res;
      if (!isUserLoggedIn) {
        goto("/auth/login");
        return;
      }
    });

    await fetchOrders().then((data) => {
      ticketHistory = data;
      visitedMovies = data.length;
      upcomingMovies = getNextUpComingMovie();
      ticketHistory.forEach((orders) => {
        totalSpend += orders.Order.Totalprice;
      });
      if (browser) {
        animateValue(
          document.getElementById("visitedMovies"),
          0,
          visitedMovies,
          1750
        );
        animateValue(
          document.getElementById("totalAmountSpend"),
          0,
          totalSpend,
          2000
        );
        username = JSON.parse(sessionStorage.getItem("user")!).Username;
        email = JSON.parse(sessionStorage.getItem("user")!).Email;
      }
    });
  });

  function getNextUpComingMovie() {
    let nextMovies: any[] = [];
    ticketHistory.forEach((order) => {
      if (order.Event.Start > new Date().toISOString()) {
        nextMovies.push(order);
      }
    });
    nextMovies.sort((a, b) => {
      return (
        new Date(a.Event.Start).getTime() - new Date(b.Event.Start).getTime()
      );
    });
    if (nextMovies === undefined || nextMovies.length === 0) return [];
    return nextMovies[0];
  }

  function startAnimation() {
    const divs = document.querySelectorAll("#bh");
    // Set the background image dynamically
    const body = document.body;
    body.style.background = "black center/cover no-repeat";

    divs.forEach((div, index) => {
      // Calculate the position relative to the center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const rect = div.getBoundingClientRect();
      const deltaX = centerX - (rect.left + rect.width / 2);
      const deltaY = centerY - (rect.top + rect.height / 2);

      // Apply transition with delay based on the distance from the center
      div.style.transition = `transform 4s ${index * 0.4}s ease-out, opacity 4s ${index * 0.4}s ease-out`;
      div.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1)`;
      div.style.opacity = "0";
    });
  }

  function startNewDashboard() {
    let ff = document.querySelector("#ff")!;
    let screen = document.querySelector("#screen")!;
    ff.classList.remove("hidden");
    ff.classList.add("flex");
    screen.classList.add("opacity-40");
    startAnimation();
    setTimeout(() => {
      goto("/dashboardv2?migrated=true");
    }, 3500);
  }
</script>

<head:svelte>
  <title>Cinemika - Dashboard</title>
</head:svelte>

<div class="relative flex w-screen h-max" id="bh">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col max-w-full" id="screen">
    <div class="flex justify-between">
      <div class="text-textWhite my-4 text-xl justify-start">
        {getGreetings()}, {username}
      </div>
      <div class="justify-end">
        <button
          class="flex py-2 px-4 duration-300 bg-buttonBlue rounded-md text-textWhite hover:bg-headerBlue"
          on:click={() => {
            startNewDashboard();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mr-2 animate-pulse"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
          Migrate to new Dashboard</button
        >
      </div>
    </div>
    <div class="grid grid-cols-3 gap-x-5 gap-y-2 h-48 min-w-min">
      <div class="grid bg-tileBlue rounded-md">
        <div class="flex relative">
          <div class="absolute text-textWhite text-xl ml-2 mt-1">
            Total visits:
          </div>
          <p
            class="flex-col sm:flex-col text-textWhite text-md sm:text-md md:text-lg xl:text-2xl mx-auto my-auto"
          >
            <span
              id="visitedMovies"
              class="text-xl sm:text-xl md:text-2xl xl:text-5xl"
              >{visitedMovies}</span
            >visits
          </p>
        </div>
      </div>
      <div class="grid bg-tileBlue rounded-md w-full h-full">
        <div class="flex relative">
          <div class="absolute text-textWhite text-xl mt-1 ml-2">
            Amount spent:
          </div>
          <p
            class="flex-col sm:flex-col text-textWhite text-md sm:text-md md:text-lg xl:text-2xl mx-auto my-auto"
          >
            <span
              id="totalAmountSpend"
              class="text-xl sm:text-xl md:text-2xl xl:text-5xl"
              >{totalSpend}</span
            >€
          </p>
        </div>
      </div>
      <div
        class=" grid bg-tileBlue rounded-md w-full h-full {upcomingMovies.length !=
        0
          ? 'hover:scale-105 duration-300'
          : ''}"
      >
        <div class="flex relative">
          <div class="absolute text-textWhite text-xl ml-2 mt-1">
            Upcoming movie:
          </div>
          {#if upcomingMovies.length !== 0}
            <button
              class="my-auto mx-2 flex"
              on:click={() => {
                goto("/tickets/" + upcomingMovies.Order.ID);
              }}
            >
              <img
                src={upcomingMovies.Movies[0].CoverPicURL}
                alt=""
                class="w-24 h-24 object-cover rounded-sm"
              />
              <div class="flex flex-col space-y-2 px-1 my-auto">
                <div class="break-words text-textWhite">
                  <p>
                    {upcomingMovies.Movies.length > 1
                      ? upcomingMovies.Event.Title
                      : upcomingMovies.Movies[0].Title}
                  </p>
                </div>
                <div class="break-words text-textWhite">
                  <p>{new Date(upcomingMovies.Event.Start).toLocaleString()}</p>
                </div>
              </div>
            </button>
          {:else}
            <p
              class="flex-col sm:flex-col text-textWhite text-md sm:text-md md:text-lg xl:text-2xl text-center my-auto"
            >
              You dont have any upcoming movies
            </p>
          {/if}
        </div>
      </div>
    </div>
    <hr class="h-px my-8 bg-textWhite border-0" />
    <!--   <div class="text-textWhite mb-4 text-xl">Your area</div>
 <div class="grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-5 h-max">
      <div class="grid bg-tileBlue rounded-md">
        <div class="flex flex-col">
          <div class="text-textWhite text-xl mt-1 ml-2">Change Username:</div>
          <form class="flex flex-col mx-auto mt-10 space-y-5">
            <input
              type="text"
              bind:value={currentUsername}
              class="bg-inputBlue text-textWhite rounded-lg placeholder:text-darkTextWhite w-full"
              placeholder="Current username"
            />
            <input
              type="text"
              id="nUsername"
              bind:value={nextUsername}
              class="flex bg-inputBlue text-textWhite rounded-lg placeholder:text-darkTextWhite w-full"
              placeholder="New username"
            />
            <button
              type="button"
              disabled={currentUsername !== username ||
                currentUsername.length === 0 ||
                nextUsername.length === 0}
              class="flex text-textWhite bg-buttonBlue px-4 py-2 rounded-md mx-auto hover:bg-green-500 duration-300 hover:disabled:bg-red-500"
              >Change</button
            >
          </form>
        </div>
      </div>
      <div class="grid bg-tileBlue rounded-md w-full h-full">
        <div class="flex flex-col">
          <div class="text-textWhite text-xl mt-1 ml-2 mb-1">Change email:</div>
          <form class="flex flex-col mx-auto mt-10 space-y-5 mb-1">
            <input
              type="email"
              bind:value={currentEmail}
              class="bg-inputBlue text-textWhite rounded-lg placeholder:text-darkTextWhite w-full"
              placeholder="Current email"
            />
            <input
              type="email"
              bind:value={nextEmail}
              class="flex bg-inputBlue text-textWhite rounded-lg placeholder:text-darkTextWhite w-full"
              placeholder="New email"
            />
            <button
              type="button"
              disabled={currentEmail !== email ||
                currentEmail.length === 0 ||
                nextEmail.length === 0}
              class="flex text-textWhite bg-buttonBlue px-4 py-2 rounded-md mx-auto hover:bg-green-500 duration-300 hover:disabled:bg-red-500"
              >Change</button
            >
          </form>
        </div>
      </div>
      <div class="grid bg-tileBlue rounded-md w-full h-full">
        <div class="flex flex-col">
          <div class="text-textWhite text-xl mt-1 ml-2">Change password:</div>
          <form class="flex flex-col mx-auto mt-10 space-y-5 mb-1">
            <input
              type="password"
              bind:value={currentPassword}
              class="bg-inputBlue text-textWhite rounded-lg placeholder:text-darkTextWhite w-full"
              placeholder="Current password"
            />
            <input
              type="password"
              bind:value={nextPassword}
              class="flex bg-inputBlue text-textWhite rounded-lg placeholder:text-darkTextWhite w-full"
              placeholder="New password"
            />
            <button
              type="button"
              disabled={currentPassword.length === 0 ||
                nextPassword.length === 0}
              class="flex text-textWhite bg-buttonBlue px-4 py-2 rounded-md mx-auto hover:bg-green-500 duration-300 hover:disabled:bg-red-500"
              >Change</button
            >
          </form>
        </div>
      </div>
      <div class="grid"></div>
      <div class="grid bg-tileBlue rounded-md w-full h-full">
        <button
          class="w-max h-max bg-red-500 mx-auto my-auto rounded-md px-4 py-2 text-black hover:bg-red-800 hover:text-textWhite duration-500"
          on:click={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              focusCancel: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              background: "#29313A",
              color: "#fff",
              confirmButtonText: "Yes, delete it!",

              footer:
                "<p class='text-textWhite hover:text-red-500 duration-300'>This action is irreversible</p>",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your account has been deleted.",
                  icon: "success",
                  color: "#fff",
                  background: "#29313A",
                }).then(() => {
                  goto("/");
                });
              }
            });
          }}>Delete your account</button
        >
      </div>
      <div class="grid"></div>
    </div>
    <hr class="h-px my-8 bg-textWhite border-0" />-->
    <div class="flex text-textWhite mb-4 text-xl justify-between">
      <p>Ticket history</p>
      {#key sorted}
        <button
          on:click={() => {
            if (!atLeastOneCheckBoxIsTrue()) return;
            Swal.fire({
              title: "Downloaded!",
              text: "Your invoice(s) has been downloaded.",
              icon: "success",
              color: "#fff",
              background: "#29313A",
            });
            for (let i = 0; i < checkBoxValues.length; i++) {
              checkBoxValues[i] = false;
              checkedAll = false;
            }
            // invoicetemplate.generateInvoice({
            //   date: new Date(ticketHistory[0].date).toLocaleDateString(),
            //   invoiceNumber: Math.floor(Math.random() * 1000000) + "",
            //   items: [
            //     {
            //       price:
            //         (
            //           ticketHistory[0].price /
            //           100 /
            //           ticketHistory[0].seats.length
            //         ).toFixed(2) + "€",
            //       quantity: ticketHistory[0].seats.length,
            //       description: "Movie ticket: " + ticketHistory[0].title,
            //     },
            //   ],
            //   total: (ticketHistory[0].price / 100).toFixed(2),
            // });
          }}
          class="bg-buttonBlue duration-300 px-2 py-1 rounded-lg {atLeastOneCheckBoxIsTrue()
            ? 'hover:bg-green-500'
            : 'hover:bg-red-500'} "
          >Print invoice{atLeastTwoCheckBoxIsTrue() ? "s" : ""}</button
        >
      {/key}
    </div>
    {#await ticketHistory then}
      {#key sorted}
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-textWhite">
            <thead class="text-xs text-textWhite uppercase bg-tileBlue">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      bind:checked={checkedAll}
                      on:click={() => {
                        for (let i = 0; i < checkBoxValues.length; i++) {
                          checkBoxValues[i] = !checkedAll;
                        }
                        checkedAll = !checkedAll;
                        sorted++;
                      }}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" class="sr-only"
                      >checkbox</label
                    >
                  </div>
                </th>
                <th scope="col" class="px-6 py-3"> Movietitle </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Cinema</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Seat(s)</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    Price
                    <button
                      on:click={() => {
                        sortHistory("price");
                        sorted++;
                      }}
                      ><svg
                        class="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                        />
                      </svg></button
                    >
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    Date
                    <button
                      on:click={() => {
                        sortHistory("date");
                        sorted++;
                      }}
                      ><svg
                        class="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                        />
                      </svg></button
                    >
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Details</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {#each ticketHistory as ticket, index}
                <tr
                  class="bg-headerBlue border-b text-textWhite hover:bg-inputBlue duration-300"
                >
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        bind:checked={checkBoxValues[index]}
                        on:change={() => sorted++}
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-search-1" class="sr-only"
                        >checkbox</label
                      >
                    </div>
                  </td>
                  <th scope="row" class="px-6 py-4 font-medium text-textWhite">
                    {ticket.Movies.length === 1
                      ? ticket.Movies[0].Title
                      : ticket.Event.Title}
                  </th>
                  <td class="px-6 py-4"> {ticket.Theatre.Name} </td>
                  <td class="px-6 py-4">
                    Row: {ticket.Tickets[0].Seat.VisibleRowNr}; Seat:
                    {#each ticket.Tickets as seats}
                      {#if seats.Seat.VisibleColumnNr === ticket.Tickets[ticket.Tickets.length - 1].Seat.VisibleColumnNr}
                        {seats.Seat.VisibleColumnNr}
                      {:else}
                        {seats.Seat.VisibleColumnNr},&nbsp;
                      {/if}
                    {/each}
                  </td>
                  <td class="px-6 py-4">
                    {(ticket.Order.Totalprice / 100).toFixed(2)}€
                  </td>
                  <td class="px-6 py-4">
                    {new Date(ticket.Event.Start).toLocaleString()}
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button
                      on:click={() => {
                        Swal.fire({
                          title:
                            ticket.Movies.length > 1
                              ? ticket.Title
                              : ticket.Movies[0].Title,
                          text: `Payed: ${ticket.Order.IsPaid ? "Yes" : "No"}`,
                          icon: "info",
                          color: "#fff",
                          background: "#29313A",
                        });
                      }}
                      class="font-medium text-textWhite hover:underline hover:text-tileBlue duration-300 cursor-pointer"
                      >Details</button
                    >
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/key}
    {/await}
  </div>

  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div
    class="hidden fastforward absolute left-1/2 -translate-x-1/2 top-1/4"
    id="ff"
  >
    <div class="arrow" style="--i:0"></div>
    <div class="arrow" style="--i:0"></div>
    <div class="arrow" style="--i:0"></div>
  </div>
</div>

<style>
  .fastforward .arrow {
    width: 30px;
    height: 30px;
    background: #f0f0f0;
    margin: 0 2px;
    clip-path: polygon(0 0, 0% 100%, 100% 50%);
    opacity: 0;
    animation: fadeInOut 1.25s ease-in-out infinite;
  }

  .fastforward .arrow:nth-child(2) {
    animation-delay: 0.1s;
  }

  .fastforward .arrow:nth-child(3) {
    animation-delay: 0.2s;
  }

  @keyframes fadeInOut {
    0%,
    40%,
    100% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
  }
</style>
