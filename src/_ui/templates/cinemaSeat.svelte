<script lang="ts">
    export let seatType: any;

    const seatColorTypes: { [seatType: string]: string } = {
        normal: "bg-blue-500",
        louge: "bg-orange-500",
        vip: "bg-purple-500",
        reserved: "bg-red-500",
    };

    console.log(seatType);

    const seatColor = seatColorTypes[seatType];
</script>

<div class="mx-1 my-1 {seatColor}">
    <p hidden />
</div>
