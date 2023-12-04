export const load = async ({ fetch, params }) => {

    async function fetchFirst(){
        const movieData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/movies");
        return await movieData.json();
    }
    
    return { movies: fetchFirst() };
}