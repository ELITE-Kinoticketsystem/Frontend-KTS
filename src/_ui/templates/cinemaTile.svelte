<script lang="ts">
  import CinemaTile from "$lib/assets/cinemaTile.png";
  import { useLazyImage as lazyImage } from "svelte-lazy-image";
  export let cinemaLocation: string = "";
  export let cinemaCompany: string = "";
</script>

<div
  class="flex flex-col rounded-md sm:rounded-xl items-center w-full h-full mx-auto justify-between bg-[#2A313A] opacity-80"
>
  <img
    src={CinemaTile}
    alt="{cinemaCompany} & {cinemaLocation}"
    class="flex m-6 aspect-auto w-[80%] sm:w-[70%]"
    use:lazyImage
  />

  <div class="flex flex-col items-center mb-1">
    <div class="flex">
      <p class="font-bold text-xs sm:text-lg text-textWhite text-center">
        {cinemaCompany}
      </p>
    </div>
    <div class="flex">
      <p class="font-bold text-xs sm:text-lg text-darkTextWhite text-center">
        {cinemaLocation}
      </p>
    </div>
  </div>
</div>
