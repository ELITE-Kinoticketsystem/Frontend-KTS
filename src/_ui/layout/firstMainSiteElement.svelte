<script lang="ts">
    import MainCard from "../templates/mainCard.svelte";
    import { AuthService } from "$lib/_services/authService";
    import { MovieService } from "$lib/_services/movieService";
    import SlideOver from "../templates/slideOver.svelte";
    import MovieRow from "../templates/movieRow.svelte";

    const authService = new AuthService();

    const isUserLoggedIn = authService.isUserLoggedIn();

    let movieIdsToDisplay: string[] = [];

    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");
    movieIdsToDisplay.push("dummy");

    async function toggleSideMenu() {
        await MovieService.getLikedMovies().then((likedMovies) => {
            let allLikedMoviesIds: string[] = [];
            likedMovies.forEach((movie: { movieId: string }) => {
                allLikedMoviesIds.push(movie.movieId);
            });
            const slideOver = new SlideOver({
                target: document.body,
                props: {
                    title: isUserLoggedIn
                        ? "Your watchlist"
                        : "Liked by others",
                    movieIds: allLikedMoviesIds,
                },
            });
            slideOver.$on("close", () => {
                slideOver.$destroy();
            });
        });
    }
</script>

<div class="mb-8">
    <a href="/" on:click={toggleSideMenu} class="font-bold text-textWhite">
        <div class="flex">
            <p class="flex font-bold text-buttonBlue text-md">Cinemika&nbsp;</p>
            {isUserLoggedIn ? "- Your watchlist " : "- Liked by others "}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                width="20"
                height="20"
                focusable="false"
                class="text-textWhite fill-current mt-0.5"
                ><path
                    d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"
                />
            </svg>
        </div>
    </a>
</div>

<MovieRow {movieIdsToDisplay}/>

