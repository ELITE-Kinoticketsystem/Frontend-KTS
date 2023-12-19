<script lang="ts">
  export let hallname = "";
  hallname = "Select a hall";
  let eligibleHallsAreVisible = 1;
  let hallnames: string[] = ["Cineplex", "Cinestar", "Elias"];

  $: {
    hallname = hallname;
  }

  async function showEligibleHalls() {
    // hallnamedata = await fetch("url");
    // hallnames = await hallnamedata.json();
  }
</script>

<button
  on:click={() => {
    showEligibleHalls();
    ++eligibleHallsAreVisible;
  }}
  class="relative w-full h-full p-1 bg-buttonBlue ring-slate-500 ring-1 rounded-md hover:bg-blue-300"
>
  <p class="text-center text-textWhite text-[100%] font-semibold">
    {hallname}
  </p>
  <div
    class="absolute flex flex-col bottom-0 translate-y-[100.7%] left-0 z-10 w-[100%] min-h-[200%] max-h-[420%]
      overflow-y-scroll ring-1 ring-slate-500 rounded-md
      {eligibleHallsAreVisible % 2 == 0 ? 'flex' : 'hidden'}"
  >
    {#each hallnames as curHallname}
      <button
        class="h-full w-full text-textWhite font- text-[100%] p-1 bg-buttonBlue ring-1 ring-slate-500 hover:bg-blue-300"
        on:mousedown={() => {
          hallname = curHallname;
          ++eligibleHallsAreVisible;
        }}
      >
      {curHallname}
      </button>
    {/each}
  </div>
</button>

<!-- 
  <div
      class="absolute flex flex-col bottom-0 translate-y-[100.7%] left-0 z-10 w-[100%] min-h-[200%] max-h-[420%]
      overflow-y-scroll ring-1 ring-slate-50 rounded-md
      {eligibleMoviePreviewIsVisible ? 'flex' : 'hidden'}"
    >
      {#each moviesEligibleToBeAdded as movie}
        <button
          class="flex flex-row w-full h-full bg-buttonBlue ring-1 ring-slate-50 hover:bg-blue-300"
          on:mousedown={() => {
            movies = [...movies, movie];
            eligibleMoviePreviewIsVisible = false;
          }}
        >
          <img
            class="w-[20%] h-[90%] object-cover aspect-auto my-auto rounded-md p-1"
            src={movie.cover}
            alt="movie preview"
          />
          <p
            class="w-[75%] mx-auto my-auto text-center font-semibold text-[88%] text-textWhite"
          >
            {movie.title}
          </p>
        </button>
      {/each}
    </div> -->
