
export const load = async ({ fetch }) => {
    const actData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/actor")
    const data = await actData.json();
    return data[0];
}