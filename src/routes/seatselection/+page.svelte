<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import CinemaSeat from "../../_ui/templates/cinemaSeat.svelte";
    import Swal from "sweetalert2";

    let cinemaHallName = "Cinemika X";

    export let data;

    $: selectedSeats = 0;
    $: seatTypeSelection = "normal";

    let arrayOfSelectedSeats: any[] = [];

    const priceAdult = {
        vip: "15.00",
        lounge: "12.00",
        normal: "10.00",
    };
    const priceChild = {
        vip: "12.00",
        lounge: "10.00",
        normal: "8.00",
    };
    const priceSenior = {
        vip: "10.00",
        lounge: "8.00",
        normal: "5.00",
    };
    const priceStudent = {
        vip: "8.00",
        lounge: "5.00",
        normal: "2.50",
    };

    const cinemaHallSize: any = data.cinemaHallSize;
    const seatsPerRow: any = data.seatsPerRow;

    $: adultSeats = 0;
    $: childSeats = 0;
    $: seniorSeats = 0;
    $: studentSeats = 0;

    function onTicketChange(event: any, type: string) {
        const operator = event.srcElement.innerText;
        if (type === "Adults") {
            if (operator === "(+)") {
                adultSeats++;
            } else {
                adultSeats--;
            }
        } else if (type === "Children") {
            if (operator === "(+)") {
                childSeats++;
            } else {
                childSeats--;
            }
        } else if (type === "Seniors") {
            if (operator === "(+)") {
                seniorSeats++;
            } else {
                seniorSeats--;
            }
        } else if (type === "Students") {
            if (operator === "(+)") {
                studentSeats++;
            } else {
                studentSeats--;
            }
        }
        calculatePrice();
    }

    $: totalPrice = "0.00";

    function calculatePrice() {
        let price = 0;
        if (seatTypeSelection === "normal") {
            price += adultSeats * parseFloat(priceAdult.normal);
            price += childSeats * parseFloat(priceChild.normal);
            price += seniorSeats * parseFloat(priceSenior.normal);
            price += studentSeats * parseFloat(priceStudent.normal);
            totalPrice = price.toFixed(2);
            return;
        } else if (seatTypeSelection === "lounge") {
            price += adultSeats * parseFloat(priceAdult.lounge);
            price += childSeats * parseFloat(priceChild.lounge);
            price += seniorSeats * parseFloat(priceSenior.lounge);
            price += studentSeats * parseFloat(priceStudent.lounge);
            totalPrice = price.toFixed(2);
            return;
        } else if (seatTypeSelection === "vip") {
            price += adultSeats * parseFloat(priceAdult.vip);
            price += childSeats * parseFloat(priceChild.vip);
            price += seniorSeats * parseFloat(priceSenior.vip);
            price += studentSeats * parseFloat(priceStudent.vip);
            totalPrice = price.toFixed(2);
            return;
        } else {
            totalPrice = "0.00";
            return;
        }
    }

    const originalSeats: any = data.seats;
    const seats: any = JSON.parse(JSON.stringify(originalSeats));

    onMount(() => {
        calculatePrice();
    });

    function goToReview() {
        if (browser) {
            window.location.href = "/seatselection/review";
        }
    }

    $: addSeat = (seat: any, i: number, j: number) => {
        if (seat.type === "reserved") {
            return;
        }
        arrayOfSelectedSeats.push([i, j]);
        let addedNextToEachOther = true;
        for (let k = 0; k < arrayOfSelectedSeats.length - 1; k++) {
            const [_, col1] = arrayOfSelectedSeats[k];
            const [_1, col2] = arrayOfSelectedSeats[k + 1];

            if (Math.abs(col1 - col2) > 1) {
                addedNextToEachOther = false;
                break;
            }
        }

        if (!addedNextToEachOther) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                color: "#FAFAFA",
                timer: 2000,
                timerProgressBar: true,
                background: "#354A5F",
                text: "Please select seat next to each other!",
                footer: '<a href="#" class="hover:text-inputBlue duration-300">Why do I have this issue?</a>',
            });
            return;
        }
        seatTypeSelection = seat.type;
        selectedSeats++;
        adultSeats++;

        seat.type = "selected";
        seats[i][j] = seat;
    };
    $: removeSeat = (seat: any, i: number, j: number) => {
        seat.type = originalSeats[i][j].type;

        seats[i][j] = seat;
        selectedSeats--;
        //TODO Need to check if seat is realy adult or child or senior or student!!!!!!!!!!!!!!
        adultSeats--;
    };
