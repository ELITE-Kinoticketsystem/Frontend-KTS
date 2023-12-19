export const load = async ({ fetch, params }) => {

    async function fetchMovies(){
        const movieData = await fetch("http://172.205.209.190:8080/movies", {
            mode: "cors"
        });
        return movieData.json();
    }
    
    return { movies: await fetchMovies() };
}