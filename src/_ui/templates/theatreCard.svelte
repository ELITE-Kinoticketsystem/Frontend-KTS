<script lang="ts">
  export let theatre: any;
</script>

<div class="flex flex-col">
  <div class="flex">
    <img
      class="w-full h-full aspect-auto object-cover rounded-md"
      src={theatre.logo}
      alt="Logo of cinema"
    />
  </div>
  <div class="flex mx-auto mt-3">
    <p class="text-center text-textWhite">{theatre.name}</p>
  </div>
</div>
