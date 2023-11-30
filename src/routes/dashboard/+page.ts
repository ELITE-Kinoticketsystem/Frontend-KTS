export const load = async ({ fetch, params }) => {
    async function fetchTickets(){
        return [{
            title: "Stephen Curry: Underrated",
            moveImg: "https://upload.wikimedia.org/wikipedia/en/5/58/Stephen_curry_underrated.png",
            date: "2023-11-21",
            theatre: "Cineplex Manheim",
            seats: "B1",
            price: 1000,
        },{
            title: "Stephen Curry: Underrated 3D",
            moveImg: "https://upload.wikimedia.org/wikipedia/en/5/58/Stephen_curry_underrated.png",
            date: "2023-09-23",
            theatre: "Cineplex Stuttgart",
            seats: "B1, B2, B3, B4, B5, B6",
            price: 1550*6,
        }, {
            title: "Stephen Curry: Legacy",
            moveImg: "https://upload.wikimedia.org/wikipedia/en/5/58/Stephen_curry_underrated.png",
            date: "2023-01-01",
            theatre: "Cineplex Mainz",
            seats: "A1, A2",
            price: 800*2,
        },{
            title: "Stephen Curry > LeBron James",
            moveImg: "https://upload.wikimedia.org/wikipedia/en/5/58/Stephen_curry_underrated.png",
            date: "2023-12-31",
            theatre: "Cineplex Berlin",
            seats: "B1",
            price: 2000,
        },{
            title: "Warriors > Lakers",
            moveImg: "https://upload.wikimedia.org/wikipedia/en/5/58/Stephen_curry_underrated.png",
            date: "2023-12-01",
            theatre: "Cineplex Hamburg",
            seats: "JW23, SC30",
            price: 3000*2,
        }];
    }

    return { tickets: await fetchTickets()};
}