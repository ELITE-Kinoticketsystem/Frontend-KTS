<script lang="ts">
    import CinemaTile from "./cinemaTile.svelte";

    let isLoaded = true;
    export let movie: {
        src: "";
        movieName: "";
        movieId: "";
        tags: "";
        description: "";
        fsk: "";
    };
</script>

<div class="flex">
    <div class="relative">
        <a href="/events/{movie.movieId}">
            <img
                src={movie.src}
                alt={movie.movieName}
                class="rounded-xl h-72 object-cover overflow-clip"
            />
            <div
                class="absolute top-0 left-0 h-72 w-auto rounded-lg object-cover overflow-hidden"
            >
                <CinemaTile
                    cinemaCompany="Cineplex"
                    cinemaLocation="Mannheim"
                />
            </div>
        </a>
    </div>
</div>
