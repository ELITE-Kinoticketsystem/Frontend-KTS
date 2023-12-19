<script lang="ts">
  import DescrInput from "../../../../_ui/templates/descrInput.svelte";
  import MovieSelector from "../../../../_ui/templates/movieSelector.svelte";
  import PriceForCatSetter from "../../../../_ui/templates/priceForCatSetter.svelte";
  import ShowTimeTool from "../../../../_ui/templates/showTimeTool.svelte";

  let src =
    "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg";

  let allShowings: any[] = [{ date: "1999-12-09", times: ["12:00"] }];
  let movies: any[] = [];
  let prices = { regular: 10, vip: 5, loge: 3 };
  let is3D = false;
  let description = "Here comes your description..";
  let eventType = "regular";

  $: {
    allShowings = allShowings;
    console.log(allShowings);
    movies = movies;
    prices = prices;
    is3D = is3D;
    description = description;
    eventType = movies.length > 1 ? "special" : "regular";
  }
</script>

<div class="flex flex-col w-[85%] mx-auto">
  <div
    class="flex flex-row w-full border-b-2 border-white mx-auto justify-between pb-2 mb-6"
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

  <div class="flex flex-row gap-x-10 w-full h-[40vh] mb-6">
    <div class="w-[17%] h-full rounded-md">
      <MovieSelector bind:movies />
    </div>
    <div class="flex flex-col justify-between w-[20%] h-full">
      <div
        class="w-full h-[77%] bg-backgroundBlue ring-1 ring-white rounded-lg"
      >
        <PriceForCatSetter bind:prices />
      </div>
      <div
        class="flex flex-row w-full items-center justify-between p-2 bg-backgroundBlue ring-1 ring-white rounded-lg"
      >
        <p
          class="w-[66%] text-center text-textWhite font-bold text-xl rounded-md bg-slate-500 py-[0.6rem]"
        >
          Supports 3D
        </p>
        <div class="w-[30%] flex flew-row items-center">
          <input
            bind:checked={is3D}
            type="checkbox"
            class="w-[40%] mx-auto h-auto aspect-1 rounded-md ring-1 ring-slate-500"
          />
        </div>
      </div>
    </div>
    <div class="w-[40%] h-full">
      <DescrInput bind:description />
    </div>
    <div class="w-[16%] h-full">
      <p class="bg-backgroundBlue w-full h-full ring-1 ring-white rounded-lg">
        Ace
      </p>
    </div>
  </div>

  <div
    class="flex flex-row justify-between gap-x-5 w-full h-[35vh] ring-1 ring-white rounded-lg bg-backgroundBlue px-4 py-3"
  >
    <img
      class="w-[14%] my-2 h-auto object-cover aspect-auto rounded-md"
      {src}
      alt="Movie of showing"
    />

    <div class="w-[85%] h-full">
      <div class="h-[10%] flex flex-row gap-x-5">
        <p class="font-semibold text-center text-2xl text-textWhite">
          Select date:
        </p>
      </div>
      <div class="h-[90%] w-full">
        <ShowTimeTool bind:allShowings />
      </div>
    </div>
  </div>
</div>

<!-- Title: string, start: Date:isoString, end: Date:isoString, description: string, eventType: string, cinemaHallId: uuid, array[movies: uuid],
     array[eventSeatCategories{seatCategoryId: uuid, price: int}], is3D
     -->
