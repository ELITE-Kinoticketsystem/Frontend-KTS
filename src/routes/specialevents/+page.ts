import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {

    async function fetchMovies(){
        const movieData = await fetch(apiUrl+"/events/special", {
            mode: "cors"
        });
        return await movieData.json();
    }
    
    return { specialEvents: await fetchMovies() };
}