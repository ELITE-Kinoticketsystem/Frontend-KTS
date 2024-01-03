import { goto } from '$app/navigation';
import { apiUrl } from '$lib/_services/authService';
import Swal from 'sweetalert2';


export const load = async ({ fetch, params }) => {
    async function fetchMovie(){
        const movieData = await fetch(apiUrl+"/movies/" + params.movieId, { mode: "cors" });
        if(!movieData.ok){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The movie can not be found!',
            });
            goto("/movies");
        }
        return await movieData.json();
    }
    return { movie: fetchMovie() };
}