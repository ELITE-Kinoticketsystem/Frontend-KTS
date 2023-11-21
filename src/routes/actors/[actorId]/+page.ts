export const load = async ({ fetch, params }) => {
    const actData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/" + params.actorId)
    const data = await actData.json();
    return { data };
}