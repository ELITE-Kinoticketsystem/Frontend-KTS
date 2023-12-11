export const load = async ({ fetch, params }) => {

    async function fetchMovies(){
        const movieData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/movies");
        return await movieData.json();
    }

    async function fetchActors(){
        const actData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/actors");
        return await actData.json();
    }
    
    return { movies: await fetchMovies(), actors: await fetchActors() };
}