import { apiUrl } from '$lib/_services/authService';


export const load = async ({ fetch, params }) => {
    async function fetchMovie(){
        const movieData = await fetch(apiUrl+"/movies/" + params.movieId, { mode: "cors" });
        return await movieData.json();
    }
    return { movie: fetchMovie() };
}