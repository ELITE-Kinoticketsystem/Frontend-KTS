import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {

    async function fetchMovies(){
        const movieData = await fetch(apiUrl+"/movies/genres");
        return await movieData.json();
    }

    async function fetchActors(){
        const actData = await fetch(apiUrl+"/actors");
        return await actData.json();
    }
    
    return { movies: await fetchMovies(), actors: await fetchActors() };
}