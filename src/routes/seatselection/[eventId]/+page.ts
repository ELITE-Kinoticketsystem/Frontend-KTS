import { apiUrl } from "$lib/_services/authService";

export const load = async ({ fetch, params }) => {
  async function getSeats() {
    const seatData = await fetch(`${apiUrl}/events/${params.eventId}/seats`, {
      mode: "cors",
      credentials: "include",
    });

    return await seatData.json();
  }

  return { seats: await getSeats() };
};
