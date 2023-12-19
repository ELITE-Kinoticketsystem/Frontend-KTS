<script>
    import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'

    let scanning = false;

    let html5Qrcode;
    let cameraId;
    let mauallInput = false;
    let ticketQrcodeMaually;

    $: movieTitle = "";
    $: theater = "";
    $: showTime = "";
    $: payed = "";
    $: amount = ""

    onMount(init);

    async function init() {
        html5Qrcode = new Html5Qrcode('reader')
        getCameras();
    }

    function getCameras(){
        html5Qrcode.getCameras().then(devices => {
            if(devices && devices.length){
                cameraId = devices[1].id;
            }
        }).catch(error => {
            alert(error);
        })
    }
    function start() {
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
        html5Qrcode.stop();
        scanning = false;
    }

    function nextTicket(){
        html5Qrcode.resume()
    }

    function manual(event){
        mauallInput = true;
        ticketQrcodeMaually = event.target.value;
    }

    function onScanSuccess(decodedText, decodedResult) {
        //alert(`Code matched = ${decodedText}`)
        if(mauallInput){
            showData();
        }else{
            fetchData(decodedText);
        }
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
    async function fetchData(decodedText){

        const url = new URL('https://657cb0cd853beeefdb99d741.mockapi.io/tickets');
        const decodedTextToString = decodedText.toString();
        // url.searchParams.append('qrcode', decodedTextToString);
        //console.log("URL", url);
        //console.log("DecodedText", decodedText);
        //console.log("DecodedToString", decodedTextToString);
        let ticket;

        await getTicket().then((tickets) =>{
            let ticketArray = tickets
            for(let i=0; i<ticketArray.length; i++){
                if(ticketArray[i].qrcode === decodedTextToString){
                    ticket = ticketArray[i];
                }
            }

                    movieTitle = `<div>MovieTitle: ${ticket.movieTitle}</div>`;
                    theater = `<div>Theater: ${ticket.theater}</div>`;
                    showTime = `<div>ShowTime: ${ticket.showtime}</div>`;
                    payed = `<div>Payed: ${ticket.payed}</div>`;
                    amount = `<div>Amount: ${ticket.amount}</div>`;

            /*
            const qrCodeTicket = ticketArray.filter((ticket) =>{
                ticket.qrcode = decodedText
            })
            console.log(qrCodeTicket.movieTitle);
            console.log(qrCodeTicket.theater);
            console.log(qrCodeTicket.qrcode);
*/
        })
    }

   async function showData(){
        let ticket;

        await getTicket().then((tickets) =>{
            let ticketArray = tickets
            for(let i=0; i<ticketArray.length; i++){
                if(ticketArray[i].qrcode === ticketQrcodeMaually){
                    ticket = ticketArray[i];
                }
            }

            movieTitle = `<div>MovieTitle: ${ticket.movieTitle}</div>`;
            theater = `<div>Theater: ${ticket.theater}</div>`;
            showTime = `<div>ShowTime: ${ticket.showtime}</div>`;
            payed = `<div>Payed: ${ticket.payed}</div>`;
            amount = `<div>Amount: ${ticket.amount}</div>`;

            /*
            const qrCodeTicket = ticketArray.filter((ticket) =>{
                ticket.qrcode = decodedText
            })
            console.log(qrCodeTicket.movieTitle);
            console.log(qrCodeTicket.theater);
            console.log(qrCodeTicket.qrcode);
*/
        })
    }

</script>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
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

    {#if scanning}
        <div id="container1">
            {@html movieTitle}
            {@html theater}
            {@html showTime}
            {@html payed}
            {@html amount}
        </div>

        <button on:click={stop}>Stop Scanning</button>
        <button on:click={nextTicket}>Next Ticket</button>

    {:else}
        <button on:click={start}>Start Scanning</button>
        <label for="manual"> <input placeholder="Type QRCode manually..." id = "manual" type = 'text' on:input={manual} style="width: 210px"> <button id="manual" on:click={showData}>Check</button></label>
        <div id="container2">
            {@html movieTitle}
            {@html theater}
            {@html showTime}
            {@html payed}
            {@html amount}
        </div>
    {/if}
</main>