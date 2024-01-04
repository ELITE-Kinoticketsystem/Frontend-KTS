<script lang="ts">
  import PreviewRow from "./previewRow.svelte";

  export let eventName: String = "";
  export let movieNames = ["Matrix", "Lord of the rings"];
  export let nrOfShowings = 0;
  export let descriptionLength = 0;
  export let prices = { regular: 10, vip: 10, loge: 0 };
  export let is3d = false;

  let displayedMovieNameString = "";

  $: {
    displayedMovieNameString =
      movieNames.length === 0 ? "No movie selected" : movieNames.join(",");
  }

  $: {
    eventName = eventName;
    movieNames = movieNames;
    nrOfShowings = nrOfShowings;
    descriptionLength = descriptionLength;
    prices = prices;
    is3d = is3d;
  }
</script>

<div
  class="w-full h-full flex flex-col items-center place-content-evenly overflow-hidden rounded-lg bg-tileBlue ring-1 ring-white"
>
  <p class="w-full h-[10%] text-center text-textWhite font-bold text-xl">
    Preview
  </p>
  <div class="w-[90%] h-[15%]">
    <PreviewRow
      detail={"Eventname"}
      value={eventName}
      placeholder={"No name"}
    />
  </div>
  <div class="w-[90%] h-[15%]">
    <PreviewRow detail={"Movienames"} bind:value={displayedMovieNameString} />
  </div>
  <div class="w-[90%] h-[15%]">
    <PreviewRow detail={"Number of showings"} bind:value={nrOfShowings} />
  </div>
  <div class="w-[90%] h-[15%]">
    <PreviewRow
      detail={"Length of description"}
      bind:value={descriptionLength}
    />
  </div>
  <div class="w-[90%] h-[15%]">
    <PreviewRow detail={"Supports 3D"} bind:value={is3d} />
  </div>
</div>
