import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {


    async function fetchMoviesOfGenre(){
        const movieData = await fetch(apiUrl+"/movies/genres", {
            mode: "cors"
        })
        return movieData.json();
    }


    async function fetchSpecialEvents(){
        const specialEventsData = await fetch(apiUrl+"/events/special", {
            mode: "cors"
        });
        return specialEventsData.json();
    }


    return { movies: await fetchMoviesOfGenre(), specialEvents: await fetchSpecialEvents()};
}