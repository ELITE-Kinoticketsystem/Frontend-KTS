<script lang="ts">
  import { onMount } from "svelte";
  export let data;

  const ticketIds: any | unknown[] = data.tickets;

  let qrCodeString = "";
  for (let i = 0; i < ticketIds.length; i++) {
    if (i === ticketIds.length - 1) {
      qrCodeString += ticketIds[i];
    } else {
      qrCodeString += ticketIds[i] + ";";
    }
  }

  let qrCode = "";

  onMount(() => {
    qrCode = "https://api.qrserver.com/v1/create-qr-code/?data=" + qrCodeString;
  });
</script>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col flex-grow w-full mx-auto bg-tileBlue">
    <div class="flex flex-col w-max mx-auto">
      <p class="text-4xl text-textWhite font-bold mx-auto mt-2">CINEMIKA</p>
      <p class="text-2xl text-textWhite font-semibold mx-auto mt-5">
        Your ticket
      </p>
      <img src={qrCode} alt="" class="w-auto h-auto mt-10" />
    </div>
    <div class="flex space-x-5 mx-auto my-5">
      <button class="bg-buttonBlue">Add to apple wallet</button>
      <button class="bg-buttonBlue">Add to google wallet</button>
    </div>
  </div>
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
