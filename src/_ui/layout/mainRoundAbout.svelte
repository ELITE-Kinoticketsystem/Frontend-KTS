<script lang="ts">
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
  import { onMount } from "svelte";
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

  export let moviesToDisplay: any[] = [];

  const maxLength = 500;

  let copiedMovies = [...moviesToDisplay];

  copiedMovies.forEach((movies) => {
    if (movies.Description.length > maxLength) {
      movies.Description =
        movies.Description.substring(0, maxLength) +
        "<span class='text-buttonBlue hover:text-darkTextWhite duration-300'> [Read more]</span>";
    }
    if (movies.Genres === null) {
      movies.Genres = [
        { GenreName: "Please contact your daniel.hajnal@sap.com" },
      ];
    }
  });

  function getYear(dateTime: string): string {
    const date = parseISOString(dateTime);
    return date.getFullYear().toString();
  }
  function parseISOString(s: string) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
</script>

<Splide
  options={{ autoplay: true, rewind: true }}
  hasTrack={false}
  class="relative w-full group"
>
  <SplideTrack class="rounded-xl group">
    {#each copiedMovies.splice(Math.floor(Math.random() * copiedMovies.length), copiedMovies.length) as movie}
      <SplideSlide>
        <a href="/movies/{movie.ID}">
          <img
            use:lazyImage
            class="w-full sm:h-36 md:h-60 xl:h-96 2xl:h-[32rem] object-cover group"
            src={movie.BannerPicURL}
            alt={movie.Title}
          />
          <div
            class="absolute bottom-0 left-0 w-full h-full bg-backgroundBlue opacity-0 group-hover:opacity-90 transition-opacity duration-300"
          >
            <div class="grid grid-cols-2 px-5 py-5 mt-8">
              <div class="grid">
                <img
                  src={movie.CoverPicURL}
                  alt={movie.Title}
                  class="w-min h-full max-h-[80%] mx-auto rounded-md"
                />
              </div>
              <div class="text-textWhite text-center mx-auto pr-16">
                <p class="text-3xl mb-2">{movie.Title}</p>
                <p class="flex text-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                    />
                  </svg>

                  <span class="ml-1">
                    {#each movie.Genres as genre, index}
                      {genre.GenreName}{#if index != movie.Genres.length - 1},{/if}
                    {/each}</span
                  >
                </p>
                <p class="flex text-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  <span class="ml-1">FSK {movie.Fsk}</span>
                </p>
                <p class="flex text-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="ml-1">{movie.TimeInMin}min</span>
                </p>
                <p class="flex text-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                    />
                  </svg>

                  <span class="ml-1">{getYear(movie.ReleaseDate)}</span>
                </p>
                <div class=" text-textWhite text-md break-words text-justify">
                  <span class="break-words">{@html movie.Description}</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </SplideSlide>
    {/each}
  </SplideTrack>
</Splide>
