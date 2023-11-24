<script lang="ts">
    import SmallMovieImg from "./smallMovieImg.svelte";

    export let theatre: any;
</script>

<div class="flex flex-col">
    <div class="flex">
        <img class="w-10.33rem h-64 object-cover rounded-md" src={theatre.logo} alt="Logo of cinema"/>
    </div>
    <div class="flex mx-auto mt-3">
        <p class="text-center text-textWhite">{theatre.name}</p>
    </div>
</div>