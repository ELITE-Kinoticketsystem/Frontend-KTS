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
    const seatsPerRow = data.seatsPerRow.sort((a: any, b: any) => b - a)[0];

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
        if (selectedSeats === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                color: "#FAFAFA",
                timer: 5000,
                timerProgressBar: true,
                background: "#354A5F",
                text: "Please select at least one seat!",
                footer: '<a href="/help?q=change" class="hover:text-inputBlue duration-300">Dont change the site.</a>',
            });
            return;
        }
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

        if (arrayOfSelectedSeats.length > 1) {
            const size = arrayOfSelectedSeats.length - 1;
            const lts = arrayOfSelectedSeats[size][1];
            console.log("LTS:", lts);
            for (let i = 0; i <= size; i++) {
                console.log("i:", arrayOfSelectedSeats[size][1]);
                const isLeftSite =
                    arrayOfSelectedSeats[size][1] ===
                    arrayOfSelectedSeats[i][1] - 1;
                const isRightSite =
                    arrayOfSelectedSeats[size][1] ===
                    arrayOfSelectedSeats[i][1] + 1;
                if (!isLeftSite && !isRightSite) {
                    addedNextToEachOther = false;
                } else {
                    break;
                }
            }
        }

        if (!addedNextToEachOther) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                color: "#FAFAFA",
                timer: 5000,
                customClass: "rounded-lg",
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
    <div class="mx-5 w-full h-full">
        <div class="flex">
            <div>
                <p class="font-bold text-xl text-textWhite">SEATS</p>
                <p class="text-lg text-textWhite">Select a seat</p>
            </div>
        </div>
        <div
            class="flex flex-col bg-[#29313a] rounded-lg bg-repeat-round items-center"
        >
            <div class="leinwand" />
            <p class="font-bold text-textWhite text-lg">Leinwand</p>
            <div class="flex flex-row my-5 justify-center">
                {#key seats}
                    <div
                        class="grid grid-cols-{cinemaHallSize} grid-rows-{seatsPerRow} gap-1"
                    >
                        {#each { length: cinemaHallSize } as _, i}
                            {#each { length: seatsPerRow } as _, j}
                                {#if seats[i][j].type !== "emptyDoubleSeat"}
                                    <div
                                        class="grid {seats[i][j].isDoubleSeat
                                            ? 'col-span-2'
                                            : ''} overflow-auto"
                                    >
                                        <button
                                            disabled={seats[i][j].type ===
                                                "reserved"}
                                            class="disabled:cursor-not-allowed mx-auto"
                                            on:click={() => {
                                                if (
                                                    seats[i][j].type !==
                                                    "selected"
                                                ) {
                                                    addSeat(seats[i][j], i, j);
                                                } else {
                                                    removeSeat(
                                                        seats[i][j],
                                                        i,
                                                        j
                                                    );
                                                }
                                            }}
                                        >
                                            <CinemaSeat
                                                seat={seats[i][j]}
                                                isDoubleSeat={seats[i][j]
                                                    .isDoubleSeat}
                                            />
                                        </button>
                                    </div>
                                {/if}
                            {/each}
                        {/each}
                    </div>
                {/key}
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
