export const load = async ({ fetch, params }) => {
    async function fetchFirst()=>{
        const actData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/" + params.actorId);
        const data = await actData.json();
    }
    async function fetchSecond()=>{
        const
    }
 

    const data2 = await fetch("");
    const data2ResJs = await data2.json(); 

    return { fetchFirst() };
}