export const load = async ({ fetch, params }) => {

    async function fetchMovies(){
        const movieData = await fetch("https://172.205.209.190:8080/movies/genres");
        return await movieData.json();
    }

    async function fetchActors(){
        const actData = await fetch("https://172.205.209.190:8080/actors");
        return await actData.json();
    }
    
    return { movies: await fetchMovies(), actors: await fetchActors() };
}