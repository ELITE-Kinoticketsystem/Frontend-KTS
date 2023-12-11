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

<a
  class="relative w-full h-full md:mx-2 lg:mx-5"
  href="/specialevents/{movieCopy.specialEventId}"
>
  <div
    class="absolute inset-y-0 left-0 h-auto w-1/3 sm:w-1/4
    aspect-auto rounded-lg object-cover"
  >
    <CinemaTile cinemaCompany="Cineplex" cinemaLocation="Mannheim" />
  </div>
  <img
    src={movieCopy.src}
    alt={movieCopy.movieName}
    class="rounded-xl min-h-full aspect-auto object-cover"
  />
</a>
