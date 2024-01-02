import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {

    async function fetchSpecialEvent(){
        const movieData = await fetch(apiUrl+"/events/"+params.specialEventId, {
            mode: "cors"
        });
        return movieData.json();
    }
    
    return { specialEvent: await fetchSpecialEvent() };
}