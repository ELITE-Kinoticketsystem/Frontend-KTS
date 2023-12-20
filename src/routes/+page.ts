import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {


    async function fetchFirst(){
        const movieData = await fetch(apiUrl+"/movies/genres", {
            mode: "cors"
        })
        return movieData.json();
    }


    return { first: await fetchFirst()
     };
}