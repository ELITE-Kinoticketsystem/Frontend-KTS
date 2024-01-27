import { browser } from '$app/environment';

export const load = async ({ fetch, params }) => {

    async function getEventInformation(){
        return new Promise((resolve, reject) => {
            resolve({
                movieTitle: "The Matrix",
                dateTime: "2023-12-31 15:04:05",
                prices: {
                    normal: {
                        "Adult": 1500,
                        "Child": 1000,
                        "Senior": 750,
                        "Student": 500
                    },
                    louge: {
                        "Adult": 2500,
                        "Child": 2000,
                        "Senior": 1750,
                        "Student": 1500
                    },
                    vip: {
                        "Adult": 3500,
                        "Child": 3000,
                        "Senior": 2750,
                        "Student": 2500
                    }
                },
            })

        });

    }

    async function getEventTickets(){
        return new Promise((resolve, reject) => {
            resolve([
                {
                    ticketId: "1",
                    x: 1,
                    y: 1,
                    price: 1500,
                    category: "Normal",
                    type: "Adult",
                },
                {
                    ticketId: "2",
                    x: 2,
                    y: 1,
                    price: 1500,
                    category: "Normal",
                    type: "Adult",
                },
                {
                    ticketId: "3",
                    x: 3,
                    y: 1,
                    price: 1500,
                    category: "Normal",
                    type: "Adult",
                },
                {
                    ticketId: "4",
                    x: 4,
                    y: 1,
                    price: 1500,
                    category: "Normal",
                    type: "Adult",
                }
            ])
        });
        if(browser){
            if(false)  window.location.href = "/movies/";
        }
    }

    async function getSimilarMovies(){
        const movieData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/movies");
        return await movieData.json();
    }

    return { eventInformation: await getEventInformation(), eventTickets: await getEventTickets(), similarMovies: await getSimilarMovies() };
}