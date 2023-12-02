<script lang="ts">
  import CinemaTile from "./cinemaTile.svelte";
  export let movie: {
    src: "";
    movieName: "";
    movieId: "";
    tags: "";
    description: "";
    specialEventId: "";
    fsk: "";
  };
</script>

<div class="flex w-full bg-red-500 mx-5">
  <div class="relative">
    <a href="/specialevents/{movie.specialEventId}">
      <img
        src={movie.src}
        alt={movie.movieName}
        class="rounded-xl h-72 w-full min-w-full object-cover overflow-hidden"
      />
      <div
        class="absolute top-0 left-0 h-72 w-auto rounded-lg object-cover overflow-hidden"
      >
        <CinemaTile cinemaCompany="Cineplex" cinemaLocation="Mannheim" />
      </div>
    </a>
  </div>
</div>
