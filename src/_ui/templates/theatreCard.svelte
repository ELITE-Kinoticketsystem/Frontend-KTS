<script lang="ts">
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

  export let theatre: any;
</script>

<div
  class="flex min-h-full flex-col rounded-xl mx-auto w-full max-w-2xl py-12 justify-center bg-[#2A313A] group group-hover:scale-110 duration-300"
>
  <div class="mx-10">
    <img
      src={theatre.Logo}
      alt={theatre.Name}
      class="group-hover:scale-110 duration-300"
      use:lazyImage
    />
  </div>
  <div class="mt-20">
    <p
      class="font-bold text-xl text-textWhite text-center group-hover:scale-110 duration-300 break-words"
    >
      {theatre.Name}
    </p>
    <p
      class="font-bold text-md text-textWhite text-center group-hover:scale-110 duration-300 mt-3"
    >
      {theatre.ID}
    </p>
  </div>
</div>
<!--<div class="flex flex-col">
  <div class="flex">
    <img class="w-2/3 h-full" src={theatre.logo} alt={theatre.name} />
  </div>
  <div class="flex mx-auto mt-3">
    <p class="text-center text-textWhite">{theatre.name}</p>
  </div>
</div>-->
