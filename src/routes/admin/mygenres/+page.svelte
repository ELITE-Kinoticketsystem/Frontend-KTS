<script lang="ts">
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  let url = "https://cinemika.westeurope.cloudapp.azure.com:8080";
  let inputValue = "";
  let existingGenres: any[] = [];

  async function getLatestGenres() {
    const data = fetch(`${url}/genres`, {
      mode: "cors",
      credentials: "include",
    });
    data
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Swal.fire({
            title: "Internal error occured!",
            timer: 3000,
            confirmButtonColor: "#89a3be",
            customClass: {
              popup: "bg-backgroundBlue text-textWhite text-[100%]",
            },
          });
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
      Swal.fire({
        title: "Genre name can not be empty!",
        timer: 3000,
        confirmButtonColor: "#89a3be",
        customClass: {
          popup: "bg-backgroundBlue text-textWhite text-[100%]",
        },
      });
      return;
    }
    fetch(`${url}/genres`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ GenreName: inputValue }),
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            title: `Genre ${inputValue} was created succesfully`,
            timer: 3000,
            confirmButtonColor: "#89a3be",
            customClass: {
              popup: "bg-backgroundBlue text-textWhite text-[100%]",
            },
          });
        } else {
          Swal.fire({
            title: "Genre couldn't be created due to internal error!",
            timer: 3000,
            confirmButtonColor: "#89a3be",
            customClass: {
              popup: "bg-backgroundBlue text-textWhite text-[100%]",
            },
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Some error occured when trying to access the database!",
          timer: 3000,
          confirmButtonColor: "#89a3be",
          customClass: {
            popup: "bg-backgroundBlue text-textWhite text-[100%]",
          },
        });
      });
    setTimeout(getLatestGenres, 50);
  }
  function genreAlreadyExists() {
    if (existingGenres.includes(inputValue)) {
      Swal.fire({
        title: "This genre already exists!",
        timer: 3000,
        confirmButtonColor: "#89a3be",
        customClass: {
          popup: "bg-backgroundBlue text-textWhite text-[100%]",
        },
      });
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
      class=" bg-buttonBlue ring-1 ring-white rounded-lg hover:bg-headerBlue px-3 text-textWhite text-xl font-semibold"
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
      placeholder="Search for genres..."
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
      <p class="text-textWhite text-[100%] font-bold">Genres</p>
    </div>
    {#key existingGenres}
      {#each existingGenres as genre}
        <div class="w-full border-t-[1px] border-white">
          <p class="text-textWhite font-semibold text-[100%] pl-2">{genre}</p>
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