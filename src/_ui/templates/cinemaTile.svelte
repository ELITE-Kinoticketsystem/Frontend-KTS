<script lang="ts">
    import CinemaTile from "$lib/assets/cinemaTile.png";

    export let cinemaLocation: string = "";
    export let cinemaCompany: string = "";
</script>

<div
    class="flex min-h-full flex-col rounded-xl mx-auto w-full max-w-2xl justify-center bg-[#2A313A]"
>
    <div class="mx-10">
        <img
            src={CinemaTile}
            alt="{cinemaCompany} & {cinemaLocation}"
            class=""
        />
    </div>
    <div class="mt-24">
        <p class="font-bold text-2xl text-textWhite text-center">
            {cinemaCompany}
        </p>
        <p class="font-bold text-sm text-darkTextWhite text-center">
            {cinemaLocation}
        </p>
    </div>
</div>
