<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  let orders: any;
  async function getAllOrders() {
    const orderResponse = await fetch(apiUrl + "/orders", {
      credentials: "include",
      method: "GET",
      mode: "cors",
    });
    const orderJson = await orderResponse.json();
    return orderJson;
  }

  async function getFavActors() {
    return new Promise(async (resolve, reject) => {
      orders = await getAllOrders();
      try {
        let actors = new Map();
        let actorImgs = new Map();
        let moviePromises: any[] = [];
        orders.forEach((order: any) => {
          order.Movies.forEach((movie: any) => {
            moviePromises.push(
              (async () => {
                const movieResponse = await fetch(
                  apiUrl + "/movies/" + movie.ID,
                  {
                    credentials: "include",
                    method: "GET",
                    mode: "cors",
                  }
                );

                const movieData = await movieResponse.json();
                if (movieData.Actors !== null) {
                  movieData.Actors.forEach((actor) => {
                    if (actors.has(actor.Name)) {
                      actors.set(actor.Name, actors.get(actor.Name) + 1);
                    } else {
                      actors.set(actor.Name, 1);
                      actorImgs.set(actor.Name, actor.ActorPictureUrls);
                    }
                  });
                }
              })()
            );
          });
        });
        await Promise.all(moviePromises).then(() => {
          actors = new Map([...actors.entries()].sort((a, b) => b[1] - a[1]));
          let actorArray = Array.from(actors.keys());
          actorArray = actorArray.splice(0, 3);
          let actorWithPictureArray = [];
          actorArray.forEach((actor) => {
            actorWithPictureArray.push({
              name: actor,
              img: actorImgs.get(actor),
            });
          });
          resolve(actorWithPictureArray);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
</script>

{#await getFavActors() then favActors}
  <div class="flex justify-center max-w-2xl mx-auto space-x-10">
    <div class="flex flex-col items-center relative">
      <img
        src={favActors[1].img}
        alt={favActors[1].name}
        class="rounded-full w-16 h-16 mb-2 absolute -top-8"
      />
      <div class="bg-gray-700 text-white p-6 rounded-md shadow-md mt-4">
        <div class="flex flex-col mx-auto">
          <span class="text-3xl font-bold mb-2 mx-auto">2</span>
          <p class="text-lg font-semibold">{favActors[1].name}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center relative">
      <img
        src={favActors[0].img}
        alt={favActors[0].name}
        class="rounded-full w-16 h-16 mb-2 absolute -top-12"
      />
      <div class="bg-yellow-500 text-white p-8 rounded-md shadow-md">
        <div class="flex flex-col mx-auto">
          <span class="text-3xl font-bold mb-2 mx-auto">1</span>
          <p class="text-lg font-semibold">{favActors[0].name}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center relative">
      <img
        src={favActors[2].img}
        alt={favActors[2].name}
        class="rounded-full w-16 h-16 mb-2 absolute -top-4"
      />
      <div class="bg-orange-500 text-white p-4 rounded-md shadow-md mt-8">
        <div class="flex flex-col mx-auto">
          <span class="text-3xl font-bold mb-2 mx-auto">3</span>
          <p class="text-lg font-semibold">{favActors[2].name}</p>
        </div>
      </div>
    </div>
  </div>
{/await}
