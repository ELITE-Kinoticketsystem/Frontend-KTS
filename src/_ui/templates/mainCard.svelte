<script lang="ts">
    import SmallMovieImg from "./smallMovieImg.svelte";
    export let movie: any;
</script>

<div class="grid grid-cols-1 grid-rows-2 w-48 h-21rem overflow-hidden group">
    <a class="grid" href="/movies/{movie.movieId}">
        <div class="grid mb-5 group-hover:scale-105 duration-300">
            <SmallMovieImg src={movie.src} alt={movie.movieName} />
        </div>
        <div class="grid">
            <p
                class="font-bold text-[15px] text-textWhite break-words text-center group-hover:scale-105 duration-300"
            >
                {movie.movieName}
            </p>
        </div>
    </a>
</div>
