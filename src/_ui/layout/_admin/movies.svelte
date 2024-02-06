<script lang="ts">
  import { goto } from "$app/navigation";
  import { apiUrl } from "$lib/_services/authService";
  import EventTable from "../../templates/eventTable.svelte";
  import Movie from "../movie.svelte";

  async function loadAllMovies() {
    return new Promise(async (resolve, reject) => {
      let movies: any[] = [];
      await fetch(`${apiUrl}/movies/genres`)
        .then((res) => res.json())
        .then((data) => {
          movies = data;
          resolve(movies);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async function getAllTheatres() {
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

  async function getDataForEvents(movieId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let eventPromises: any[] = [];
        let allEvents: any[] = [];
        const theatres = await getAllTheatres();
        for (let theatre of theatres) {
          let id = theatre.ID;
          eventPromises.push(
            new Promise(async (resolve, reject) => {
              try {
                const res = await fetch(
                  `${apiUrl}/movies/${movieId}/events/${id}`
                );
                const data = await res.json();
                if (res.ok) {
                  if (data !== null) {
                    allEvents = [...allEvents, ...data];
                  }
                  resolve(data);
                } else {
                  reject(
                    `Fehler beim Abrufen von Ereignissen für Theater ${id}`
                  );
                }
              } catch (err) {
                reject(err);
              }
            })
          );
        }
        await Promise.all(eventPromises).then((events) => {
          resolve(allEvents);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
</script>

<div class="mt-10 text-textWhite">
  <button
    class="flex rounded-md px-5 py-5 w-full hover:scale-[1.03] duration-300 bg-tileBlue"
    on:click={() => {
      goto("/admin/mymovies/add");
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
      Create new movie
    </div>
  </button>
</div>
<hr class="w-1/3 h-1 bg-textWhite border-0 rounded mx-auto my-5" />
{#await loadAllMovies()}
  <!-- Loading -->
{:then movies}
  <!-- svelte-ignore empty-block -->
  {#each movies as movie}
    <div class="rounded-md shadow-md px-2 py-2 mt-5 bg-tileBlue">
      {#await getDataForEvents(movie.ID)}
        <!-- Loading -->
      {:then events}
        <Movie {movie} {events} />
        {#if events.length > 0}
          <div class="w-full py-2 px-2">
            <!-- Use the Hall component for each hall -->
            <EventTable {events}  />
          </div>
        {:else}
          <div
            id="toast-simple"
            class="flex items-center mx-auto w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-textWhite bg-headerBlue divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow duration-300 hover:scale-105 mt-5"
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
              There are <b>no</b> events, associated to that movie!
            </div>
          </div>
          <div class="mt-3 text-textWhite">
            <button
              class="flex rounded-md px-5 py-5 w-full hover:scale-[1.03] duration-300 bg-tileBlue"
              on:click={() => {
                goto("/admin/myshowings/add");
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
                Create new showing
              </div>
            </button>
          </div>
        {/if}
      {/await}
    </div>
  {/each}
{/await}
