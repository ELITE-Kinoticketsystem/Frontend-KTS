<script lang="ts">
  export let movie: any;
</script>

<div class="w-full h-full group bg-red-700">
  <a class="flex flex-col group-hover:scale-105" href="/movies/{movie.movieId}">
    <div class="flex mb-5 opacity-100 duration-300 bg-red-500">
      <img src={movie.src} alt={movie.name} />
    </div>
    <div class="flex bg-green-300">
      <p
        class="font-bold text-sm text-textWhite break-words text-center duration-300"
      >
        {movie.movieName}
      </p>
    </div>
  </a>
</div>
