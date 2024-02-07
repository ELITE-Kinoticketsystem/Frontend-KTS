<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { Modal, Button, Label, Input, Textarea } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import Swal from "sweetalert2";

  const dispatch = createEventDispatcher();

  let Name = "";
  let LogoUrl = "";
  let Street = "";
  let StreetNr = "";
  let City = "";
  let Zipcode = "";
  let Country = "";

  let hidden = false;

  const handleSubmit = async () => {
    if (
      !Name ||
      !LogoUrl ||
      !Street ||
      !StreetNr ||
      !City ||
      !Country ||
      !Zipcode ||
      !LogoUrl
    ) {
      Swal.fire({
        title: "Error",
        text: "All fields are required",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    const res = await fetch(`${apiUrl}/theatres`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        Name,
        LogoUrl,
        Address: {
          Street,
          StreetNr,
          Zipcode,
          City,
          Country,
        },
      }),
    });
    if (res.ok) {
      Swal.fire({
        title: "Success",
        text: "Theatre created successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      dispatch("create");
    } else {
      Swal.fire({
        title: "Error",
        text: "Theatre could not be created",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
</script>

<Button
  on:click={() => (hidden = true)}
  class="flex mb-10 rounded-md px-5 py-5 w-full hover:scale-[1.03] duration-300 bg-tileBlue"
>
  <div class="flex mx-auto">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 mr-2 hover:animate-spin duration-300"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
    Create new theatre
  </div>
</Button>

<Modal
  title="Theatre creation"
  bind:open={hidden}
  autoclose
  class="min-w-full "
>
  <h2 class="mb-4 text-xl font-bold text-gray-900">Add a theatre</h2>
  <form>
    <div class="grid gap-4 mb-4 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <Label for="name" class="mb-2">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Name"
          bind:value={Name}
          required
        />
      </div>
      <div>
        <Label for="hn" class="mb-2">Postalcode</Label>
        <Input
          type="text"
          id="hn"
          placeholder="Postalcode"
          bind:value={Zipcode}
          required
        />
      </div>
      <div>
        <Label for="city" class="mb-2">City</Label>
        <Input
          type="text"
          id="city"
          placeholder="City"
          bind:value={City}
          required
        />
      </div>
      <div>
        <Label for="street" class="mb-2">Street</Label>
        <Input
          type="text"
          id="street"
          placeholder="Street"
          bind:value={Street}
          required
        />
      </div>
      <div>
        <Label for="hn" class="mb-2">Housenumber</Label>
        <Input
          type="text"
          id="hn"
          placeholder="Housenumber"
          bind:value={StreetNr}
          required
        />
      </div>
      <div class="sm:col-span-2">
        <Label for="count" class="mb-2">Country</Label>
        <Input
          type="text"
          id="count"
          placeholder="Country"
          bind:value={Country}
          required
        />
      </div>
      <div class="sm:col-span-2">
        <Label for="pictures" class="mb-2">Theatre picture</Label>
        <Input
          type="text"
          id="pictures"
          placeholder="Picture"
          bind:value={LogoUrl}
          required
        />
      </div>
      <Button type="submit" class="w-52" color="dark" on:click={handleSubmit}>
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
        Add {Name === "" ? "theatre" : Name}
      </Button>
    </div>
  </form>
</Modal>
