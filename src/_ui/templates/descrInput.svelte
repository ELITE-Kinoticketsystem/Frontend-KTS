<script lang="ts">
  export let Description = "";
</script>

<div class="w-full h-full ring-1 bg-tileBlue ring-white rounded-lg p-2">
  <div class="flex flex-col justify-between w-full h-full">
    <div class="flex flex-col place-content-evenly h-[10%]">
      <p class="text-[150%] text-textWhite font-bold">Description:</p>
    </div>

    <textarea
      class="h-[85%] w-full text-tileBlue text-lg rounded-md"
      placeholder="Here comes your description.."
      bind:value={Description}
    />
  </div>
</div>
