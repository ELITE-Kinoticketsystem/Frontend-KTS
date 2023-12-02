<script lang="ts">
  import { browser, dev } from "$app/environment";
  import { AuthService } from "$lib/_services/authService";
  import { SessionStatus } from "$lib/statusEnums";
  import "chart.js/auto";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";
  import { InvoiceTemplate } from "$lib/invoice";

  const invoicetemplate = new InvoiceTemplate();
  const authService = new AuthService();
  const isLoggedIn = authService.isUserLoggedIn();

  export let data;
  let ticketHistory = data.tickets || [];

  if (browser) {
    if (!isLoggedIn) {
      if (false) {
        window.location.href =
          "/auth/login?sessionStatus=" + SessionStatus.EXPIRED;
      } else {
        window.location.href =
          "/auth/login?sessionStatus=" + SessionStatus.NOT_LOGGED_IN;
      }
    }
  }
  const username = "John Doe";
  const email = "john.doe@cinemika.com";

  function getGreetings() {
    const time = new Date();
    if (time.getHours() < 12) return "Good Morning";
    else if (time.getHours() < 18) return "Good Afternoon";
    else return "Good Evening";
  }

  $: visitedMovies = ticketHistory.length;
  let totalSpend = 0;
  ticketHistory.forEach((ticket) => {
    totalSpend += ticket.price;
  });
  $: upcomingFavorite = "You dont have any upcoming favorites";

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
  onMount(() => {
    if (browser)
      animateValue(
        document.getElementById("visitedMovies"),
        0,
        visitedMovies,
        3500
      );
    animateValue(
      document.getElementById("totalAmountSpend"),
      0,
      totalSpend,
      2000
    );
  });

  $: sorted = 0;
  function sortHistory(type: string) {
    if (type === "date") {
      if (sorted % 2 === 0) {
        ticketHistory.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      } else {
        ticketHistory.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      }
    } else if (type === "price") {
      if (sorted % 2 === 0) {
        ticketHistory.sort((a, b) => {
          return a.price - b.price;
        });
      } else {
        ticketHistory.sort((a, b) => {
          return b.price - a.price;
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
</script>

<head:svelte>
  <title>{username}'s Dashboard</title>
</head:svelte>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col max-w-full">
    <div class="text-textWhite my-4 text-xl">{getGreetings()}, {username}</div>
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
      <div class="grid bg-tileBlue rounded-md w-full h-full">
        <div class="flex relative">
          <div class="absolute text-textWhite text-xl ml-2 mt-1">
            Upcoming favorite:
          </div>
          <p
            class="flex-col sm:flex-col text-textWhite text-md sm:text-md md:text-lg xl:text-2xl text-center my-auto"
          >
            {upcomingFavorite}
          </p>
        </div>
      </div>
    </div>
    <hr class="h-px my-8 bg-textWhite border-0" />
    <div class="text-textWhite mb-4 text-xl">Your area</div>
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
      <div class="grid col-span-3 bg-tileBlue rounded-md w-full h-full">
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
                  window.location.href = "/";
                });
              }
            });
          }}>Delete your account</button
        >
      </div>
    </div>
    <hr class="h-px my-8 bg-textWhite border-0" />
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
            invoicetemplate.generateInvoice({
              date: new Date(ticketHistory[0].date).toLocaleDateString(),
              invoiceNumber: Math.floor(Math.random() * 1000000) + "",
              items: [
                {
                  price:
                    (
                      ticketHistory[0].price /
                      100 /
                      ticketHistory[0].seats.length
                    ).toFixed(2) + "€",
                  quantity: ticketHistory[0].seats.length,
                  description: "Movie ticket: " + ticketHistory[0].title,
                },
              ],
              total: (ticketHistory[0].price / 100).toFixed(2),
            });
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
                  <div class="flex items-center">Seat</div>
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
                    {ticket.title}
                  </th>
                  <td class="px-6 py-4"> {ticket.theatre} </td>
                  <td class="px-6 py-4"> {ticket.seats} </td>
                  <td class="px-6 py-4">
                    {(ticket.price / 100).toFixed(2)}€
                  </td>
                  <td class="px-6 py-4">
                    {new Date(ticket.date).toLocaleDateString()}
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button
                      on:click={() => {
                        Swal.fire({
                          title: ticket.title,
                          text: "More information....",
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
</div>
