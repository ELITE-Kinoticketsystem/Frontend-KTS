<script lang="ts">
  import { fire } from "$lib/swalTemplate";
</script>

<div
  class="flex flex-row items-center w-[80%] p-5 mx-auto bg-backgroundBlue ring-1 ring-white rounded-lg"
>
  <button
    class="w-[10%] h-[60vh] mx-auto text-textWhite ring-1 ring-white rounded-md"
    on:click={() => {
      fire("This is the fire message");
    }}
  >
    Fire
  </button>
  <button
    class="w-[10%] h-[60vh] mx-auto text-textWhite ring-1 ring-white rounded-md"
    on:click={() => {
      fire("This is the fire message", 2500);
    }}
  >
    Fire with timer
  </button>
</div>