</script>

<svelte:head>
    <title>Cinemika - Seat selection</title>
</svelte:head>
<div class="flex mx-32">
    <div class="mx-5 w-4/5 h-4/5">
        <div class="flex">
            <div>
                <p class="font-bold text-xl text-textWhite">SEATS</p>
                <p class="text-lg text-textWhite">Select a seat</p>
            </div>
        </div>
        <div
            class="flex flex-col bg-[#29313a] rounded-lg bg-repeat-round items-center"
        >
            <div class="relative leinwand" />
            <p class="relative font-bold text-textWhite text-lg">Leinwand</p>
            <div class="my-5">
                {#key seats}
                    {#each { length: cinemaHallSize } as _, i}
                        <div class="grid grid-flow-col-dense gap-4 mt-4">
                            {#each { length: seatsPerRow[i] } as _, j}
                                <button
                                    disabled={seats[i][j].type === "reserved"}
                                    class="disabled:cursor-not-allowed"
                                    on:click={() => {
                                        if (seats[i][j].type !== "selected") {
                                            addSeat(seats[i][j], i, j);
                                        } else {
                                            removeSeat(seats[i][j], i, j);
                                        }
                                    }}
                                >
                                    <CinemaSeat
                                        seat={seats[i][j]}
                                        isDoubleSeat={seats[i][j].isDoubleSeat}
                                    />
                                </button>
                            {/each}
                        </div>
                    {/each}
                {/key}
            </div>
        </div>
    </div>
    <div class="flex flex-col mt-7">
        <div class="text-white text-center font-bold text-xl leading-none">
            {cinemaHallName}
        </div>
        <div>
            <div class="bg-[#29313a] rounded-lg">
                {#key selectedSeats}
                    <div class="mt-2">
                        <p class="text-xl text-textWhite ml-2">
                            {selectedSeats == 0
                                ? "Selected seat(s)"
                                : selectedSeats == 1
                                ? "Selected seat"
                                : "Selected seats"}
                        </p>
                    </div>
                    <div class="grid grid-rows-1 grid-flow-col gap-2">
                        <div
                            class="text-textWhite ml-5 mr-1 mt-10 text-lg w-max"
                        >
                            <div>
                                <div
                                    class="grid grid-cols-2 grid-flow-row gap-6"
                                >
                                    <div>
                                        Adults -
                                        {seatTypeSelection === "vip"
                                            ? priceAdult.vip
                                            : seatTypeSelection === "normal"
                                            ? priceAdult.normal
                                            : priceAdult.lounge}€
                                    </div>
                                    <div>
                                        <button
                                            class="disabled:opacity-50 disabled:text-gray-200"
                                            on:click={(event) => {
                                                onTicketChange(event, "Adults");
                                            }}
                                            disabled={adultSeats < 1}
                                            >(-)</button
                                        >
                                        {adultSeats} / {selectedSeats -
                                            childSeats -
                                            seniorSeats -
                                            studentSeats}
                                        <button
                                            class="disabled:opacity-50 disabled:text-gray-200"
                                            on:click={(event) => {
                                                onTicketChange(event, "Adults");
                                            }}
                                            disabled={adultSeats +
                                                childSeats +
                                                seniorSeats +
                                                studentSeats ===
                                                selectedSeats}>(+)</button
                                        >
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div
                                    class="grid grid-cols-2 grid-flow-row gap-6"
                                >
                                    <div>
                                        Children - {seatTypeSelection === "vip"
                                            ? priceChild.vip
                                            : seatTypeSelection === "normal"
                                            ? priceChild.normal
                                            : priceChild.lounge}€
                                    </div>
                                    <div>
                                        <button
                                            class="disabled:opacity-50 disabled:text-gray-200"
                                            on:click={(event) => {
                                                onTicketChange(
                                                    event,
                                                    "Children"
                                                );
                                            }}
                                            disabled={childSeats < 1}
                                            >(-)</button
                                        >
                                        {childSeats} / {selectedSeats -
                                            adultSeats -
                                            seniorSeats -
                                            studentSeats}
                                        <button
                                            class="disabled:opacity-50 disabled:text-gray-200"
                                            on:click={(event) => {
                                                onTicketChange(
                                                    event,
                                                    "Children"
                                                );
                                            }}
                                            disabled={adultSeats +
                                                childSeats +
                                                seniorSeats +
                                                studentSeats ===
                                                selectedSeats}>(+)</button
                                        >
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div
                                    class="grid grid-cols-2 grid-flow-row gap-6"
                                >
                                    <div>
                                        Seniors - {seatTypeSelection === "vip"
                                            ? priceSenior.vip
                                            : seatTypeSelection === "normal"
                                            ? priceSenior.normal
                                            : priceSenior.lounge}€
                                    </div>
                                    <div>
                                        <button
                                            class="disabled:opacity-50 disabled:text-gray-200"
                                            on:click={(event) => {
                                                onTicketChange(
                                                    event,
                                                    "Seniors"
                                                );
                                            }}
                                            disabled={seniorSeats < 1}
                                            >(-)</button
                                        >
                                        {seniorSeats} / {selectedSeats -
                                            adultSeats -
                                            childSeats -
                                            studentSeats}
                                        <button
                                            class="disabled:opacity-50 disabled:text-gray-200"
                                            on:click={(event) => {
                                                onTicketChange(
                                                    event,
                                                    "Seniors"
                                                );
                                            }}
                                            disabled={adultSeats +
                                                childSeats +
                                                seniorSeats +
                                                studentSeats ===
                                                selectedSeats}>(+)</button
                                        >
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div
                                    class="grid grid-cols-2 grid-flow-row gap-6"
                                >
                                    <div>
                                        Students - {seatTypeSelection === "vip"
                                            ? priceStudent.vip
                                            : seatTypeSelection === "normal"
                                            ? priceStudent.normal
                                            : priceStudent.lounge}€
                                    </div>
                                    <div>
                                        <button
                                            class="disabled:opacity-50 disabled:text-gray-200"
                                            on:click={(event) => {
                                                onTicketChange(
                                                    event,
                                                    "Students"
                                                );
                                            }}
                                            disabled={studentSeats < 1}
                                            >(-)</button
                                        >
                                        {studentSeats} / {selectedSeats -
                                            adultSeats -
                                            childSeats -
                                            seniorSeats}
                                        <button
                                            class="disabled:opacity-50 disabled:text-gray-200"
                                            on:click={(event) => {
                                                onTicketChange(
                                                    event,
                                                    "Students"
                                                );
                                            }}
                                            disabled={adultSeats +
                                                childSeats +
                                                seniorSeats +
                                                studentSeats ===
                                                selectedSeats}>(+)</button
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="relative text-center object-center">
                                <p class="my-5">
                                    Price: {totalPrice}€
                                </p>

                                <button
                                    disabled={selectedSeats === 0 ||
                                        adultSeats +
                                            childSeats +
                                            seniorSeats +
                                            studentSeats !==
                                            selectedSeats}
                                    class="bg-buttonBlue text-textWhite rounded-md disabled:hover:bg-red-500 hover:bg-green-500 duration-300 px-3 py-1.5 mb-2"
                                    on:click={goToReview}
                                    >Continue
                                </button>
                            </div>
                        </div>
                    </div>
                {/key}
            </div>
        </div>
        <div>
            <div class="bg-[#29313a] rounded-lg">
                <div class="mt-2">
                    <p class="text-xl text-textWhite ml-2">Prices</p>
                </div>
                <div class="">
                    <div class="flex">
                        <div class="text-textWhite ml-5 mt-10 text-lg">
                            <p class="my-1">
                                Purple: {priceStudent.vip}€ - {priceAdult.vip}€
                            </p>
                            <p class="my-1">
                                Orange: {priceStudent.lounge}€ - {priceAdult.lounge}€
                            </p>
                            <p class="my-1">
                                Blue: {priceStudent.normal}€ - {priceAdult.normal}€
                            </p>
                            <p class="mt-10">Green: Your selection</p>
                            <p class="my-1">Red: Blocked</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .leinwand {
        width: 80%;
        border: 5px solid white;
        height: 20px;
        border-color: white transparent transparent transparent;
        border-radius: 75%/20px 20px 0 0;
    }
</style>
