import { apiUrl } from "$lib/_services/authService";

export const load = async ({ fetch, params }) => {
  async function fetchFirst() {
    const movieData = await fetch(`${apiUrl}/movies`, {
      mode: "cors",
      credentials: "include",
      method: "GET",
    });
    return movieData.json();
  }

  return { movies: await fetchFirst() };
};
