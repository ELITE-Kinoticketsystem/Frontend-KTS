let url = "https://cinemika.westeurope.cloudapp.azure.com:8080";

export const load = async ({ fetch, params }) => {
  params = "11ee9fed-864a-27b3-b388-0242ac120002";
  console.log(`${url}/events/${params}/seats`);

  async function getSeats() {
    const seatData = await fetch(`${url}/events/${params}/seats`, {
      mode: "cors",
      credentials: "include",
    });
    
    return await seatData.json();
  }

  return { first: await getSeats() };
};
