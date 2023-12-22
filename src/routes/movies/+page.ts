import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {

    async function fetchMovies(){
        const movieData = await fetch(apiUrl+"/movies/genres", {
            mode: "cors"
        });
        return movieData.json();
    }
    async function fetchGenres(){
        const genreData = await fetch(apiUrl+"/genres", {
            mode: "cors"
        });
        let returnData: string[]= [];
        await genreData.json().then(data => {
            for(let i = 0; i < data.length; i++){
                returnData.push(data[i].GenreName);
            
            }

        });
        return returnData;
    }
    
    return { movies: await fetchMovies(), genres: await fetchGenres() };
}