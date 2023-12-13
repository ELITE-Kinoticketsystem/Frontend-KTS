import type { PageLoad } from "../$types";

export const load: PageLoad = async ({ fetch, depends }) => {
    async function getCinemas() {
        return new Promise((resolve, reject) => {
            let cinemas: any[] = [];
            for(let i = 0; i < Math.floor(Math.random() * 1000) + 1; i++) {
                cinemas.push({
                    status: getRandomStatus(),
                    name: "Cinema " + i,
                    size: getRandomSize(),
                })
            }
            resolve(cinemas);
        });

        function getRandomStatus() {
            let random = Math.floor(Math.random() * 100);
            if(random <= 70) return "success";
            if(random <= 90) return "warning";
            return "error";

        }

        function getRandomSize() {
            return Math.floor(Math.random() * 200) + 100;
        }
    }

    async function buildCinemaData(){
        return new Promise((resolve, reject) => {
            getCinemas().then((cinemas: any) => {
                let cinemasWarning = cinemas.filter((cinema:any) => cinema.status === "warning").length;
                let cinemasSuccess = cinemas.filter((cinema:any) => cinema.status === "success").length;
                let cinemasError = cinemas.filter((cinema:any) => cinema.status === "error").length;
                resolve({
                    labels: ['Error', 'Warning', 'Running'],
                    datasets: [
                      {
                        data: [cinemasError, cinemasWarning, cinemasSuccess],
                        backgroundColor: ['#e80716', '#e3ca0e', '#0eab42'],
                        hoverBackgroundColor: [
                          '#ed3e3e',
                          '#d2f233',
                          '#4ae85d'
                        ],
                      },
                    ],
                });
            });
        });

    }

    async function revenueData(){
        return new Promise((resolve, reject) => {

            let randomData: any[] = [];
            let randomData1: any[] = [];
            for(let i = 0; i < 12; i++) {
                let number = Math.floor(Math.random() * (15000 - 10000) + 10000);
                number *= 31;
                let price = Math.floor(Math.random() * (1550 - 600) + 600);
                randomData.push((number*price)/100);
                randomData1.push(number);
                
            }
            const data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: randomData,
                        backgroundColor: 'green',
                        borderColor: 'white',
                        borderWidth: 1.5,
                        
                    },
                    {
                        label: 'Cinema visted',
                        data: randomData1,
                        backgroundColor: 'orange',
                        borderColor: 'white',
                        borderWidth: 1.5,
                        
                    },
                ],
            };
            resolve(data);
        });
    }

    
    depends('app:newLocation');

    return { cinemaData: await buildCinemaData(), allCinemas: await getCinemas(), revenueData: await revenueData()};
}