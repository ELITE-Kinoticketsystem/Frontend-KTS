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
      });
      dispatcher("create");
    } else {
      Swal.fire({
        title: "Error",
        text: "Genre could not be created",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    defaultModal = false;
    createName = "";
  };
</script>

<div class="">
  <Button on:click={() => (defaultModal = true)}>Create Genre</Button>
</div>
<Modal title="Add Genre" bind:open={defaultModal} autoclose class="min-w-full">
  <form on:submit={handleSubmit}>
    <div class="mb-4">
      <Label for="name" class="mb-2">Name</Label>
      <Input
        type="text"
        id="name"
        placeholder="Type new genrename"
        bind:value={createName}
        required
      />
    </div>
    <Button
      type="button"
      class="w-52"
      color="dark"
      on:click={() => {
        handleSubmit();
      }}
    >
      <svg
        class="mr-1 -ml-1 w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        /></svg
      >
      Add new genre
    </Button>
  </form>
</Modal>
