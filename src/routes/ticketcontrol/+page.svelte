<script>
    import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'

    let scanning = false;

    let html5Qrcode;
    let cameraId;

    onMount(init);

    async function init() {
        html5Qrcode = new Html5Qrcode('reader')
        getCameras();
    }

    function getCameras(){
        html5Qrcode.getCameras().then(devices => {
            if(devices && devices.length){
                cameraId = devices[0].id;
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
        await html5Qrcode.stop();
        scanning = false;
    }

    function onScanSuccess(decodedText, decodedResult) {
        //alert(`Code matched = ${decodedText}`)
        fetchData(decodedText);
        //console.log(decodedResult);
    }

    function onScanFailure(error) {
        //console.warn(`Code scan error = ${error}`);
    }

    async function getTicket(){
        const ticketData = await fetch("https://657cb0cd853beeefdb99d741.mockapi.io/tickets", { mode : "cors"});
        return ticketData.json();
    }
    async function fetchData(decodedText){

        const url = new URL('https://657cb0cd853beeefdb99d741.mockapi.io/tickets');
        const decodedTextToString = decodedText.toString();
        //     url.searchParams.append('qrcode', decodedTextToString);
        console.log("URL", url);
        console.log("DecodedText", decodedText);
        console.log("DecodedToString", decodedTextToString);

        await getTicket().then((tickets) =>{
            let ticketArray = tickets
            ticketArray.filter((ticket) =>{
                ticket.qrcode = decodedText
            })
            console.log(ticketArray)
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
    .container{
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

        <div id="container">

        </div>

        <button on:click={stop}>Stop Scanning</button>

    {:else}
        <button on:click={start}>Start Scanning</button>
    {/if}
</main>