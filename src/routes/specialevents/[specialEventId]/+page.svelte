<script lang="ts">
  import { goto } from "$app/navigation";
  import { Rating } from "flowbite-svelte";
  import { onMount } from "svelte";

  export let data;
  const specialEvent = data.specialEvent;
  function getHighestFsk() {
    let highestFsk = 0;
    specialEvent.Movies.forEach((movie) => {
      if (movie.Fsk > highestFsk) {
        highestFsk = movie.Fsk;
      }
    });
    return highestFsk;
  }
  function getTotalTimeInMin() {
    let totalTime = 0;
    specialEvent.Movies.forEach((movie) => {
      totalTime += movie.TimeInMin;
    });
    return totalTime;
  }
  function getShowingTime(index: number) {
    let date = new Date(specialEvent.Start);
    let additionTime = 0;
    for (let i = 0; i < index; i++) {
      additionTime += specialEvent.Movies[i].TimeInMin;
    }
    var newDateObj = new Date(date.getTime() + additionTime * 60000);
    return newDateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
</script>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col flex-grow w-max">
    <div class="flex flex-col flex-grow px-5">
      <div
        class="flex flex-col sm:flex-row md:flex-row text-textWhite mx-auto sm:text-md md:text-xl xl:text-2xl 2xl:text-4xl font-bold"
      >
        <p class="break-words">{specialEvent.Title}</p>
      </div>
      <div
        class="flex flex-col sm:flex-row md:flex-row gap-2 text-textWhite mt-5 mx-5 gap-x-5 justify-center"
      >
        <p class="flex text-sm">
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
          <span class="ml-1">FSK {getHighestFsk()}</span>
        </p>
        <p class="flex text-sm">
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
          <span class="ml-1">{getTotalTimeInMin()}min</span>
        </p>
      </div>
      <div
        class=" text-textWhite my-5 mx-5 sm:text-sm md:text-md xl:text-xl 2xl:text-2xl break-words text-justify"
      >
        <span class="break-words">{specialEvent.Description}</span>
      </div>
    </div>

    <ol class="relative border-s border-textWhite">
      {#each specialEvent.Movies as movie, index}
        <li
          class="{index !== specialEvent.Movies.length - 1 ? 'mb-10' : ''} ms-4"
        >
          <div
            class="absolute w-3 h-3 bg-darkTextWhite rounded-full mt-1.5 -start-1.5 border border-textWhite"
          ></div>
          <time class="mb-1 text-sm font-normal leading-none text-textWhite"
            >{index === 0 ? "Start: " : ""}{getShowingTime(index)}</time
          >
          <button
            class="flex flex-row bg-tileBlue rounded-md px-2 py-2 hover:scale-[1.02] duration-300"
            on:click={() => {
              goto(`/movies/${movie.ID}`);
            }}
          >
            <div class="relative basis-1/5 flex-shrink-0 h-max">
              <img
                src={movie.CoverPicURL}
                alt={movie.Title}
                class="min-w-full h-auto aspect-auto overflow-hidden rounded-md"
              />
            </div>
            <div class="flex flex-col">
              <div class="text-2xl font-semibold text-textWhite mx-auto">
                <div class="flex">
                  {movie.Title}
                  <div class="my-auto ml-3">
                    <Rating total={5} rating={movie.Rating} />
                  </div>
                </div>
              </div>
              <p class="my-4 text-base font-normal text-textWhite px-4">
                {#if movie.Description.length > 450}
                  {movie.Description.substring(0, 450)}...
                {:else}
                  {movie.Description}
                {/if}
              </p>
            </div>
          </button>
        </li>
        {#if index === specialEvent.Movies.length - 1}
          <li class="ms-4">
            <div
              class="absolute w-3 h-3 bg-darkTextWhite rounded-full mt-1.5 -start-1.5 border border-textWhite"
            ></div>
            <time class="mb-1 text-sm font-normal leading-none text-textWhite"
              >End: {getShowingTime(2)}</time
            >
          </li>
        {/if}
      {/each}
    </ol>
  </div>
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
