<script lang="ts">
  import { Img } from "flowbite-svelte";

  export let movie: any;
  export let isActor: boolean = false;
</script>


  <a
    class="flex flex-col w-full items-center h-auto group"
    href={isActor ? "/actors/" + movie.actorId : "/movies/" + movie.movieId}
  >
    <div class="flex mb-2 duration-300 w-32 ">
        <img
          src={isActor ? movie.imgSrcs[1] : movie.src}
          alt={isActor ? movie.name : movie.movieName}
          class="rounded-md min-w-full h-full aspect-auto object-cover"
        />
    </div>
    <div class="flex w-full">
      <p
        class="font-bold text-[15px] text-textWhite break-words text-center group-hover:scale-105 duration-300"
      >
        {isActor ? movie.name : movie.movieName}
      </p>
    </div>
  </a>

