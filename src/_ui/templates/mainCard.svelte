<script lang="ts">
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

  export let movie: any;
  export let isActor: boolean = false;
</script>

<!--<a
  class="flex flex-col items-center w-full h-full"
  href={isActor ? "/actors/" + movie.actorId : "/movies/" + movie.ID}
>
  <img
    src={isActor ? movie.imgSrcs[1] : movie.CoverPicURL}
    alt={isActor ? movie.name : movie.Title}
    class="object-cover aspect-auto rounded-md"
    use:lazyImage={{ threshold: 0.5 }}
  />
  <p
    class="flex h-[10%] text-xs sm:text-md lg:text-lg font-bold text-textWhite break-words text-center"
  >
    {isActor ? movie.name : movie.Title}
  </p>
</a>-->
<div class="flex flex-col w-full h-full items-center">
  <div class="flex-none h-[88%] overflow-hidden">
    <img
      class="object-cover aspect-auto rounded-md"
      src={isActor ? movie.imgSrcs[1] : movie.CoverPicURL}
      alt={isActor ? movie.name : movie.Title}
    />
  </div>
  <div class="flex flex-col place-content-evenly w-full h-[12%]">
    <p class="text-center break-wors text-textWhite font-semibold text-[85%]">
      {isActor ? movie.name : movie.Title}
    </p>
  </div>
</div>
