<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  let orders: any[] = [];

  let currentSite = 0;
  $: currentSite = currentSite;

  async function getOrders() {
    const orderResponse = await fetch(apiUrl + "/orders", {
      credentials: "include",
      method: "GET",
      mode: "cors",
    });
    const orderJson = await orderResponse.json();

    if (!orderResponse.ok) {
      return [];
    }
    return orderJson;
  }
  onMount(async () => {
    orders = await getOrders();
  });

  function deepCopy(array: any[]) {
    return [...array];
  }
  const limit = 5;

  function showQRCode(order: any) {
    let title =
      order.Movies.length > 1 ? order.Event.Title : order.Movies[0].Title;
    Swal.fire({
      title: title + " QR-Code",
      confirmButtonText: "OK",
      html: `<img src=https://api.qrserver.com/v1/create-qr-code/?data="${order.Order.ID}" alt="QR-Code" class='flex mx-auto' />`,
      confirmButtonColor: "#888888",
      color: "#FAFAFA",
      customClass: {
        input: "rounded-md bg-backgroundBlue text-textWhite",
        title: "text-textWhite bg-backgroundBlue",
        popup: "bg-backgroundBlue",
      },
    });
  }
</script>

<div class="flex flex-col">
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto mt-5 w-full"
  >
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <caption
        class="p-5 text-lg font-semibold text-left rtl:text-right text-textWhite bg-tileBlue"
      >
        Your tickets
        <p class="mt-1 text-sm font-normal text-textWhite">
          Browse a list of your latest cinema tickets. You can cancel the
          tickets or just have a look at them.
        </p>
      </caption>
      <thead class="text-xs text-textWhite uppercase bg-headerBlue">
        <tr>
          <th scope="col" class="px-6 py-3"> Event </th>
          <th scope="col" class="px-6 py-3"> Theatre </th>
          <th scope="col" class="px-6 py-3"> Seat(s) </th>
          <th scope="col" class="px-6 py-3"> Price </th>
          <th scope="col" class="px-6 py-3"> Date </th>
          <th scope="col" class="px-6 py-3">
            Action
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each deepCopy(orders).splice(limit * currentSite, limit) as order, i}
          <tr class="bg-buttonBlue border-b text-textWhite">
            <th
              scope="row"
              class="px-6 py-4 font-semibold text-textWhite whitespace-nowrap"
            >
              {order.Movies.length > 1
                ? order.Event.Title
                : order.Movies[0].Title}
            </th>
            <td class="px-6 py-4"> {order.Theatre.Name} </td>
            <td class="px-6 py-4">
              Row: {order.Tickets[0].Seat.RowNr}; Seat:
              {#each order.Tickets as seats}
                {#if seats.Seat.ColumnNr === order.Tickets[order.Tickets.length - 1].Seat.ColumnNr}
                  {seats.Seat.ColumnNr}
                {:else}
                  {seats.Seat.ColumnNr},&nbsp;
                {/if}
              {/each}
            </td>
            <td class="px-6 py-4">
              {(order.Order.Totalprice / 100).toFixed(2)}€
            </td>
            <td class="px-6 py-4">
              {new Date(order.Event.Start).toLocaleString()}
            </td>
            <td class="px-6 py-4">
              <button
                class="font-medium text-blue-800 hover:text-textWhite duration-300"
                on:click={() => showQRCode(order)}
                >{new Date(order.Event.Start).getTime() > new Date().getTime()
                  ? "Ticket"
                  : "Info"}</button
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="mx-auto mt-4">
    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-sm">
        <li>
          <button
            on:click={() => {
              if (currentSite > 0) {
                currentSite = currentSite - 1;
              }
            }}
            class="flex items-center justify-center px-3 h-8 leading-tight rounded-l-md text-textWhite bg-headerBlue border border-buttonBlue duration-300 {currentSite ===
            0
              ? 'opacity-50 cursor-not-allowed '
              : 'hover:bg-buttonBlue '}">Prev</button
          >
        </li>
        {#each { length: Math.ceil(orders.length / limit) } as _, index}
          <li>
            <button
              on:click={() => {
                currentSite = index;
              }}
              class="flex items-center justify-center px-3 h-8 leading-tight text-textWhite border border-buttonBlue hover:bg-buttonBlue duration-300
              {currentSite === index ? 'bg-tileBlue' : 'bg-headerBlue'}"
              >{index + 1}</button
            >
          </li>
        {/each}
        <li>
          <button
            on:click={() => {
              if (currentSite < Math.ceil(orders.length / limit) - 1) {
                currentSite = currentSite + 1;
              }
            }}
            class="flex items-center justify-center px-3 h-8 leading-tight rounded-r-md text-textWhite bg-headerBlue border border-buttonBlue duration-300 {currentSite >=
            Math.ceil(orders.length / limit) - 1
              ? 'opacity-50 cursor-not-allowed '
              : 'hover:bg-buttonBlue '}">Next</button
          >
        </li>
      </ul>
    </nav>
  </div>
</div>
