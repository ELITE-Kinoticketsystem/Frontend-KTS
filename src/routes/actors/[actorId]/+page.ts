export const load = async ({ fetch, params }) => {
    async function fetchActorData() {
        const actData = await fetch("http://172.205.209.190:8080/actors/"+params.actorId, {
            mode: "cors",
            credentials: "include"
        });
        return await actData.json();
    }

    let actorData = await fetchActorData();


    return { actorData: actorData};
}