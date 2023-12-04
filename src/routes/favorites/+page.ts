export const load = async ({ fetch, params }) => {

    async function fetchFavoriteMovies(){
        return new Promise((resolve, reject) => {
            resolve([
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Steph Curry: Underrated",
                    "movieId":"1"
                },
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Steph Curry: 3D",
                    "movieId":"2"
                },
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Steph Curry: Legacy",
                    "movieId":"3"
                },
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Steph Curry: Another Movie",
                    "movieId":"4"
                },
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Steph Curry: More Movies",
                    "movieId":"5"
                },
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Movie 6",
                    "movieId":"6"
                },
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Movie 7",
                    "movieId":"7"
                },
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Movie 8",
                    "movieId":"8"
                },
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Movie 9",
                    "movieId":"9"
                },
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Movie 10",
                    "movieId":"10"
                },
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Movie 11",
                    "movieId":"11"
                },
                {
                    "src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm5LkZ7Brqsb1DU_4SOnrGYnGUfuiUOHnTrEeZobuGz0m1slXC",
                    "movieName":"Movie 12",
                    "movieId":"12"
                },
            ])
        });
        
    }
    
    return { favoriteMovies: await fetchFavoriteMovies()};
};