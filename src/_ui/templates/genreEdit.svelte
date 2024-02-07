<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { Drawer, Button, CloseButton, Label, Input } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import { sineIn } from "svelte/easing";
  import Swal from "sweetalert2";

  const dispatcher = createEventDispatcher();

  export let genre: any;

  let hidden5 = true;
  let newName = genre.GenreName;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  async function handleUpdate() {
    const res = await fetch(`${apiUrl}/genres`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        GenreName: newName,
        ID: genre.ID,
      }),
    });
    if (res.ok) {
      Swal.fire({
        title: "Success",
        text: "Genre updated successfully",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          input: "rounded-md bg-backgroundBlue text-textWhite",
          title: "text-textWhite bg-backgroundBlue",
          popup: "bg-backgroundBlue",
        },
      });
      dispatcher("update");
    } else {
      Swal.fire({
        title: "Error",
        text: "Genre could not be updated",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          input: "rounded-md bg-backgroundBlue text-textWhite",
          title: "text-textWhite bg-backgroundBlue",
          popup: "bg-backgroundBlue",
        },
      });
    }
    hidden5 = true;
  }

  async function handleDelete() {
    const res = await fetch(`${apiUrl}/genres/${genre.ID}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      Swal.fire({
        title: "Success",
        text: "Genre deleted successfully",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          input: "rounded-md bg-backgroundBlue text-textWhite",
          title: "text-textWhite bg-backgroundBlue",
          popup: "bg-backgroundBlue",
        },
      });
      dispatcher("update");
    } else {
      Swal.fire({
        title: "Error",
        text: "Genre could not be deleted",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          input: "rounded-md bg-backgroundBlue text-textWhite",
          title: "text-textWhite bg-backgroundBlue",
          popup: "bg-backgroundBlue",
        },
      });
    }
  }
</script>

<div class="text-center">
  <Button on:click={() => (hidden5 = false)}
    ><svg
      class="w-5 h-5"
      aria-hidden="true"
      fill="currentColor"
      viewbox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
      />
    </svg></Button
  >
</div>

<Drawer
  placement="left"
  transitionType="fly"
  {transitionParams}
  bind:hidden={hidden5}
  id="sidebar5"
>
  <div class="flex items-center">
    <h5
      id="drawer-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500"
    >
      Change or delete genre
    </h5>
    <CloseButton
      on:click={() => (hidden5 = true)}
      class="mb-4 dark:text-white"
    />
  </div>
  <form action="#" class="mb-6">
    <div class="mb-6">
      <Label for="title" class="block mb-2">Genrename</Label>
      <Input id="title" bind:value={newName} name="title" required />
    </div>
  </form>
  <div class="grid grid-cols-2 gap-4">
    <Button
      color="dark"
      on:click={() => {
        handleUpdate();
      }}>Update</Button
    >
    <Button
      color="red"
      class="px-4"
      on:click={() => {
        handleDelete();
      }}>Delete</Button
    >
  </div>
</Drawer>
