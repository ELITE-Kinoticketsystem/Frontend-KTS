<script lang="ts">
  import Swal from "sweetalert2";
  import DescrInput from "../../../../_ui/templates/descrInput.svelte";
  import EventPreview from "../../../../_ui/templates/eventPreview.svelte";
  import MovieSelector from "../../../../_ui/templates/movieSelector.svelte";
  import PlusButton from "../../../../_ui/templates/plusButton.svelte";
  import PriceForCatSetter from "../../../../_ui/templates/priceForCatSetter.svelte";
  import ShowTimeTool from "../../../../_ui/templates/showTimeTool.svelte";
  import { apiUrl } from "$lib/_services/authService";
  import { fire } from "$lib/swalTemplate";

  export let data: { movies: any };

  let allShowings: any[] = [
    {
      theatre: { Name: "Select Theatre", ID: "", AddressID: "", LogoURL: null },
      hall: { ID: "", Name: "Select Hall", Capacity: 0, TheatreID: "" },
      date: new Date().toISOString().substr(0, 10),
      times: ["12:00"],
    },
  ];
  let allDbMovies: any[] = data.movies;
  let selectedMovies: any[] = [];
  let eventName = "";
  let prices = { regular: 10.0, vip: 20.0, loge: 15.0 };
  let is3d = false;
  let Description = "";
  let EventType = "regular";

  let nrOfShowings = 0;
  let movieNames: any[] = [];
  let descriptionLength = 0;
  let pictureUrl = "";

  $: {
    allShowings = allShowings;
    selectedMovies = selectedMovies;
    eventName = eventName;
    prices = prices;
    is3d = is3d;
    Description = Description;
    pictureUrl = pictureUrl;
    EventType = selectedMovies.length > 1 ? "special event" : "showing";

    if (selectedMovies.length === 1) {
      eventName = selectedMovies.at(0).Title;
      Description = selectedMovies.at(0).Description;
      pictureUrl = selectedMovies.at(0).CoverPicURL;
    }

    nrOfShowings = 0;
    for (let i = 0; i < allShowings.length; ++i) {
      nrOfShowings += allShowings[i].times.length;
    }
    movieNames = [];
    for (let i = 0; i < selectedMovies.length; ++i) {
      movieNames.push(selectedMovies.at(i).Title);
    }
    descriptionLength = Description.length;
  }

  function allHallsAreValid() {
    if (allShowings === null || allShowings.length === 0) {
      return false;
    }
    for (let i = 0; i < allShowings.length; ++i) {
      if (
        allShowings.at(i).hall === null ||
        allShowings.at(i).hall.ID === null ||
        allShowings.at(i).hall.ID === ""
      ) {
        return false;
      }
    }
    return true;
  }

  function allDatesAreValid() {
    let foundSmthgInvalid = false;
    allShowings.forEach((showing: any) => {
      let ms: any[] = [];
      showing.times.forEach((time: any) => {
        ms.push(new Date(`${showing.date}T${time}`).getTime());
      });

      foundSmthgInvalid =
        foundSmthgInvalid ||
        ms.find((millis: any) => {
          if (millis <= Date.now()) {
            return true;
          }
          return false;
        });
    });

    return !foundSmthgInvalid;
  }

  function createEvent() {
    if (eventName === "") {
      fire("You can not create an event without a name");
      return false;
    }
    if (nrOfShowings === 0) {
      fire("You can not create an event with no showings");
      return false;
    }
    if (!allHallsAreValid()) {
      fire("Not every event has a valid hall!", 3000);
      return;
    }
    if (movieNames.length === 0) {
      fire("You can not create an event with no movies!", 3000);
      return false;
    }
    if (!allDatesAreValid()) {
      fire("Not all dates are in the future!", 3000);
      return false;
    }

    if (pictureUrl === "") {
      Swal.fire({
        title:
          "Are you sure you want to create the event with no title picture?",
        confirmButtonColor: "#89a3be",
        cancelButtonColor: "#222222",
        showCancelButton: true,
        customClass: {
          popup: "bg-backgroundBlue text-textWhite text-[100%]",
        },
      }).then((result) => {
        if (!result.isConfirmed) {
          return;
        }
        allShowings.forEach((showing) => {
          showing.times.forEach((startTime: any) => {
            let Start = `${showing.date}T${startTime}:00.00Z`;

            let accumulatedMovieLength = 0;
            selectedMovies.forEach((element: any) => {
              accumulatedMovieLength += element.TimeInMin;
            });
            let End = new Date(
              new Date(
                new Date(Start).getTime() +
                  new Date().getTimezoneOffset() * 60 * 1000
              ).getTime() +
                accumulatedMovieLength * 60000
            ).toISOString();
            Start = new Date(
              new Date(
                new Date(Start).getTime() +
                  new Date().getTimezoneOffset() * 60 * 1000
              )
            ).toISOString();
            fire("Your event is currently being constructed for you..");
            fetch(`${apiUrl}/events`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                CinemaHallID: showing.hall.ID,
                Description,
                End,
                EventSeatCategories: [
                  {
                    Price: prices.regular * 100,
                    SeatCategoryID: "11EEAA3879BC5F4D81D30242AC120002",
                  },
                  {
                    Price: prices.vip * 100,
                    SeatCategoryID: "11EEAA388565BA7281D30242AC120002",
                  },
                  {
                    Price: prices.loge * 100,
                    SeatCategoryID: "11EEAA388201A99F81D30242AC120002",
                  },
                ],
                EventType,
                is3d,
                Movies: selectedMovies.map((movie: any) => {
                  return movie.ID;
                }),
                Start,
                Title: eventName,
              }),
              mode: "cors",
              credentials: "include",
            }).then((response) => {
              if (response.ok) {
                fire("The event was successfully created!", 3000);
              } else {
                fire(
                  "The event could not be created due to internal problems!",
                  3000
                );
              }
            });
          });
        });
      });
    } else {
      allShowings.forEach((showing) => {
        showing.times.forEach((startTime: any) => {
          let Start = `${showing.date}T${startTime}:00.00Z`;

          let accumulatedMovieLength = 0;
          selectedMovies.forEach((element: any) => {
            accumulatedMovieLength += element.TimeInMin;
          });
          let End = new Date(
            new Date(
              new Date(Start).getTime() +
                new Date().getTimezoneOffset() * 60 * 1000
            ).getTime() +
              accumulatedMovieLength * 60000
          ).toISOString();
          Start = new Date(
            new Date(
              new Date(Start).getTime() +
                new Date().getTimezoneOffset() * 60 * 1000
            )
          ).toISOString();
          fire("Your event is currently being constructed for you..");
          fetch(`${apiUrl}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              CinemaHallID: showing.hall.ID,
              Description,
              End,
              EventSeatCategories: [
                {
                  Price: prices.regular * 100,
                  SeatCategoryID: "11EEAA3879BC5F4D81D30242AC120002",
                },
                {
                  Price: prices.vip * 100,
                  SeatCategoryID: "11EEAA388565BA7281D30242AC120002",
                },
                {
                  Price: prices.loge * 100,
                  SeatCategoryID: "11EEAA388201A99F81D30242AC120002",
                },
              ],
              EventType,
              is3d,
              Movies: selectedMovies.map((movie: any) => {
                return movie.ID;
              }),
              Start,
              Title: eventName,
            }),
            mode: "cors",
            credentials: "include",
          }).then((response) => {
            if (response.ok) {
              fire("The event was successfully created!", 3000);
            } else {
              fire(
                "The event could not be created due to internal problems!",
                3000
              );
            }
          });
        });
      });
    }
  }

  function addPicture() {
    Swal.fire({
      title: "Enter url",
      input: "text",
      confirmButtonColor: "#89a3be",
      customClass: {
        popup: "bg-backgroundBlue text-[100%]",
        input: "rounded-md",
      },
    }).then((input) => {
      if (input.value === "") {
        Swal.fire({
          title: "You have to enter a non empty url",
          confirmButtonColor: "#89a3be",
          customClass: {
            popup: "bg-backgroundBlue text-[100%]",
          },
        });
        return;
      }
      pictureUrl = input.value;
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
      class=" bg-tileBlue ring-1 ring-white rounded-lg hover:bg-blue-400 px-3 text-textWhite text-xl font-semibold duration-300"
    >
      Publish now
    </button>
  </div>

  <div class="flex flex-row gap-x-7 w-full h-[40vh] mb-6">
    <div class="flex-none w-[21%] h-full rounded-md">
      <MovieSelector bind:allDbMovies bind:selectedMovies />
    </div>
    <div class="flex flex-col gap-y-5 w-[28%] h-full">
      <div class="h-[20%] p-2 rounded-lg bg-tileBlue ring-1 ring-white">
        <input
          class="w-full h-full rounded-lg p-2 duration-300 text-sm text-textWhite
      border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          placeholder="Name of the event"
          bind:value={eventName}
        />
      </div>
      <DescrInput bind:Description />
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
            bind:checked={is3d}
            type="checkbox"
            class="w-full mx-auto h-full aspect-1 rounded-md ring-1 ring-slate-500"
            style="{mouseIsOverCheckbox
              ? 'cursor: pointer'
              : 'cursor: grabbing'};"
          />
        </div>
      </div>
    </div>

    <div class="w-[23%] h-full">
      <EventPreview
        bind:eventName
        bind:movieNames
        bind:nrOfShowings
        bind:descriptionLength
        bind:is3d
        bind:prices
      />
    </div>
  </div>

  <div
    class="flex flex-row justify-between gap-x-5 w-full h-[35vh] ring-1 ring-white rounded-lg bg-tileBlue px-4 py-3"
  >
    {#key pictureUrl}
      <button
        on:click={addPicture}
        class="flex flex-col w-[17%] h-full items-center justify-center hover:bg-blue-400 bg-buttonBlue rounded-md duration-300"
      >
        {#if pictureUrl === ""}
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
            src={pictureUrl}
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
