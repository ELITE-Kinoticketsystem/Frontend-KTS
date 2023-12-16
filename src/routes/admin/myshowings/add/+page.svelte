<script lang="ts">
  import ShowTimeTool from "../../../../_ui/templates/showTimeTool.svelte";

  let src =
    "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg";

  let daysOfShowings: any[] = [[{ hours: 1, mins: 12 }]];
</script>

<div class="flex flex-col w-[80%] mx-auto">
  <div
    class="flex flex-row w-full border-b-2 border-white mx-auto justify-between pb-2 mb-8"
  >
    <p class="flex w-[25%] text-textWhite text-center text-3xl font-semibold">
      Create a new event
    </p>

    <button
      class=" bg-tileBlue ring-1 ring-white rounded-lg hover:bg-blue-400 px-3 text-textWhite text-lg font-semibold"
    >
      Publish now
    </button>
  </div>

  <div
    class="flex flex-row justify-between gap-x-5 w-full h-[35vh]"
  >
    <img
      class="w-[15%] h-auto object-contain aspect-auto"
      {src}
      alt="Movie of showing"
    />

    <div class="w-[85%] h-full">
      <div class="h-[10%] flex flex-row gap-x-5">
        <p class="font-semibold text-center text-2xl text-textWhite">
          Select Movie:
        </p>
      </div>
      <div class="h-[90%] w-full">
        <ShowTimeTool bind:daysOfShowings />
      </div>
    </div>
  </div>
</div>

<!-- Title: string, start: Date:isoString, end: Date:isoString, description: string, eventType: string, cinemaHallId: uuid, array[movies: uuid],
     array[eventSeatCategories{seatCategoryId: uuid, price: int}], is3D
     -->
