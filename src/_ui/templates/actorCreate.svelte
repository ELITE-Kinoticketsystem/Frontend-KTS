<script lang="ts">
  import { Modal, Button, Label, Input, Textarea } from "flowbite-svelte";

  let actorName = "";
  let birthdate = "";
  let description = "";

  let hidden = false;

  const handleSubmit = () => {
    alert("Form submited.");
  };
</script>

<Button
  on:click={() => (hidden = true)}
  class="bg-buttonBlue text-textWhite duration-300 hover:bg-headerBlue hover:text-textWhite"
>
  Create Actors
</Button>

<Modal title="Add actor" bind:open={hidden} autoclose class="min-w-full">
  <h2 class="mb-4 text-xl font-bold text-gray-900">Add a new actor</h2>
  <form on:submit={handleSubmit}>
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
        <Label for="brand" class="mb-2">Birthdate</Label>
        <Input
          type="date"
          id="brand"
          placeholder="Birthdate"
          required
          bind:value={birthdate}
        />
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
      <Button type="submit" color="dark" class="mx-auto w-full duration-300"
        >Add {actorName === "" ? "actor" : actorName}</Button
      >
    </div>
  </form>
</Modal>
