<script lang="ts">
  import Swal from "sweetalert2";
  import DescrInput from "../../../../_ui/templates/descrInput.svelte";
  import EventPreview from "../../../../_ui/templates/eventPreview.svelte";
  import MovieSelector from "../../../../_ui/templates/movieSelector.svelte";
  import PlusButton from "../../../../_ui/templates/plusButton.svelte";
  import PriceForCatSetter from "../../../../_ui/templates/priceForCatSetter.svelte";
  import ShowTimeTool from "../../../../_ui/templates/showTimeTool.svelte";

  export let data: { movies: any };

  let allShowings: any[] = [
    { hallname: "Select a hall", date: "1999-12-09", times: ["12:00"] },
  ];
  let allDbMovies: any[] = data.movies;
  let selectedMovies: any[] = [];
  let prices = { regular: 10, vip: 5, loge: 3 };
  let is3D = false;
  let description = "";
  let eventType = "regular";

  let nrOfShowings = 0;
  let movieNames: any[] = [];
  let descriptionLength = 0;
  let url = "";

  $: {
    allShowings = allShowings;
    selectedMovies = selectedMovies;
    prices = prices;
    is3D = is3D;
    description = description;
    url = url;
    eventType = selectedMovies.length > 1 ? "special" : "regular";

    nrOfShowings = 0;
    for (let i = 0; i < allShowings.length; ++i) {
      nrOfShowings += allShowings[i].times.length;
    }
    movieNames = [];
    for (let i = 0; i < selectedMovies.length; ++i) {
      movieNames.push(selectedMovies.at(i).Title);
    }
    descriptionLength = description.length;
  }

  function createEvent() {
    let obj = {
      allShowings,
      selectedMovies,
      prices,
      is3D,
      description,
      eventType,
    };
  }

  function addPicture() {
    Swal.fire({
      title: "Enter url",
      input: "text",
    }).then((input) => {
      if (input.value === "") {
        Swal.fire({ title: "You have to enter a non empty url" });
        return;
      }

      url = input.value;
    });
  }

  let mouseIsOverCheckbox = false;
</script>

<div class="flex flex-col w-[70%] mx-auto">
  <div
    class="flex flex-row w-full border-b-2 border-white mx-auto justify-between pb-2 mb-6"
  >
    <p class="flex w-[25%] text-textWhite text-center text-3xl font-semibold">
      Create a new event
    </p>

    <button
      on:click={createEvent}
      class=" bg-tileBlue ring-1 ring-white rounded-lg hover:bg-blue-400 px-3 text-textWhite text-xl font-semibold"
    >
      Publish now
    </button>
  </div>

  <div class="flex flex-row gap-x-10 w-full h-[40vh] mb-6">
    <div class="flex-none w-[21%] h-full rounded-md">
      <MovieSelector bind:allDbMovies bind:selectedMovies />
    </div>
    <div class="flex flex-col justify-between w-[20%] h-full">
      <div class="w-full h-[77%] bg-tileBlue ring-1 ring-white rounded-lg">
        <PriceForCatSetter bind:prices />
      </div>
      <div
        class="flex flex-row w-full items-center justify-between p-2 bg-tileBlue ring-1 ring-white rounded-lg"
      >
        <p
          class="w-[70%] text-center text-textWhite font-bold text-[100%] rounded-md bg-slate-500 p-[0.5rem]"
        >
          Supports 3D
        </p>
        <div class="flex flex-row items-center h-[95%] w-[24%] my-auto">
          <input
            on:mouseenter={() => {
              mouseIsOverCheckbox = true;
            }}
            on:mouseleave={() => {
              mouseIsOverCheckbox = false;
            }}
            bind:checked={is3D}
            type="checkbox"
            class="w-auto mx-auto h-full aspect-1 rounded-md ring-1 ring-slate-500"
            style={mouseIsOverCheckbox ? "cursor: pointer" : "cursor: grabbing"}
          />
        </div>
      </div>
    </div>
    <div class="w-[26%] h-full">
      <DescrInput bind:description />
    </div>
    <div class="w-[22%] h-full">
      <EventPreview
        bind:movieNames
        bind:nrOfShowings
        bind:descriptionLength
        bind:is3D
        bind:prices
      />
    </div>
  </div>

  <div
    class="flex flex-row justify-between  gap-x-5 w-full h-[35vh] ring-1 ring-white rounded-lg bg-tileBlue px-4 py-3"
  >
    {#key url}
      <button
        on:click={addPicture}
        class="flex flex-col w-[17%] h-full items-center justify-center hover:bg-blue-400 bg-buttonBlue rounded-md"
      >
        {#if url === ""}
          <div
            class="flex flex-col items-center justify-center w-[80%] h-[80%] mx-auto my-auto"
          >
            <div class="w-[20%] mx-auto rounded-full mb-4">
              <PlusButton />
            </div>
            <p class="text-textWhite text-[100%] font-semibold">
              Add url for picture
            </p>
          </div>
        {:else}
          <img
            class="h-full w-auto object-cover aspect-auto rounded-md"
            src={url}
            alt="Movie of showing"
          />
        {/if}
      </button>
    {/key}

    <div class="w-[85%] h-full overflow-hidden">
      <div class="h-[10%] flex flex-row gap-x-5 mb-2">
        <p class="font-semibold text-center text-2xl text-textWhite">
          Select date:
        </p>
      </div>
      <div class="h-[85%] w-full">
        <ShowTimeTool bind:allShowings />
      </div>
    </div>
  </div>
</div>

<!-- Title: string, start: Date:isoString, end: Date:isoString, description: string, eventType: string, cinemaHallId: uuid, array[movies: uuid],
     array[eventSeatCategories{seatCategoryId: uuid, price: int}], is3D
     https://imageio.forbes.com/specials-images/imageserve/627bdaec36beab21cd23ad21/0x0.jpg
     -->
