<script>
    import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'

    let scanning = false;

    let html5Qrcode;
    let cameraId;
    let manuel_input = false;
    let ticketQrcodeMauelly;

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
            {deviceId: {exact: cameraId}},
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
        html5Qrcode.stop()
        scanning = false;
    }

    function nextTicket(){
        html5Qrcode.resume()
    }

    function manuel(event){
        manuel_input = true;
        ticketQrcodeMauelly = event.target.value;
    }

    function onScanSuccess(decodedText, decodedResult) {
        //alert(`Code matched = ${decodedText}`)
        if(manuel_input){
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

                    const movieTitle = `<div>MovieTitle:  ${ticket.movieTitle}</div>`;
                    const theater = `<div>Teather: ${ticket.theater}</div>`;
                    const showtime = `<div>Showtime: ${ticket.showtime}</div>`;
                    const payed = `<div>Payed: ${ticket.payed}</div>`;
                    const amount = `<div>Amount: ${ticket.amount}</div>`;

                    let container = document.getElementById('container1');

                    container.innerHTML = '';
                    container.insertAdjacentHTML('beforeend', movieTitle);
                    container.insertAdjacentHTML('beforeend', theater);
                    container.insertAdjacentHTML('beforeend', showtime);
                    container.insertAdjacentHTML('beforeend', payed);
                    container.insertAdjacentHTML('beforeend', amount);

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
                if(ticketArray[i].qrcode === ticketQrcodeMauelly){
                    ticket = ticketArray[i];
                }
            }

            const movieTitle = `<div>MovieTitle:  ${ticket.movieTitle}</div>`;
            const theater = `<div>Teather: ${ticket.theater}</div>`;
            const showtime = `<div>Showtime: ${ticket.showtime}</div>`;
            const payed = `<div>Payed: ${ticket.payed}</div>`;
            const amount = `<div>Amount: ${ticket.amount}</div>`;

            let container = document.getElementById('container2');

            container.innerHTML = '';
            container.insertAdjacentHTML('beforeend', movieTitle);
            container.insertAdjacentHTML('beforeend', theater);
            container.insertAdjacentHTML('beforeend', showtime);
            container.insertAdjacentHTML('beforeend', payed);
            container.insertAdjacentHTML('beforeend', amount);

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
</style>

<main>
        <reader id="reader" />

    {#if scanning}
        <div id="container1">

        </div>

        <button on:click={stop}>Stop Scanning</button>
        <button on:click={nextTicket}>Next Ticket</button>

    {:else}
        <button on:click={start}>Start Scanning</button>
        <label for="manuel"> <input placeholder="Type QRCode manuelly..." id = "manuel" type = 'text' on:input={manuel} style="width: 210px"> <button id="manuel" on:click={showData}>Check</button></label>
        <div id="container2">

        </div>
    {/if}
</main>