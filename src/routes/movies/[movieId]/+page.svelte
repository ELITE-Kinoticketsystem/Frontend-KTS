<script lang="ts">
  import { page } from "$app/stores";
  import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
  import DropDownMenu from "../../../_ui/templates/dropDownMenu.svelte";
  import MovieRow from "../../../_ui/templates/movieRow.svelte";
  export let data;
  let regions: string[] = [
    "Rheinlandpfalz",
    "Baden-Württemberg",
    "Berlin",
    "Sachsen",
  ];
  let types: string[] = ["2D", "3D", "4D", "5D"];

  let frstDropDownItemType = "Region";
  let sndDropDownItemType = "Typ";

  function onFocus() {
    searchBarOpen = true;
  }
  function onBlur() {
    searchBarOpen = false;
  }
  let searchBarOpen = false;
  let isLast = "bg-gradient-to-r from-white to-black";
  let movie = {"src": "https://www.apple.com/tv-pr/shows-and-films/s/stephen-curry-underrated/images/show-home-graphic-header/key-art-01/4x1/Apple_TV_Stephen_Curry_Underrated_key_art_graphic_header_4_1_show_home.jpg.large_2x.jpg",
    "movieName": "Stephen Curry: Underrated",
    "movieId": "238764346238432",
    "movieDescription": "The documentary shows the coming-of-age story of Stephen Curry, one of the most influential players in basketball history. The focus is on his rise from barely mediocre college player to four-time NBA champion.",
    "tags": [
      "Documentary",
      "Sports",
      "Basketball"]};
  let moviesToDisplay = [movie, movie, movie, movie, movie];
</script>

<div class="">
  <div class="flex flex-col mx-auto max-w-6xl">
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
        <p>Movie Pic</p>
      </div>
      <div class=" mx-auto basis-1/2">
        <p>Movie description</p>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="">
        <p class="mx-auto text-center text-textWhite">
          Please select a cinema to get the showings of the movie
        </p>
      </div>
      <div class="">
        <p>THEATRES</p>
      </div>

      <div class="flex flex-row w-full h-fit">
        <div class="flex basis-1/2">
          <div class="flex flex-start flex-row">
            <div class="ml-3 mr-5">
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

        <div class="flex basis-1/2">
          <div class="ml-auto mr-3">
            <div class="relative">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-textWhite"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                on:focus={onFocus}
                on:blur={onBlur}
                class="block p-2 ps-10 {searchBarOpen
                  ? `w-96`
                  : 'w-40'} duration-300 text-sm text-textWhite border border-gray-300 rounded-lg bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder={searchBarOpen
                  ? "longSearchBarText"
                  : "shortSearchBarText"}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mx-3">
        <div class="my-4 mb-60">
          <MovieRow {moviesToDisplay} />
        </div>
        <div class="my-4">
          <MovieRow {moviesToDisplay} />
        </div>
      </div>
    </div>
  </div>
</div>
