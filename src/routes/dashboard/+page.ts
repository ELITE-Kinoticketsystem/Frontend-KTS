import { apiUrl } from '$lib/_services/authService.js';

export const load = async ({ fetch, params }) => {
    async function fetchOrders(){
        const ticketsResponse = await fetch(apiUrl+"/orders", {
            method: "GET",
            mode: "cors",
            credentials: "include",
        });
        return await ticketsResponse.json();
    }

    return { orders: await fetchOrders()};
}