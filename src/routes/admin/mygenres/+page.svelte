<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { fire } from "$lib/swalTemplate";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  let inputValue = "";
  let genres: any[] = [];
  let indexOfVisibleRing = -1;
  $: genres = genres;

  function getLatestGenres() {
    const data = fetch(`${apiUrl}/genres`, {
      mode: "cors",
      credentials: "include",
    });
    data
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          fire("Genres could not be fetched due to an internal error!", 3000);
          return;
        }
      })
      .then((fetchedGenres) => {
        genres = fetchedGenres;
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
    fetch(
      `${apiUrl}/genres/${
        inputValue.at(0)?.toUpperCase() + inputValue.slice(1)
      }`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        mode: "cors",
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.ok) {
          setTimeout(() => {
            getLatestGenres();
          }, 50);
          fire(`Genre ${inputValue} was created succesfully`, 3000);
        } else {
          fire("Genre couldn't be created due to internal error!", 3000);
        }
      })
      .catch(() => {
        fire("Some error occured when trying to access the database!", 3000);
      });
  }
  function genreAlreadyExists() {
    let genreNames = genres.map((genre) => genre.GenreName.toLowerCase());
    let index = genreNames.findIndex((name) => {
      return name === inputValue.toLowerCase();
    });
    if (index !== -1) {
      fire("This genre already exists!", 1500);
      setTimeout(() => {
        indexOfVisibleRing = index;
      }, 1500);
      setTimeout(() => {
        indexOfVisibleRing = -1;
      }, 3000);
      inputValue = "";
      return true;
    }
    return false;
  }
  function removeButtonWasClicked(genre: any) {
    Swal.fire({
      title: `Are you sure you want to delete '${genre.GenreName}' ?`,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: "#aaaaaa",
      confirmButtonColor: "#89a3be",
      customClass: {
        popup: "bg-tileBlue text-textWhite rounded-lg mt-12",
      },
    }).then((answer) => {
      if (answer.isConfirmed) {
        deleteGenre(genre);
      }
    });
  }
  function deleteGenre(genre: any) {
    fetch(`${apiUrl}/genres/${genre.ID}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    }).then((response) => {
      if (response.status === 200) {
        getLatestGenres();
        setTimeout(() => {
          fire(`${genre.GenreName} was succesfully deleted`, 3000);
        }, 10);
      } else {
        fire(
          `${genre.GenreName} was not deleted due to an internal error!`,
          3000
        );
      }
    });
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
    {#key genres}
      {#each genres as genre, index (index)}
        <div
          class="flex flex-row {index === indexOfVisibleRing
            ? 'ring-2 ring-red-500 ring-inset'
            : ''} items-center justify-between px-[0.4rem] w-full h-[4vh] border-t-[1px] border-white"
        >
          <p class="text-textWhite font-semibold text-[1.2cqw]">
            {genre.GenreName}
          </p>
          <button
            on:click={() => {
              removeButtonWasClicked(genre);
            }}
            class="flex w-[4.5%]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              viewBox="0 0 23 25"
              stroke-width="1.5"
              stroke="#000000"
              class="w-full h-full"
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

      {#if genres.length === 0}
        <div class="w-full border-b-[1px] border-white">
          <p class="text-textWhite font-semibold text-[100%] pl-2">No genres</p>
        </div>
      {/if}
    {/key}
  </div>
</div>
