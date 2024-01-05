import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {

    async function fetchLocations() {
        const theatreResponse = await fetch(apiUrl+"/theatres", {
            method: "GET",
            mode: "cors",
            credentials: "include",
        });
        return await theatreResponse.json();
    }
    return { locations: await fetchLocations() };
}