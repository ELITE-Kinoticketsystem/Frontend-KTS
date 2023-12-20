<script lang="ts">
  import PreviewRow from "./previewRow.svelte";

  export let movieNames = ["Matrix", "Lord of the rings"];
  export let nrOfShowings = 0;
  export let descriptionLength = 0;
  export let prices = { regular: 10, vip: 10, loge: 0 };
  export let is3D = false;
  const maxNrChar = 27;
  let displayedMovieNameString = "";

  $: {
    if (movieNames.length === 0) {
      displayedMovieNameString = "No movie selected";
    } else {
      let joined = movieNames.join(",");
      if (joined.length > maxNrChar) {
        displayedMovieNameString = joined.slice(0, maxNrChar) + "..";
      } else {
        displayedMovieNameString = joined;
      }
    }
  }

  $: {
    movieNames = movieNames;
    nrOfShowings = nrOfShowings;
    descriptionLength = descriptionLength;
    prices = prices;
    is3D = is3D;
  }
</script>

<div
  class="w-full h-full flex flex-col items-center place-content-evenly rounded-lg bg-tileBlue ring-1 ring-white"
>
  <p class="w-full h-[10%] text-center text-textWhite font-bold text-xl">
    Preview
  </p>
  <div class="w-[90%] h-[20%]">
    <PreviewRow detail={"Movienames"} bind:value={displayedMovieNameString} />
  </div>
  <div class="w-[90%] h-[20%]">
    <PreviewRow detail={"Number of showings"} bind:value={nrOfShowings} />
  </div>
  <div class="w-[90%] h-[20%]">
    <PreviewRow
      detail={"Length of description"}
      bind:value={descriptionLength}
    />
  </div>
  <div class="w-[90%] h-[20%]">
    <PreviewRow detail={"Supports 3D"} bind:value={is3D} />
  </div>
</div>
