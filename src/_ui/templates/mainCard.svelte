<script lang="ts">
    import SmallMovieImg from "./smallMovieImg.svelte";
    export let movie: any;
</script>

<div class="grid grid-cols-1 grid-rows-2 w-48 h-21rem overflow-hidden">
    <a class="grid" href="/movies/{movie.movieId}">
        <div class="grid mb-5 opacity-70 hover:opacity-100 duration-300">
            <SmallMovieImg src={movie.src} alt={movie.movieName} />
        </div>
        <div class="grid">
            <p class="font-bold text-md text-textWhite break-words text-center">
                {movie.movieName}
            </p>
        </div>
    </a>
</div>
