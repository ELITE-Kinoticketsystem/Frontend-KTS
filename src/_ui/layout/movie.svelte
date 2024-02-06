<script lang="ts">
  import { Modal, Button, Input, Label, Textarea } from "flowbite-svelte";

  import { apiUrl } from "$lib/_services/authService";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  export let movie: any;
  export let events: any = null;

  let isCurrentlyRunning = events.length > 0;

  async function fetchActors() {
    return new Promise(async (resolve, reject) => {
      let actors = [];
      const res = await fetch(`${apiUrl}/movies/${movie.ID}`);
      const data = await res.json();
      actors = data.Actors;
      resolve(actors);
    });
  }

  //Update
  let defaultModal = false;

  const handleUpdate = async () => {
    let title = document.getElementById("title")!.value;
    let genres = document.getElementById("genres")!.value;
    let year = document.getElementById("year")!.value;
    let youtubeId = document.getElementById("youtubeId")!.value;
    let fsk = document.getElementById("fsk")!.value;
    let duration = document.getElementById("duration")!.value;
    let wUrl = document.getElementById("wUrl")!.value;
    let cUrl = document.getElementById("cUrl")!.value;
    let description = document.getElementById("description")!.value;

    await fetch(apiUrl + "/movies", {
      method: "PUT",
      body: JSON.stringify({
        ID: movie.ID,
        Title: title,
        Genres: genres,
        ReleaseDate: year,
        TrailerURL: youtubeId,
        Fsk: fsk,
        TimeInMin: duration,
        BannerPicURL: wUrl,
        CoverPicURL: cUrl,
        Description: description,
      }),
    }).then((res) => {
      defaultModal = false;
      if (res.ok) {
        Swal.fire({
          title: "Movie updated",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Movie could not be updated",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    });
  };

  let genres: any[] = [];

  let getLatestShowing: Date = new Date();

  $: diff = Math.abs(getLatestShowing.getTime() - new Date().getTime());
  $: diffInDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  onMount(() => {
    movie.Genres.forEach((genre: any) => {
      genres.push(genre.GenreName);
    });

    if (isCurrentlyRunning) {
      getLatestShowing = new Date(events[events.length - 1].Start);
    }
  });
</script>

<article class="p-6 bg-transparent rounded-lg border border-gray-200 shadow-md">
  <div class="flex justify-between items-center mb-5 text-textWhite">
    <span
      class=" text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded"
    >
      {#if isCurrentlyRunning}
        <svg
          class="mr-1 w-3 h-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
          ></path></svg
        >
        In theatres
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-1 w-3 h-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
        No events
      {/if}
    </span>
    <span class="text-sm"
      >{isCurrentlyRunning
        ? "In theatres for " + diffInDays + " days"
        : ""}</span
    >
  </div>
  <h2 class="mb-2 text-2xl font-bold tracking-tight text-textWhite">
    {movie.Title}
  </h2>
  <p class="mb-5 font-light text-textWhite">
    {movie.Description}
  </p>
  <div class="flex justify-between items-center">
    {#await fetchActors() then actors}
      {#each actors as actor}
        <div class="flex items-center space-x-4">
          <img
            class="w-7 h-7 rounded-full"
            src={actor.ActorPictureUrls}
            alt={actor.Name}
          />
          <span class="font-medium text-textWhite"> {actor.Name} </span>
        </div>
      {/each}
    {/await}
    <button
      on:click={() => (defaultModal = true)}
      class="inline-flex items-center font-medium text-textWhite bg-buttonBlue px-3 py-1 rounded-md duration-300 hover:bg-green-600"
    >
      Edit
    </button>
  </div>
</article>

<Modal title="Edit Movie" bind:open={defaultModal} class="min-w-full">
  <form>
    <div class="grid gap-4 mb-4 sm:grid-cols-2">
      <div>
        <Label for="title" class="mb-2">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder=""
          value={movie.Title}
          required
        />
      </div>
      <div>
        <Label for="genres" class="mb-2">Genres</Label>
        <Input
          type="text"
          disabled
          id="genres"
          placeholder=""
          value={genres.join(", ")}
          required
        />
      </div>
      <div>
        <Label for="year" class="mb-2">Release date</Label>
        <Input
          type="date"
          id="year"
          placeholder=""
          value={movie.ReleaseDate}
          required
        />
      </div>
      <div>
        <Label for="youtubeId" class="mb-2">Youtube watch id</Label>
        <Input
          type="text"
          id="youtubeId"
          placeholder=""
          value={movie.TrailerURL}
          required
        />
      </div>
      <div>
        <Label for="fsk" class="mb-2">Fsk</Label>
        <Input
          type="number"
          id="fsk"
          placeholder=""
          value={movie.Fsk}
          required
        />
      </div>
      <div>
        <Label for="duration" class="mb-2">Duration</Label>
        <Input
          type="number"
          id="duration"
          placeholder=""
          value={movie.TimeInMin}
          required
        />
      </div>
      <div>
        <Label for="wUrl" class="mb-2">Wallpaper URL</Label>
        <Input
          type="url"
          id="wUrl"
          placeholder=""
          value={movie.BannerPicURL}
          required
        />
      </div>
      <div>
        <Label for="cUrl" class="mb-2">Cover URL</Label>
        <Input
          type="url"
          id="cUrl"
          placeholder=""
          value={movie.CoverPicURL}
          required
        />
      </div>
      <div class="sm:col-span-2">
        <Label for="description" class="mb-2">Description</Label>
        <Textarea
          id="description"
          placeholder="Your description here"
          rows="6"
          name="description"
          required
          value={movie.Description}
        />
      </div>
      <div class="flex items-center space-x-4">
        <Button
          type="button"
          class="w-52 duration-300 bg-gray-500 hover:bg-buttonBlue "
          fill
          on:click={handleUpdate}>Update</Button
        >
      </div>
    </div>
  </form>
</Modal>
