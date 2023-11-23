export const load = async ({ fetch, params }) => {

    async function getCinemaHallSize() {
        return await new Promise((resolve, reject) => {
            resolve(10);
        })
    }
    async function getSeatsPerRow() {
        return await new Promise((resolve, reject) => {
            resolve([10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
        });
    }
    async function getSeats() {
        return await new Promise((resolve, reject) => {
            const seats: { type: string, isDoubleSeat: boolean }[][] = [];
            for (let i = 0; i < 5; i++) {
                seats[i] = [];
                for (let j = 0; j < 10; j++) {
                    seats[i][j] = { type: "normal", isDoubleSeat: Math.random() > 0.95 };
                }
            }
            for (let i = 5; i < 6; i++) {
                seats[i] = [];
                for (let j = 0; j < 10; j++) {
                    seats[i][j] = { type: "vip", isDoubleSeat: Math.random() > 0.95 };
                }
            }
            for (let i = 6; i < 10; i++) {
                seats[i] = [];
                for (let j = 0; j < 10; j++) {
                    seats[i][j] = { type: "louge", isDoubleSeat: Math.random() > 0.95 };
                }
            }
            resolve(seats)
        });
    }
    return { "seats": await getSeats(), "cinemaHallSize": await getCinemaHallSize(), seatsPerRow: await getSeatsPerRow() };
}