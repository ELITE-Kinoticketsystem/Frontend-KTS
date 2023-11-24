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
                let hasDoubleSeat = Math.random() > 0.8;
                let pos = Math.floor(Math.random() * 9);
                for (let j = 0; j < 10; j++) {
                    seats[i][j] = { type: "normal", isDoubleSeat: false };
                    if (hasDoubleSeat && j === pos) {
                        seats[i][j] = { type: "normal", isDoubleSeat: true };
                        seats[i][j + 1] = { type: "emptyDoubleSeat", isDoubleSeat: false };
                        j = j + 1;
                    }
                }
            }
            for (let i = 5; i < 6; i++) {
                seats[i] = [];
                let hasDoubleSeat = Math.random() > 0.95;
                let pos = Math.floor(Math.random() * 9);
                for (let j = 0; j < 10; j++) {
                    seats[i][j] = { type: "vip", isDoubleSeat: false };
                    if (hasDoubleSeat && j === pos) {
                        seats[i][j] = { type: "vip", isDoubleSeat: true };
                        seats[i][j + 1] = { type: "emptyDoubleSeat", isDoubleSeat: false };
                        j = j + 1;
                    }
                }
            }
            for (let i = 6; i < 10; i++) {
                seats[i] = [];
                let hasDoubleSeat = Math.random() > 0.95;
                let pos = Math.floor(Math.random() * 9);
                for (let j = 0; j < 10; j++) {
                    seats[i][j] = { type: "louge", isDoubleSeat: false };
                    if (hasDoubleSeat && j === pos) {
                        seats[i][j] = { type: "louge", isDoubleSeat: true };
                        seats[i][j + 1] = { type: "emptyDoubleSeat", isDoubleSeat: false };
                        j = j + 1
                    }
                }
            }
            resolve(seats)
        });
    }
    return { "seats": await getSeats(), "cinemaHallSize": await getCinemaHallSize(), seatsPerRow: await getSeatsPerRow() };
}