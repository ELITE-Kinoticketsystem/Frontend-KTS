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
    let backCamera = 1;
    let frontCamera = 0;
    let isTicketPayed;
    let isTicketNotPayed;

    $: codeNotFound = false;
    $: isUsed = "";
    $: ticketAlreadyUsed = false;
    $: isNotFound = "";


    // $: ticketDetailsInput = "";
    // $: ticketDetailsScanned = "";
    $: ticketDetails = "";

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
        manualInput = true;
        ticketQrcodeMaually = event.target.value;
    }

    function onScanSuccess(decodedText, decodedResult) {
        //alert(`Code matched = ${decodedText}`)
        showData(decodedText);
        console.log(decodedResult);
        html5Qrcode.pause()
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

<style>
    main {
        background-color: #2A313A;
        width: 800px;
        height: 90%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-left: 33%;
    }
    reader {
        background-color: black;
        width: 100%;
    }
    container{
        background-color: black;
        width: 100%;
    }

    button {
        background-color: cadetblue;
        color: black;
        padding: 5px 20px 5px 20px;
    }

    div{
        color: white;
    }

</style>

<main>
    <reader id="reader" />
    {#if codeNotFound}
        <h1 style="color: white">Error</h1>
        <h3 style="color: white">The given Code was NOT found.</h3>
        <Invalid />
        <button     action="action"
                    onclick="window.history.go(0); return false;"
                    type="submit">Try again </button>
    {:else if ticketAlreadyUsed}
        <h1 style="color: white">Error</h1>
        <h3 style="color: white">The given Code was ALREADY used.</h3>
        <Invalid />
        <button     action="action"
                    onclick="window.history.go(0); return false;"
                    type="submit">Try again </button>
    {:else}
        {#if scanning}
            <div id="container">
                <div style="font-size: 20px"> Ticket Information </div>
                {@html ticketDetails}
                {#if isTicketPayed}
                <Valid />
                {:else if isTicketNotPayed}
                    <Invalid />
                {/if}

            </div>

            <button on:click={stop}>Stop Scanning</button>
            <button on:click={nextTicket}>Next Ticket</button>

        {:else}
            <button on:click={start}>Start Scanning</button>
            <label for="manual"> <input placeholder="Type QRCode manually..." id = "manual" type = 'text' on:input={manual} style="width: 210px"> <button id="manual" on:click={showData}>Check</button></label>
            <div id="container">
                <div style="font-size: 20px"> Ticket Information </div>
                {@html ticketDetails}
                {#if isTicketPayed}
                    <Valid />
                {:else if isTicketNotPayed}
                    <Invalid />
                {/if}
            </div>
        {/if}
    {/if}
</main>