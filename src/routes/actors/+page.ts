export const load = async ({ fetch, params }) => {
    async function fetchActorData() {
        const actData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/actors");
        return await actData.json();
    }

    return { actors: await fetchActorData()};
};