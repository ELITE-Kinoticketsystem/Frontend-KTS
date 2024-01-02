let url = "https://cinemika.westeurope.cloudapp.azure.com:8080";

export const load = async ({ fetch, params }) => {
  async function fetchFirst() {
    const movieData = await fetch(`${url}/movies`, {
      mode: "cors",
      credentials: "include",
      method: "GET",
    });
    return movieData.json();
  }

  return { movies: await fetchFirst() };
};
