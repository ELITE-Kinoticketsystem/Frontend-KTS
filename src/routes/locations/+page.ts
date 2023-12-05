export const load = async ({ fetch, params }) => {

    async function fetchLocations() {
        return new Promise((resolve, reject) => {
            resolve([
                { city: "Mannheim", country: "Germany", address: "Mannheim 1" },
                { city: "Berlin", country: "Germany", address: "Berlin 2" },
                { city: "Hamburg", country: "Germany", address: "Hamburg 3" },
                { city: "Munich", country: "Germany", address: "Munich 4" },
                { city: "Cologne", country: "Germany", address: "Cologne 5" },
                { city: "Frankfurt", country: "Germany", address: "Frankfurt 6" },
                { city: "Stuttgart", country: "Germany", address: "Stuttgart 7" },
                { city: "Dresden", country: "Germany", address: "Dresden 8" },
                { city: "Leipzig", country: "Germany", address: "Leipzig 9" },
                { city: "Nuremberg", country: "Germany", address: "Nuremberg 10" },
                { city: "Hannover", country: "Germany", address: "Hannover 11" },
                { city: "Bremen", country: "Germany", address: "Bremen 12" },
                { city: "Dusseldorf", country: "Germany", address: "Dusseldorf 13" },
                { city: "Dortmund", country: "Germany", address: "Dortmund 14" },
                { city: "Essen", country: "Germany", address: "Essen 15" },
                { city: "Darmstadt", country: "Germany", address: "Darmstadt 16" },
                { city: "Heidelberg", country: "Germany", address: "Heidelberg 17" },
                { city: "Freiburg", country: "Germany", address: "Freiburg 18" },
                { city: "Kiel", country: "Germany", address: "Kiel 19" },
                { city: "Rostock", country: "Germany", address: "Rostock 20" },
                { city: "Halle", country: "Germany", address: "Halle 21" },
                { city: "Magdeburg", country: "Germany", address: "Magdeburg 22" },
                { city: "Potsdam", country: "Germany", address: "Potsdam 23" },
                { city: "Erfurt", country: "Germany", address: "Erfurt 24" },
                { city: "Wiesbaden", country: "Germany", address: "Wiesbaden 25" },
                { city: "Mainz", country: "Germany", address: "Mainz 26" },
                { city: "Saarbrucken", country: "Germany", address: "Saarbrucken 27" },
                { city: "Munster", country: "Germany", address: "Munster 28" },
                { city: "Augsburg", country: "Germany", address: "Augsburg 29" },
                { city: "Regensburg", country: "Germany", address: "Regensburg 30" },
            ]);
        });
    }
    return { locations: await fetchLocations() };
}