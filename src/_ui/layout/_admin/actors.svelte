<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import ActorCreate from "../../templates/actorCreate.svelte";

  async function loadActors() {
    return new Promise(async (resolve, reject) => {
      const res = await fetch(`${apiUrl}/actors`);
      const data = await res.json();
      resolve(data);
    });
  }
</script>

{#await loadActors() then actors}
  <div
    class="container mx-auto p-4 bg-tileBlue mt-3 hover:shadow-lg duration-300 rounded-lg"
  >
    <div class="flex justify-between my-2">
      <div class="mb-3 text-textWhite text-3xl font-extrabold">Your actors</div>
      <div class="justify-end"><ActorCreate /></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each actors as actor}
        <div
          class="bg-headerBlue rounded-lg hover:shadow-lg p-4 text-textWhite hover:scale-[103%] duration-300"
        >
          <img
            src={`${actor.Pictures[0].PicURL}`}
            alt={actor.Name}
            class="mx-auto rounded-lg mb-4 object-cover w-1/2 h-2/3"
          />
          <p class="font-bold text-lg">{actor.Name}</p>
          <p class="text-sm mb-2 text-gray-400">
            {new Date(actor.Birthdate).toLocaleDateString()}
          </p>
          <p class="text-sm">{actor.Description}</p>
        </div>
      {/each}
    </div>
  </div>
{/await}
