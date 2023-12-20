import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {
    async function fetchActorData() {
        const actData = await fetch(apiUrl+"/actors/"+params.actorId, {
            mode: "cors",
            credentials: "include"
        });
        return await actData.json();
    }

    let actorData = await fetchActorData();


    return { actorData: actorData};
}