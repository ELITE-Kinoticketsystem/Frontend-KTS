<script lang="ts">
  export let movie: any;
  export let isActor: boolean = false;
</script>

<a
  class="flex flex-col items-center w-full h-full"
  href={isActor ? "/actors/" + movie.actorId : "/movies/" + movie.movieId}
>

    <img
      src={isActor ? movie.imgSrcs[1] : movie.src}
      alt={isActor ? movie.name : movie.movieName}
      class="flex h-[90%] w-max rounded-md aspect-auto object-cover mb-4"
    />
    <p
      class="flex h-[10%] w-max text-xs sm:font-bold text-textWhite break-words text-center"
    >
      {isActor ? movie.name : movie.movieName}
    </p>

</a>
