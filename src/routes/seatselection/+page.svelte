<script lang="ts">
    import CinemaSeat from "../../_ui/templates/cinemaSeat.svelte";

    let cinemaHallName = "Cinemika X";

    export let data;

    const priceaAdult = "10.00";
    const priceChild = "8.00";
    const priceSenior = "9.00";
    const priceStudent = "5.00";

    $: selectedSeat = [];
    $: tickets = 0;

    $: adultSeats = 0;
    $: childSeats = 0;
    $: seniorSeats = 0;
    $: studentSeats = 0;
</script>

<svelte:head>
    <title>Cinemika - Seat selection</title>
</svelte:head>

<div class="flex mx-32">
    <div class="mx-5 w-4/5 h-4/5">
        <div class="flex">
            <div class="">
                <p class="font-bold text-xl text-textWhite">SEATS</p>
                <p class="text-lg text-textWhite">Select a seat</p>
            </div>
            <div class="relative right-0">
                <p class="font-bold text-xl text-textWhite">{cinemaHallName}</p>
            </div>
        </div>
        <div
            class="flex flex-col bg-[#29313a] rounded-lg bg-repeat-round items-center"
        >
            <div class="relative leinwand" />
            <p class="relative font-bold text-textWhite text-lg">Leinwand</p>
            <div class="" />
        </div>
    </div>
    <div class="bg-[#29313a] rounded-lg w-1/4">
        {#key selectedSeat}
            <div class="mt-2">
                <p class="text-xl text-textWhite ml-2">
                    {selectedSeat.length == 0
                        ? "Selected seat(s)"
                        : selectedSeat.length == 1
                        ? "Selected seat"
                        : "Selected seats"}
                </p>
            </div>
            <div class="flex flex-col">
                <div class="text-textWhite ml-5 mt-10 text-lg">
                    <p class="my-1">
                        Adults - €{priceaAdult} (-) {adultSeats} / {selectedSeat.length}
                        (+)
                    </p>
                    <p class="my-1">
                        Children - €{priceaAdult} (-) {adultSeats} / {selectedSeat.length}
                        (+)
                    </p>
                    <p class="my-1">
                        Seniors - €{priceaAdult} (-) {adultSeats} / {selectedSeat.length}
                        (+)
                    </p>
                    <p class="my-1">
                        Students - €{priceaAdult} (-) {adultSeats} / {selectedSeat.length}
                        (+)
                    </p>
                </div>
            </div>
        {/key}
    </div>
</div>

<style>
    .leinwand {
        width: 80%;
        border: 3px solid white;
        height: 15px;
        border-color: white transparent transparent transparent;
        border-radius: 75%/20px 20px 0 0;
    }
</style>
