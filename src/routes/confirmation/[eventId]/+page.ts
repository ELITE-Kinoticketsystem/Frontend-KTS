import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {

    async function getEventInformation(){
        const eventResponse = await fetch(apiUrl+"/events/"+params.eventId, {
            mode: 'cors',
            method: 'GET',
        })
        return await eventResponse.json();

    }
    async function getPriceCategories() {
        const priceCategoriesResponse = await fetch(apiUrl+"/price-categories", {
            mode: 'cors',
            method: 'GET',
            credentials: 'include',
        });
        return await priceCategoriesResponse.json();
    }


    return { eventInformation: await getEventInformation(), priceCategories: await getPriceCategories()};
}