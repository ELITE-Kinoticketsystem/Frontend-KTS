<script lang="ts">
    import DrawSeat from "./drawSeat.svelte";

    export const nrOfRows = 6;
    export const nrOfCols = 10;

    let seat = { type: "type", price: "100$" };

    let seatrow: any[] = [];
    for (let x = 0; x < nrOfCols; ++x) {
        seatrow.push(seat);
    }
    let seats: any[] = [];
    for (let y = 0; y < nrOfRows; ++y) {
        seats.push(seatrow);
    }
    let seatColor = "#FFE6E2";
</script>


    <div class="aspect-video bg-blue-800 min-w-fit overflow-hidden">
        <div class="aspect-auto bg-green-600">
            <div class="grid grid-rows-6 grid-cols-10">
                {#each seats as seatrow, y}
                    {#each seatrow as seat, x}
                        <div
                            class=" bg-white hover:bg-blue-500 ring-black ring-1 ring-inset"
                        >
                        <div class="">
                            <DrawSeat type="Regular" />
                          </div>
                        </div>
                    {/each}
                {/each}
            </div>
        </div>
    </div>

