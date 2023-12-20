import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {

    async function fetchMovies(){
        const movieData = await fetch(apiUrl+"/movies", {
            mode: "cors"
        });
        return movieData.json();
    }
    
    return { movies: await fetchMovies() };
}