<script lang="ts">
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

  export let movie: any;
  export let isActor: boolean = false;
</script>

<a
  class="flex flex-col items-center w-full h-full"
  href={isActor ? "/actors/" + movie.actorId : "/movies/" + movie.ID}
>
  <img
    src={isActor ? movie.imgSrcs[1] : movie.CoverPicURL}
    alt={isActor ? movie.name : movie.Title}
    class="flex h-[90%] w-max rounded-md aspect-auto object-cover mb-4"
    use:lazyImage={{ threshold: 0.5 }}
  />
  <p
    class="flex h-[10%] text-xs sm:text-md lg:text-lg font-bold text-textWhite break-words text-center"
  >
    {isActor ? movie.name : movie.Title}
  </p>
</a>
