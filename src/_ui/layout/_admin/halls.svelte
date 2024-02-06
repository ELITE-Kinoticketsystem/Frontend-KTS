<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { onMount } from "svelte";
  import Hall from "../../templates/hall.svelte";
  import { goto } from "$app/navigation";

  onMount(async () => {
    const res = await fetch(`${apiUrl}/theatres`);
    const data = await res.json();
  });

  async function loadTheatres() {
    return new Promise(async (resolve, reject) => {
      let theatres: any[] = [];
      await fetch(`${apiUrl}/theatres`)
        .then((res) => res.json())
        .then((data) => {
          theatres = data;
          resolve(theatres);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async function getDataForHalls(id: number) {
    return new Promise(async (resolve, reject) => {
      let halls: any[] = [];
      await fetch(`${apiUrl}/theatres/${id}/cinema-halls`).then((res) => {
        if (!res.ok) {
          reject([]);
        }
        res.json().then((data) => {
          halls = data;
          resolve(halls);
        });
      });
    });
  }
</script>

<div class="mt-10 text-textWhite">
  <button
    class="flex rounded-md px-5 py-5 w-full hover:scale-[1.03] duration-300 bg-tileBlue"
    on:click={() => {
      goto("/admin/mycinemas/add");
    }}
  >
    <div class="flex mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 mr-2 hover:animate-spin duration-300"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      Create new hall
    </div>
  </button>
</div>
<hr class="w-1/3 h-1 bg-textWhite border-0 rounded mx-auto my-5" />
{#await loadTheatres()}
  <!-- Loading -->
{:then theatres}
  <!-- svelte-ignore empty-block -->
  {#each theatres as theatre}
    <div class="rounded-md shadow-md px-2 py-2 mt-5 bg-tileBlue">
      <div class="text-textWhite text-2xl font-semibold mb-2">
        {theatre.Name}
      </div>
      {#await getDataForHalls(theatre.ID)}
        <!-- Loading -->
      {:then halls}
        <div class="grid grid-cols-3 gap-5 py-2 px-2">
          {#each halls as hall}
            <!-- Use the Hall component for each hall -->
            <div class="grid">
              <Hall {hall} />
            </div>
          {/each}
        </div>
      {:catch error}
        <div
          id="toast-simple"
          class="flex items-center mx-auto w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-textWhite bg-headerBlue divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow duration-300 hover:scale-105"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>

          <div class="ps-4 text-sm font-normal">
            There are <b>no</b> halls, associated to that theatre!
          </div>
        </div>
      {/await}
    </div>
  {/each}
{/await}

