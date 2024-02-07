<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { Modal, Button, Label, Input, Textarea } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import Swal from "sweetalert2";

  const dispatch = createEventDispatcher();

  let actorName = "";
  let birthdate = "";
  let description = "";

  let hidden = false;

  let pictures: any[] = [];

  const handleSubmit = async () => {
    if (!actorName || !birthdate || !description || pictures.length === 0) {
      Swal.fire({
        title: "Error",
        text: "All fields are required",
        icon: "error",
        confirmButtonText: "Ok",
        customClass: {
          input: "rounded-md bg-backgroundBlue text-textWhite",
          title: "text-textWhite bg-backgroundBlue",
          popup: "bg-backgroundBlue",
        },
      });
      return;
    }
    const res = await fetch(apiUrl + "/actors", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        Name: actorName,
        Birthdate: new Date(birthdate).toISOString(),
        Description: description,
        PicturesUrls: pictures,
      }),
    });
    if (res.ok) {
      Swal.fire({
        title: "Actor created",
        text: "Actor has been created successfully",
        icon: "success",
        confirmButtonText: "Ok",
        customClass: {
          input: "rounded-md bg-backgroundBlue text-textWhite",
          title: "text-textWhite bg-backgroundBlue",
          popup: "bg-backgroundBlue",
        },
      });
      dispatch("actorCreated");
    } else {
      Swal.fire({
        title: "Error",
        text: "An error occurred while creating the actor",
        icon: "error",
        confirmButtonText: "Ok",
        customClass: {
          input: "rounded-md bg-backgroundBlue text-textWhite",
          title: "text-textWhite bg-backgroundBlue",
          popup: "bg-backgroundBlue",
        },
      });
    }
    hidden = false;
    actorName = "";
    birthdate = "";
    description = "";
    pictures = [];
  };
</script>

<Button
  on:click={() => (hidden = true)}
  class="bg-buttonBlue text-textWhite duration-300 hover:bg-headerBlue hover:text-textWhite"
>
  Create Actors
</Button>

<Modal title="Actor creation" bind:open={hidden} autoclose class="min-w-full">
  <h2 class="mb-4 text-xl font-bold text-gray-900">Add a new actor</h2>
  <form>
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mx-auto w-full">
      <div class="sm:col-span-2">
        <Label for="name" class="mb-2">Actor name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Actor name"
          bind:value={actorName}
          required
        />
      </div>
      <div class="sm:col-span-2">
        <Label for="date" class="mb-2">Birthdate</Label>
        <Input
          type="date"
          id="date"
          placeholder="Birthdate"
          required
          bind:value={birthdate}
        />
      </div>
      <div class="sm:col-span-2">
        <Label for="pictures" class="mb-2">Pictures</Label>
        <Input
          type="url"
          id="pictures"
          placeholder="Press enter to save"
          on:keydown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              pictures = [...pictures, e.target.value];
              e.target.value = "";
            }
          }}
          required
        />
      </div>
      <div class="sm:col-span-2 ml-1">
        <p>
          {#each pictures as picture, i}
            {#if i !== pictures.length - 1}
              {#if picture.length > 10}
                {picture.substring(0, 10)}...
              {:else}
                {picture}
              {/if},&nbsp;
            {:else if picture.length > 10}
              {picture.substring(0, 10)}...
            {:else}
              {picture}
            {/if}
          {/each}
        </p>
      </div>
      <div class="sm:col-span-2">
        <Label for="description" class="mb-2">Description</Label>
        <Textarea
          id="description"
          placeholder="Actor description"
          rows="4"
          name="description"
          bind:value={description}
          required
        />
      </div>
      <Button
        type="button"
        color="dark"
        class="mx-auto w-full duration-300"
        on:click={handleSubmit}
        >Add {actorName === "" ? "actor" : actorName}</Button
      >
    </div>
  </form>
</Modal>
