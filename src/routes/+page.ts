export const load = async ({ fetch, params }) => {
    const movieData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/movies");
    const data = await movieData.json();
    return { data };
}