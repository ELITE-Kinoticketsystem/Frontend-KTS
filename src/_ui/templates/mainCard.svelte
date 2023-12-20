<script lang="ts">
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

  export let movie: any;
  export let isActor: boolean = false;
</script>

<a href={isActor ? "/actors/" + movie.ID : "/movies/" + movie.ID}>
  <div class="flex flex-col w-full h-full items-center">
    <div class="flex w-full h-[88%] overflow-hidden">
      <img
        class="min-w-full min-h-full object-cover aspect-auto rounded-md"
        src={isActor ? movie.Pictures[0].PicURL : movie.CoverPicURL}
        alt={isActor ? movie.Name : movie.Title}
        use:lazyImage
      />
    </div>
    <div class="flex flex-col place-content-evenly w-full h-[11%]">
      <p
        class="flex mx-auto text-center text-textWhite font-semibold text-[85%]"
      >
        {isActor ? movie.Name : movie.Title}
      </p>
    </div>
  </div>
</a>
