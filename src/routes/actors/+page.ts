import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {
    async function fetchActorData() {
        const actData = await fetch(apiUrl+"/actors", {
            mode: "cors",
            credentials: "include"
        });
        return await actData.json();
    }

    return { actors: await fetchActorData()};
};