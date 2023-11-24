export const load = async ({ fetch, params }) => {
    async function fetchActorData() {
        const actData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/actors");
        return await actData.json();
    }
    async function fetchHisMovies(actorId: string) {
        const movies = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/movies");
        return await movies.json();
    }

    let actorData = await fetchActorData();
    let hisMovies = await fetchHisMovies(actorData.actorId);


    return { actorData: actorData, hisMovies: hisMovies};
}