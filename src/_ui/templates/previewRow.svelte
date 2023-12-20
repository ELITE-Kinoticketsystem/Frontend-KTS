<script lang="ts">
  export let detail = "";
  export let value: string | number | boolean = "";
  $: {
    detail = detail;
    value = value;
  }
</script>

<div class="w-full h-full flex flex-row justify-between items-center">
  <div class="h-full w-[47%] flex flex-col place-content-evenly">
    <p class="text-textWhite text-center text-[90%] font-bold rounded-md">
      {detail}:
    </p>
  </div>
  <div class="h-full w-[47%] flex flex-col place-content-evenly">
    <p class="text-center text-textWhite font-bold text-[90%] rounded-md">
      {value}
    </p>
  </div>
</div>
