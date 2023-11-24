export const load = async ({ fetch, params }) => {
    async function fetchMovie(){
        const movieData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/movies/" + params.movieId);
        return await movieData.json();
    }
    async function fetchTheatres(){
        const theatres = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/movies/" + params.movieId);
        return await theatres.json();
    }

    return {movie: fetchMovie(), theatres: fetchTheatres()};
}