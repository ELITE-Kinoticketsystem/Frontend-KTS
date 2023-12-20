export const load = async ({ fetch, params }) => {
    async function fetchActorData() {
        const actData = await fetch("https://172.205.209.190:8080/actors", {
            mode: "cors",
            credentials: "include"
        });
        return await actData.json();
    }

    return { actors: await fetchActorData()};
};