import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { apiUrl } from '$lib/_services/authService.js';
import Swal from 'sweetalert2';

export const load = async ({ fetch, params }) => {

    async function getEventInformation(){
        const eventResponse = await fetch(apiUrl+"/events/"+params.eventId, {
            mode: 'cors',
            method: 'GET',
        })
        return await eventResponse.json();

    }

    async function getEventTickets(){
        const ticketsResponse = await fetch(apiUrl+"/events/"+params.eventId+"/user-seats", {
            mode: 'cors',
            method: 'GET',
            credentials: 'include',
        });
        if(ticketsResponse.status == 404){
            Swal.fire({});
            goto("/seatselection/"+params.eventId);
        }
        return await ticketsResponse.json();

    }

    async function getPriceCategories() {
        const priceCategoriesResponse = await fetch(apiUrl+"/price-categories", {
            mode: 'cors',
            method: 'GET',
            credentials: 'include',
        });
        return await priceCategoriesResponse.json();
    }


    return { eventInformation: await getEventInformation(), eventTickets: await getEventTickets(), priceCategories: await getPriceCategories()};
}