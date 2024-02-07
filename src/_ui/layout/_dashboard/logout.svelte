<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button, Modal } from "flowbite-svelte";

  let defaultModal = true;
  export let isAdmin: boolean;
</script>

<Modal
  title=""
  bind:open={defaultModal}
  autoclose
  on:close={() => {
    isAdmin ? goto("/adminv2") : goto("/dashboardv2");
  }}
  size="sm"
  class="w-full bg-headerBlue"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-11 h-11 mb-3.5 mx-auto text-red-500"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>

  <p class="mb-4 text-textWhite text-center">
    Are you sure you want to logout?
  </p>
  <div class="flex justify-center items-center space-x-4">
    <Button
      color="light"
      class="duration-300"
      on:click={() => {
        isAdmin ? goto("/adminv2") : goto("/dashboardv2");
      }}>No, cancel</Button
    >
    <Button
      color="red"
      class="duration-300"
      on:click={() => {
        goto("/auth/logout");
      }}>Yes, I'm sure</Button
    >
  </div>
</Modal>
