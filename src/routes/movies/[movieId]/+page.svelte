<script lang="ts">
  import { page } from "$app/stores";
  import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
  import DropDownMenu from "../../../_ui/templates/dropDownMenu.svelte";
  import MovieRow from "../../../_ui/templates/movieRow.svelte";
  import MainCard from "../../../_ui/templates/mainCard.svelte";
  import Searchbar from "../../../_ui/templates/searchbar.svelte";
  export let data;

  let regions = ["Rheinlandpfalz","Baden-Württemberg","Berlin","Sachsen"];
  let types: string[] = ["2D", "3D", "4D", "5D"];

  const frstDropDownItemType = "Region";
  const sndDropDownItemType = "Typ";
  const maxNrOfMoviesToDisplay = 10;
  let searchBarOpen = false;

  function onFocus() {
    searchBarOpen = true;
  }
  function onBlur() {
    searchBarOpen = false;
  }
  
  let isLast = "bg-gradient-to-r from-white to-black";
  let movie = {"src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp2NuVXpmlEjzTKAnqGIaLyy1jIputsFujvg&usqp=CAU",
    "movieName": "Stephen Curry: Underrated",
    "movieId": "238764346238432",
    "description": "The documentary shows the coming-of-age story of Stephen Curry, one of the most influential players in basketball history. The focus is on his rise from barely mediocre college player to four-time NBA champion.",
    "tags": "funny,goodlooking,beast","fsk":"1"};
  let moviesToDisplay = [movie, movie, movie, movie, movie, movie, movie];
</script>

<div class="">
  <div class="flex flex-col mx-auto max-w-7xl">
    <div class="mx-auto">
      <iframe
        class="rounded-lg"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/NHhTMh0nURA?si=bxOxwt_o6PWZ-5Nb"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>

    <div class="flex flex-row w-full mx-auto">
      <div class="mx-auto basis-1/2">
        <p class="text-textWhite">Movie Pic</p>
      </div>
      <div class=" mx-auto basis-1/2">
        <p class="text-textWhite">Movie description</p>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="">
        <p class="mx-auto my-6 text-xl text-center text-textWhite">
          Please select a cinema to get the showings of the movie
        </p>
      </div>
      <div class="">
        <p class="text-textWhite">THEATRES</p>
      </div>

      <div class="flex flex-row w-full justify-between bg-yellow-200">
        <div class="flex">
          <div class="flex flex-start flex-row">
            <div class="mr-5">
              <DropDownMenu
                color="bg-white"
                items={regions}
                type={frstDropDownItemType}
              />
            </div>
            <div class="">
              <div class="flex">
                <DropDownMenu items={types} type={sndDropDownItemType} />
              </div>
            </div>
          </div>
        </div>

        <div class="flex">
          <Searchbar/>
        </div>
      </div>
      <div class="">
        <div class="my-4 mb-40 ">
          <div class="flex flex-row flex-wrap gap-x-1.6rem gap-y-2 bg-yellow-400">
            {#each moviesToDisplay.slice(0, maxNrOfMoviesToDisplay) as movie}
              <div class="flex flex-none bg-red-400">
                <MainCard {movie} />
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
