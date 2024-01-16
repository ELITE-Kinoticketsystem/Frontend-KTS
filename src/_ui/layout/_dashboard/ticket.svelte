<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { onMount } from "svelte";

  onMount(async () => {});

  let orders: any[] = [];
  let copiedOrder: any[] = [];

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
    copiedOrder = JSON.parse(JSON.stringify(orders));
  });
  let limit = 5;
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
        {#each copiedOrder.splice(limit * currentSite, limit * currentSite + limit) as order}
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
              Row: {order.Tickets[0].Seat.VisibleRowNr}; Seat:
              {#each order.Tickets as seats}
                {#if seats.Seat.VisibleColumnNr === order.Tickets[order.Tickets.length - 1].Seat.VisibleColumnNr}
                  {seats.Seat.VisibleColumnNr}
                {:else}
                  {seats.Seat.VisibleColumnNr},&nbsp;
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
              <a href="#" class="font-medium text-blue-600 duration-300"
                >Cancel</a
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="mx-auto mt-2">
    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-sm">
        <li>
          <button
            on:click={() => {
              if (currentSite > 0) {
                copiedOrder = JSON.parse(JSON.stringify(orders));
                currentSite = currentSite - 1;
              }
            }}
            class="flex items-center justify-center px-3 h-8 leading-tight rounded-l-md text-textWhite bg-headerBlue border border-buttonBlue duration-300 {currentSite ===
            0
              ? 'opacity-50 cursor-not-allowed '
              : 'hover:bg-buttonBlue '}">Prev</button
          >
        </li>
        {#each { length: orders.length % limit } as _, index}
          <li>
            <button
              on:click={() => {
                copiedOrder = JSON.parse(JSON.stringify(orders));
                currentSite = index;
              }}
              class="flex items-center justify-center px-3 h-8 leading-tight text-textWhite bg-headerBlue border border-buttonBlue hover:bg-buttonBlue duration-300"
              >{index + 1}</button
            >
          </li>
        {/each}
        <li>
          <button
            on:click={() => {
              if (currentSite < (orders.length % limit) - 1) {
                copiedOrder = JSON.parse(JSON.stringify(orders));
                currentSite = currentSite + 1;
              }
            }}
            class="flex items-center justify-center px-3 h-8 leading-tight rounded-r-md text-textWhite bg-headerBlue border border-buttonBlue duration-300 {currentSite >=
            (orders.length % limit) - 1
              ? 'opacity-50 cursor-not-allowed '
              : 'hover:bg-buttonBlue '}">Next</button
          >
        </li>
      </ul>
    </nav>
  </div>
</div>
<div class="text-textWhite font-semibold flex flex-row space-x-5">
  <div class="">
    {limit * currentSite}
  </div>
  <div class="">{limit * currentSite + 5}</div>
</div>
