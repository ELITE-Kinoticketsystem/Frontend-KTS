<script lang="ts">
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

  export let movie: any;
  export let isActor: boolean = false;
</script>

<a href={isActor ? "/actors/" + movie.ID : "/movies/" + movie.ID}>
  <div class="flex flex-col w-full h-full items-center justify-between">
    <div class="flex w-full h-[85%] overflow-hidden">
      <img
        class="min-w-full min-h-full object-cover aspect-auto rounded-md"
        src={isActor ? movie.Pictures[0].PicURL : movie.CoverPicURL}
        alt={isActor ? movie.Name : movie.Title}
        loading="lazy"
        use:lazyImage
      />
    </div>
    <div class="flex flex-col place-content-evenly w-full h-[13%]">
      <p
        class=" mx-auto text-[0.9cqw] p-[0.1rem] text-center leading-snug line-clamp-2 text-textWhite font-semibold"
      >
        {isActor ? movie.Name : movie.Title}
      </p>
    </div>
  </div>
</a>
