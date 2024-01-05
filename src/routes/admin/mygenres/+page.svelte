<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { fire } from "$lib/swalTemplate";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  let inputValue = "";
  let existingGenres: any[] = [];

  async function getLatestGenres() {
    const data = fetch(`${apiUrl}/genres`, {
      mode: "cors",
      credentials: "include",
    });
    data
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          fire("Internal error occured!", 3000);
          return;
        }
      })
      .then((genres) => {
        existingGenres = [];
        genres.forEach((element: any) => {
          existingGenres = [...existingGenres, element.GenreName];
        });
      });
  }

  onMount(() => {
    getLatestGenres();
  });

  function createGenre() {
    if (genreAlreadyExists()) {
      return;
    }

    if (inputValue === "") {
      fire("Genre name can not be empty!", 3000);
      return;
    }
    fetch(`${apiUrl}/genres`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ GenreName: inputValue }),
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          fire(`Genre ${inputValue} was created succesfully`, 3000);
        } else {
          fire("Genre couldn't be created due to internal error!", 3000);
        }
      })
      .catch((error) => {
        fire("Some error occured when trying to access the database!", 3000);
      });
    setTimeout(getLatestGenres, 50);
  }
  function genreAlreadyExists() {
    if (existingGenres.includes(inputValue)) {
      fire("This genre already exists!", 3000);
      return true;
    }
    return false;
  }
</script>

<div class="flex flex-col w-[75%] mx-auto items-center">
  <div
    class="flex flex-row w-full border-b-2 border-white mx-auto justify-between pb-2 mb-6"
  >
    <p class="flex w-[25%] text-textWhite text-center text-3xl font-semibold">
      Create genre
    </p>

    <button
      on:click={createGenre}
      class=" bg-buttonBlue ring-1 ring-white rounded-lg hover:bg-headerBlue px-3 text-textWhite text-xl
      font-semibold duration-300"
    >
      Create now
    </button>
  </div>

  <div class="flex flex-row w-full items-center place-content-evenly mb-[3%]">
    <input
      class="w-1/2 h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
      border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      maxlength="24"
      placeholder="Enter name of new genre..."
      bind:value={inputValue}
      on:keydown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (!genreAlreadyExists()) {
            createGenre();
          }
        }
      }}
      on:blur={genreAlreadyExists}
    />
  </div>

  <div class="flex flex-col w-[50%] items-center bg-backgroundBlue rounded-md">
    <div class="w-full bg-headerBlue pl-2 rounded-t-md">
      <p class="text-textWhite text-[1.2cqw] font-bold">All Genres</p>
    </div>
    {#key existingGenres}
      {#each existingGenres as genre}
        <div
          class="flex flex-row items-center justify-between ring-1 ring-green-400 w-full h-[4vh] border-t-[1px] border-white"
        >
          <p class="ring- text-textWhite font-semibold text-[1.2cqw] pl-2">
            {genre}
          </p>
          <button class="flex w-[5%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              viewBox="4 2 16 20"
              stroke-width="1.5"
              stroke="#000000"
              class="w-[90%] h-[90%]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      {/each}

      {#if existingGenres.length === 0}
        <div class="w-full border-b-[1px] border-white">
          <p class="text-textWhite font-semibold text-[100%] pl-2">No genres</p>
        </div>
      {/if}
    {/key}
  </div>
</div>
