<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { Label, Input, Button, Modal } from "flowbite-svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import Swal from "sweetalert2";
  let defaultModal = false;

  let createName = "";

  const dispatcher = createEventDispatcher();

  onMount(() => {
    createName = "";
  });
  const handleSubmit = async () => {
    if (!createName) {
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
    const res = await fetch(`${apiUrl}/genres/${createName}`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      Swal.fire({
        title: "Success",
        text: "Genre created successfully",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          input: "rounded-md bg-backgroundBlue text-textWhite",
          title: "text-textWhite bg-backgroundBlue",
          popup: "bg-backgroundBlue",
        },
      });
      dispatcher("create");
    } else {
      Swal.fire({
        title: "Error",
        text: "Genre could not be created",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          input: "rounded-md bg-backgroundBlue text-textWhite",
          title: "text-textWhite bg-backgroundBlue",
          popup: "bg-backgroundBlue",
        },
      });
    }
    defaultModal = false;
    createName = "";
  };
</script>

<Button
  on:click={() => (defaultModal = true)}
  class="bg-buttonBlue text-textWhite duration-300 hover:bg-headerBlue hover:text-textWhite"
>
  Create Genres
</Button>
<Modal
  title="Genre creation"
  bind:open={defaultModal}
  autoclose
  class="min-w-full"
>
  <h2 class="mb-4 text-xl font-bold text-gray-900">Add a new genre</h2>
  <form>
    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mx-auto w-full">
      <div class="sm:col-span-2">
        <Label for="name" class="mb-2">Actor name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Genre name"
          bind:value={createName}
          required
        />
      </div>
      <Button
        type="button"
        color="dark"
        class="mx-auto w-full duration-300"
        on:click={handleSubmit}
      >
        Add {createName === "" ? "genre" : createName}</Button
      >
    </div>
  </form>
</Modal>
