<script lang="ts">
  import CinemaTile from "./cinemaTile.svelte";
  export let movie: {
    src: string;
    movieName: "";
    movieId: "";
    tags: "";
    description: "";
    specialEventId: "";
    fsk: "";
  };

  let movieCopy = JSON.parse(JSON.stringify(movie));
  movieCopy.src =
    "https://www.apple.com/tv-pr/shows-and-films/s/stephen-curry-underrated/images/show-home-graphic-header/key-art-01/4x1/Apple_TV_Stephen_Curry_Underrated_key_art_graphic_header_4_1_show_home.jpg.large_2x.jpg";
</script>

<div class="flex w-full mx-0 sm:mx-0 md:mx-2 lg:mx-5 group duration-300">
  <div class="relative">
    <a href="/specialevents/{movieCopy.specialEventId}">
      <img
        src={movieCopy.src}
        alt={movieCopy.movieName}
        class="rounded-xl h-72 w-full min-w-full object-cover overflow-hidden group-hover:scale-105 duration-300"
      />
      <div
        class="absolute top-0 left-0 h-72 w-auto rounded-lg object-cover overflow-hidden group-hover:scale-105 duration-300 group-hover:-translate-x-3"
      >
        <CinemaTile cinemaCompany="Cineplex" cinemaLocation="Mannheim" />
      </div>
    </a>
  </div>
</div>
