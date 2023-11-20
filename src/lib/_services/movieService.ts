export class MovieService {

    public static async getMovieFromId(movieId: string): Promise<any> {
        return {
            src: "https://www.apple.com/tv-pr/shows-and-films/s/stephen-curry-underrated/images/show-home-graphic-header/key-art-01/4x1/Apple_TV_Stephen_Curry_Underrated_key_art_graphic_header_4_1_show_home.jpg.large_2x.jpg",
            movieName: "Stephen Curry: Underrated",
            movieId: this.generateUUID(),
            movieDescription: "The documentary shows the coming-of-age story of Stephen Curry, one of the most influential players in basketball history. The focus is on his rise from barely mediocre college player to four-time NBA champion.",
            tags: ["Documentary", "Sports", "Basketball"],
            fsk: 0,
        };
    }

    public static async getActorFromId(actorId: string): Promise<any> {
        return {
            src: "	https://media.kinoheld.de/gmvnQ8PfeT0zWxOikDp2cuCq…%2Ftransformers-aufstieg-der-bestien-45591.v1.jpg",
            fullName: "Full Name",
            awards: [{
                nrOfWins: 3,
                awardName: "Oscar",
            }],
            about: "This is the description about an actor",
            movieIds : ["Steph", "is ", "GOAT"],
        }
    }

    private static generateUUID(): string {
        let d = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    public static async getLikedMovies(): Promise<any> {
        return [{
            movieId: this.generateUUID(),
        }, {
            movieId: this.generateUUID(),
        }, {
            movieId: this.generateUUID(),
        }, {
            movieId: this.generateUUID(),
        },];
    }
}