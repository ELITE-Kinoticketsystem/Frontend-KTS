<script lang="ts">
    import { apiUrl } from "$lib/_services/authService";
    import { fire } from "$lib/swalTemplate";
    import { Html5Qrcode } from "html5-qrcode";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let html5Qrcode: any;
    let orderIdInput = "";

    let isPaused = false;

    let ticketWasFound = false;

    let foundOrder = null;

    onMount(() => {
        html5Qrcode = new Html5Qrcode("reader");
        startScanning();
        document.getElementById("orderId")!.focus();
    });

    function startScanning() {
        html5Qrcode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            onScanSuccess,
            onScanFailure
        );
    }
    function stopScanning() {
        html5Qrcode.stop();
    }

    function resumeScanning() {
        ticketWasFound = false;
        isPaused = false;
        html5Qrcode.resume();
    }

    async function fetchOrder(orderId: any) {
        let ok = false;
        const orderResponse = await fetch(apiUrl + "/orders/" + orderId, {
            method: "GET",
            credentials: "include",
            mode: "cors",
        });
        const order = await orderResponse.json();
        if (!orderResponse.ok) {
            foundOrder = null;
        } else {
            ok = true;
        }
        fire("Fetching ticket...", 1500);
        setTimeout(() => {
            ticketWasFound = true;
            if (ok) foundOrder = order;
        }, 1000);
    }

    function onScanSuccess(decodedText: any, decodedResult: any) {
        fetchOrder(decodedText);
        isPaused = true;
        html5Qrcode.pause();
    }

    async function getType(priceCategoryID: any) {
        const priceCategoryResponse = await fetch(
            apiUrl + "/price-categories/" + priceCategoryID,
            {
                method: "GET",
                credentials: "include",
                mode: "cors",
            }
        );
        const priceCategory = await priceCategoryResponse.json();
        return priceCategory.CategoryName;
    }

    let updatedTicket = 0;

    async function validateTicket(ticket: any) {
        const ticketRepsonse = await fetch(apiUrl + "/tickets/" + ticket.ID, {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
        });
        if (!ticketRepsonse.ok) {
            fire("Ticket could not be validated", 1500);
            return;
        } else {
            fire("Ticket validated", 1500);
            ticket.Validated = true;
            updatedTicket++;
        }
    }
    function onScanFailure(error: any) {}
</script>

<div class="flex flex-row mx-10">
    <div class=" bg-tileBlue px-5 py-5 rounded-md mx-auto">
        <div id="reader" class="rounded-lg mx-auto"></div>
        <div class="text-justify mt-5">
            <div class="text-textWhite text-center text-lg">
                Here you can scan a ticket.
            </div>
            <div class="text-textWhite text-center text-lg">
                Should the camera not work, you can also type in the order-id
            </div>
            <div class="flex text-center w-full space-x-5 mt-5">
                <input
                        type="text"
                        name=""
                        bind:value={orderIdInput}
                        on:keydown={(e) => {
            if (e.key === "Enter") {
              fetchOrder(orderIdInput);
            }
          }}
                        id="orderId"
                        placeholder="Order-ID"
                        class="text-white bg-headerBlue hover:bg-buttonBlue duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                />
                <button
                        class="bg-buttonBlue px-4 py-2 rounded-md text-textWhite duration-300 {orderIdInput.length ==
          0
            ? 'opacity-50 cursor-not-allowed'
            : ''}"
                        on:click={() => {
            fetchOrder(orderIdInput);
          }}>Check</button
                >
            </div>

            <div class="text-center mt-5">
                <button
                        class="bg-buttonBlue px-4 py-2 rounded-md text-textWhite duration-300 {!isPaused
            ? 'opacity-50 cursor-not-allowed'
            : ''}"
                        on:click={resumeScanning}>Resume</button
                >
            </div>
        </div>
    </div>
    {#key ticketWasFound}
        <div
                class="bg-tileBlue px-5 py-5 rounded-md w-full ml-5 my-auto {ticketWasFound
        ? 'block'
        : 'hidden'}"
                transition:fade
        >
            <div class="text-textWhite text-center font-semibold text-2xl">
                Ticket Information
            </div>
            {#if foundOrder === null}
                <div
                        class="text-red-500 underline underline-offset-2 mt-5 text-center font-bold text-2xl"
                >
                    The given ticket was <b>not</b> found.
                    <img
                            src="https://i.ibb.co/Q8v1SH3/360-F-616177772-b-EXNr996-NEm-Dli-BSma3d-RNlood-TYR3c-N-removebg-preview.png"
                            alt="INVALID"
                            class="mx-auto w-1/2 h-1/2"
                    />
                </div>
            {:else}
                <div
                        class="text-green-500 underline underline-offset-2 mt-5 text-center font-bold text-2xl"
                >
                    The given ticket was <b>valid</b>.
                </div>
                <div class="">
                    <div class="text-textWhite font-semibold text-lg">
                        Cinema Hall: {foundOrder.CinemaHall.Name}
                    </div>
                    <div class="text-textWhite font-semibold text-lg">
                        Event Title: {foundOrder.Movies.length > 0
                        ? foundOrder.Event.Title
                        : foundOrder.Movies[0].Title}
                    </div>
                    <div class="text-textWhite font-semibold text-lg">
                        Start Time: {new Date(foundOrder.Event.Start).toLocaleString()}
                    </div>
                    <div class="text-textWhite font-semibold text-lg">
                        3D: {foundOrder.Is3d ? "Yes" : "No"}
                    </div>
                    <div class="">
                        <div class="relative overflow-x-auto">
                            <table class="w-max text-sm text-left text-textWhite mx-auto">
                                <thead class="text-xs text-textWhite uppercase bg-headerBlue">
                                <tr>
                                    <th scope="col" class="px-6 py-3"> Type </th>
                                    <th scope="col" class="px-6 py-3"> Validate </th>
                                </tr>
                                </thead>
                                <tbody>
                                {#each foundOrder.Tickets as ticket}
                                    <tr
                                            class="bg-buttonBlue border-b text-textWhite duration-300"
                                    >
                                        <th
                                                scope="row"
                                                class="px-6 py-4 font-medium whitespace-nowrap text-white capitalize"
                                        >
                                            {#await getType(ticket.Ticket.PriceCategoryID) then type}
                                                {type}
                                            {/await}
                                        </th>
                                        <td class="px-6 py-4">
                                            {#key updatedTicket}
                                                {#if !ticket.Ticket.Validated}
                                                    <button
                                                            class="bg-tileBlue px-4 py-2 rounded-md text-textWhite duration-300"
                                                            on:click={() => {
                                validateTicket(ticket.Ticket);
                              }}>Validate</button
                                                    >
                                                {:else}
                                                    <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="1.5"
                                                            stroke="currentColor"
                                                            class="w-6 h-6 text-green-500"
                                                    >
                                                        <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                {/if}
                                            {/key}
                                        </td>
                                    </tr>
                                {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    {/key}
</div>
