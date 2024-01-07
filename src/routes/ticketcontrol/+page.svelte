<script>
    import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'
    import Invalid from "./invalid.svelte"
    import Valid from "./valid.svelte"


    let scanning = false;
    let html5Qrcode;
    let ticketQrcodeMaually;
    let isValid="";
    let manualInput;
    let isScanning;
    let backCamera = 1;
    let frontCamera = 0;
    let isTicketPayed;
    let isTicketNotPayed;

    $: codeNotFound = false;
    $: isUsed = "";
    $: ticketAlreadyUsed = false;
    $: isNotFound = "";
    $: isPayed = "";
    $: ticketDetails = "";

    // $: ticketDetailsInput = "";
    // $: ticketDetailsScanned = "";


    onMount(init);

    async function init() {
        html5Qrcode = new Html5Qrcode('reader')
        getCameras();
    }

    function getCameras(){
        html5Qrcode.getCameras().then(devices => {
            if(devices && devices.length){
                cameraId = devices[backCamera].id;
            }
        }).catch(error => {
            alert(error);
        })
    }
    function start() {
        isValid = "";
        ticketDetails = "";
        html5Qrcode.start(
            {facingMode: 'environment'},
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            onScanSuccess,
            onScanFailure
        )
        scanning = true;
    }

    async function stop() {
        isValid = "";
        ticketDetails = "";
        html5Qrcode.stop();
        scanning = false;
    }

    function nextTicket(){
        html5Qrcode.resume()
    }

    function manual(event){
        isScanning = false;
        ticketQrcodeMaually = event.target.value;
    }

    function onScanSuccess(decodedText, decodedResult) {
        isScanning = true;
        showData(decodedText);
        console.log(decodedResult);
        html5Qrcode.pause();
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }

    async function getTicket(){
        const ticketData = await fetch("https://657cb0cd853beeefdb99d741.mockapi.io/tickets", { mode : "cors"});
        return ticketData.json();
    }

    async function showData(decodedText){
        let ticket;
        codeNotFound = true;


        await getTicket().then((tickets) =>{
            for(let i=0; i<tickets.length; i++){
                if((tickets[i].qrcode === ticketQrcodeMaually) || (tickets[i].qrcode === decodedText)){
                    ticket = tickets[i];
                    codeNotFound = false;
                    break;
                }
            }

            ticketAlreadyUsed = ticket.isused;
            const color = ticket.payed ? "green" : "red";
            isTicketPayed = ticket.payed ? true : false;
            isTicketNotPayed = ticket.payed ? false : true;

            if(!codeNotFound && (!ticketAlreadyUsed || manualInput)) {

                ticketDetails = `
                      <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; justify-content: space-between;">
                          <span>MovieTitle:</span>
                          <span>${ticket.movieTitle}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Theater:</span>
                          <span>${ticket.theater}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>ShowTime:</span>
                          <span>${ticket.showtime}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Payed:</span>
                          <span style="color: ${color}">${ticket.payed}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                          <span>Amount:</span>
                          <span>${ticket.amount}</span>
                        </div>
                      </div>
                    `;

            } else {
                ticketDetails = "";
            }

        })
    }

</script>

<div class="bg-gray-800 max-w-lg w-full h-9/10 text-center flex flex-col items-center justify-center space-y-5">
    <div id="reader" class="bg-black w-full"></div>
    {#if codeNotFound}
        <h1 class="text-white">Error</h1>
        <h3 class="text-white">The given Code was NOT found.</h3>
        <Invalid />
        <button class="bg-buttonBlue hover:bg-tileBlue duration-300 px-4 py-2"
                onclick="window.history.go(0); return false;"
                type="submit">Try again </button>
    {:else if ticketAlreadyUsed}
        <h1 class="text-white">Error</h1>
        <h3 class="text-white">The given Code was ALREADY used.</h3>
        <Invalid />
        <button class="bg-buttonBlue hover:bg-tileBlue duration-300 px-4 py-2"
                onclick="window.history.go(0); return false;"
                type="submit">Try again </button>
    {:else}
        {#if scanning}
            <div id="container" class="text-white text-xl">
                Ticket Information
                {@html ticketDetails}
                {#if isTicketPayed && isScanning}
                    <Valid />
                {:else if isTicketNotPayed && isScanning}
                    <Invalid />
                {/if}
            </div>
            <button class="bg-buttonBlue hover:bg-tileBlue duration-300 px-4 py-2" on:click={stop}>Stop Scanning</button>
            <button class="bg-buttonBlue hover:bg-tileBlue duration-300 px-4 py-2" on:click={nextTicket}>Next Ticket</button>
        {:else}
            <button class="bg-buttonBlue hover:bg-tileBlue duration-300 px-4 py-2" on:click={start}>Start Scanning</button>
            <label for="manual">
                <input placeholder="Type QRCode manually..." id="manual" type="text" on:input={manual} class="w-52">
                <button id="manual" class="bg-buttonBlue hover:bg-tileBlue duration-300 px-4 py-2" on:click={showData}>Check</button>
            </label>
            <div id="container" class="text-white text-xl">
                Ticket Information
                {@html ticketDetails}
                {#if isTicketPayed && !isScanning}
                    <Valid />
                {:else if isTicketNotPayed && !isScanning}
                    <Invalid />
                {/if}
            </div>
        {/if}
    {/if}
</div>

