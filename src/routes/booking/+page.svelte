<script lang="ts">
  import { browser } from "$app/environment";
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

  export let data;

  const eventInformation: any = data.eventInformation;
  const tickets: any = data.eventTickets;

  $: totalCost = tickets.reduce((acc: number, ticket: any) => {
    return acc + ticket.price;
  }, 0);
</script>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div
    class="flex flex-col w-max flex-grow space-x-5 bg-tileBlue px-10 py-10 rounded-2xl space-y-5"
  >
    <div class="mx-auto text-textWhite text-2xl font-semibold">Payment</div>
    <div class="flex flex-row justify-between">
      <div class="w-1/3 justify-start">
        <img
          src={eventInformation.movieImg}
          alt=""
          class="w-full h-full object-cover rounded-sm"
          use:lazyImage
        />
      </div>
      <div class="flex flex-col w-2/3 text-right text-textWhite text-xl">
        <p>{eventInformation.movieTitle}</p>
        <p>{eventInformation.location}</p>
        <p>{new Date(eventInformation.dateTime).toLocaleString()}</p>
        <p>
          Row {tickets[0].y}: Seat
          {#each tickets as ticket, index}
            {#if index === tickets.length - 1}
              {ticket.x}
            {:else}
              {ticket.x},&nbsp;
            {/if}
          {/each}
        </p>
        <p>{(totalCost / 100).toFixed(2)} €</p>
        <p>{eventInformation.cinema}</p>
        <p>{eventInformation.type}</p>
        <p class="text-buttonBlue mt-10 ml-10 text-justify">
          Please note that the next step is the payment step and by completing
          it, you will be purchasing the ticket at the cost of {(
            totalCost / 100
          ).toFixed(2)} €.
        </p>
      </div>
    </div>
    <div class="flex w-full">
      <button
        class="text-textWhite py-3 w-1/2 bg-buttonBlue hover:bg-green-500 duration-300 mx-auto rounded-md"
        on:click={() => {
          if (browser) {
            goto("/tickets/" + tickets[0].ticketId);
          }
        }}>Pay</button
      >
    </div>
  </div>
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
