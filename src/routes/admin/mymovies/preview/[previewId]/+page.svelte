<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { Rating } from "flowbite-svelte";

  export let data;

  let previewId: any = data.previewId;
  async function loadDraftItems() {
    return new Promise((resolve, reject) => {
      if (browser) {
        if (window.localStorage.getItem("draft-" + previewId) == null) {
          goto("/admin");
          reject();
        }
        let draftString = window.localStorage
          .getItem("draft-" + previewId)!
          .split(",");

        let movie = {
          movieName: draftString[0] || "Not set",
          src: "https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=",
          rating: 5,
          genre: draftString[7].split(".") || "Not set",
          wallpaper: draftString[5] || "Not set",
          fsk: draftString[1] || "Not set",
          description: draftString[2] || "Not set",
          duration: draftString[4] || "Not set",
          videoId: draftString[3] || "Not set",
          releaseYear: draftString[8] || "Not set",
        };

        resolve(movie);
      }
    });
  }
</script>

<head:svelte>
  <title>Cinemika - Preview </title>
</head:svelte>
{#await loadDraftItems() then movie}
  <div class="flex w-screen h-max">
    <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
    <div class="">
      <div class="flex justify-between text-textWhite mb-2">
        <div class="justify-start text-2xl">Preview movie</div>
        <div class="justify-end space-x-2">
          <button
            class="text-md py-2 px-4 bg-buttonBlue hover:bg-headerBlue rounded-md duration-300 -mt-1"
            on:click={() => {
              window.location.href =
                "/admin/mymovies/add?fromUUID=" + previewId;
            }}>Go back</button
          >
          <button
            class="text-md py-2 px-4 bg-buttonBlue hover:bg-headerBlue rounded-md duration-300 -mt-1"
            >Create now</button
          >
        </div>
      </div>
      <hr />
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="flex flex-col mt-3 p-2 border-2 rounded-md border-textWhite">
        <button>
          <img
            id="player-1"
            src={movie.wallpaper}
            alt="For now"
            class="rounded-lg w-full 2xl:h-[22rem] xl:h-[22rem] sm:h-max md:h-[18rem] h-max"
          />
        </button>
        <div class="flex flex-row mt-14">
          <div class="relative basis-1/3 flex-shrink-0 h-max">
            <img
              src={movie.src}
              alt={movie.movieName}
              class="min-w-full h-auto aspect-auto overflow-hidden rounded-md"
            />
          </div>
          <div class="flex flex-col flex-grow px-5">
            <div
              class="flex flex-col sm:flex-row md:flex-row text-textWhite mx-auto sm:text-md md:text-xl xl:text-2xl 2xl:text-4xl font-bold"
            >
              <p class="break-words">{movie.movieName}</p>

              <a class="mx-auto xl:ml-5 xl:mt-1" href="#review">
                <Rating id="ratingLab" total={5} rating={movie.rating} />
              </a>
            </div>
            <div
              class="flex flex-col sm:flex-row md:flex-row gap-2 text-textWhite mt-5 mx-5 gap-x-5 justify-center"
            >
              <p class="flex text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                  />
                </svg>

                <span class="ml-1">
                  {#each movie.genre as genre, index}
                    {genre}{#if index != movie.genre.length - 1},{/if}
                  {/each}</span
                >
              </p>
              <p class="flex text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span class="ml-1">FSK {movie.fsk}</span>
              </p>
              <p class="flex text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="ml-1">{movie.duration}min</span>
              </p>
              <p class="flex text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                  />
                </svg>

                <span class="ml-1">{movie.releaseYear}</span>
              </p>
            </div>
            <div
              class=" text-textWhite my-5 mx-5 sm:text-sm md:text-md xl:text-xl 2xl:text-2xl break-words text-justify"
            >
              <span class="break-words">{movie.description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  </div>
{/await}
