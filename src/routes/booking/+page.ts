import { browser } from '$app/environment';

export const load = async ({ fetch, params }) => {

    async function getEventInformation(){
        return new Promise((resolve, reject) => {
            resolve({
                movieTitle: "The Matrix",
                dateTime: "2023-12-31 15:04:05",
                location: "Mannheim",
                type: "2D",
                cinema: "Cinema X",
                movieImg: "https://assets.cdn.moviepilot.de/files/c50861b75e2e12f24dd0f5a0320ddababe58413708040e128b0cd9966890/copyright/NEU_-_Matrix.jpg",
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
                    
                },
                {
                    ticketId: "2",
                    x: 2,
                    y: 1,
                    price: 1500,
                },
                {
                    ticketId: "3",
                    x: 3,
                    y: 1,
                    price: 1500,
                },
                {
                    ticketId: "4",
                    x: 4,
                    y: 1,
                    price: 1500,
                }
            ])
        });
        if(browser){
            if(false)  window.location.href = "/movies/";
        }
    }

    return { eventInformation: await getEventInformation(), eventTickets: await getEventTickets() };
}