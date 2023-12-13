export const load = async ({ fetch, params }) => {

    async function fetchTickets(){
        return new Promise((resolve, reject) => {
            //params.eventId, and user token:
            let returnVal = [];
            for(let i = 0; i < Math.floor(Math.random() * 10) +1; i++){
                returnVal.push(uuidv4());
            }
            resolve(returnVal);
            
        });
    }


    return { tickets: await fetchTickets() };
}

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }