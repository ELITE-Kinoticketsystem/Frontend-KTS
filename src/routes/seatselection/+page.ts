let url = "https://cinemika.westeurope.cloudapp.azure.com:8080";

export const load = async ({ fetch, params }) => {
    params = "";
  async function getSeats() {
    const seatData = await fetch(`${url}//events/${params}/seats`, {
      mode: "cors",
    });
    return await seatData.json();
  }

  return { seats: await getSeats() };
};
