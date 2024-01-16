import type { PageLoad } from "../$types";

export const load: PageLoad = async ({ fetch, depends }) => {

    async function revenueData(){
        return new Promise((resolve, reject) => {
            depends('app:newLocation');
            let divider = window.localStorage.getItem("admin-view") === "All" ? 1 : 5;
            let randomData: any[] = [];
            let randomData1: any[] = [];
            for(let i = 0; i < 12; i++) {
                let number = Math.floor(Math.random() * (15000 - 10000) + 10000);
                number *= 31;
                let price = Math.floor(Math.random() * (1550 - 600) + 600);
                randomData.push(((number*price)/100) / divider);
                randomData1.push(number / divider);
                
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



    return { revenueData: await revenueData()};
}