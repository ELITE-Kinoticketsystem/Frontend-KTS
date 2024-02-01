import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {


    async function fetchFirst(){
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


    return { first: await fetchFirst(), specialEvents: await fetchSpecialEvents()};
}