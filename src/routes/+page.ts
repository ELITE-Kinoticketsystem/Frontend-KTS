export const load = async ({ fetch, params }) => {


    async function fetchFirst(){
        const movieData = await fetch("http://172.205.209.190:8080/movies/genres", {
            mode: "cors"
        })
        return movieData.json();
    }


    return { first: await fetchFirst()
     };
}