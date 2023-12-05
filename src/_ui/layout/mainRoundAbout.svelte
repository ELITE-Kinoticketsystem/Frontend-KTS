<script lang="ts">
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";

  export let moviesToDisplay: any = [];

  let randomBegin = Math.floor(Math.random() * moviesToDisplay.length) + 1;
  if (randomBegin + 5 > moviesToDisplay.length) {
    randomBegin = moviesToDisplay.length - 5;
  }
</script>

<Splide
  options={{ autoplay: true, rewind: true }}
  hasTrack={false}
  class="relative w-full"
>
  <SplideTrack class="rounded-xl">
    {#each moviesToDisplay.slice(randomBegin, randomBegin + 5) as movie}
      <SplideSlide>
        <a href="/movies/{movie.movieId}">
          <img
            class="w-full sm:h-36 md:h-60 xl:h-96 2xl:h-[32rem] object-cover"
            src={movie.src}
            alt={movie.movieName}
          />
          <div
            class=" absolute bottom-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-75 transition-opacity duration-300"
          >
            <div class="opacity-70 ml-20 h-full flex flex-col justify-between">
              <div class="mx-auto">
                <p
                  class="text-textWhite text-center text-lg font-bold p-4 flex"
                >
                  {movie.movieName}
                </p>
                <hr class="w-72 h-1 bg-textWhite border-0 rounded flex" />
              </div>
              <div class="flex">
                <div class="flex flex-col">
                  <div class="mb-5">
                    <p class="text-textWhite text-left flex">
                      <a href="/movies?age={movie.fsk}"
                        >From age <b>{movie.fsk}</b></a
                      >
                    </p>
                  </div>
                  <p class="text-textWhite text-left flex">
                    {#each movie.genre as gen, index}
                      <a href="/movies?tags={gen}"
                        >#{gen}{index === movie.genre.length - 1
                          ? ""
                          : ", "}&nbsp;</a
                      >
                    {/each}
                  </p>
                  <p class="text-textWhite text-left break-words pb-4 flex">
                    {movie.movieDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </SplideSlide>
    {/each}
  </SplideTrack>
</Splide>
