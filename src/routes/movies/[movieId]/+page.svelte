<script lang="ts">
  import { page } from "$app/stores";
  import DropDownMenu from "../../../_ui/templates/dropDownMenu.svelte";
  import Searchbar from "../../../_ui/templates/searchbar.svelte";
  import TheatreCard from "../../../_ui/templates/theatreCard.svelte";

  export let data;

  let movie: any = data.movie;
  let theatres: any = data.theatres;

  const regions = ["Rheinlandpfalz", "Baden-Württemberg", "Berlin", "Sachsen"];
  const types: string[] = ["2D", "3D", "4D", "5D"];

  const frstDropDownItemType = "Region";
  const sndDropDownItemType = "Typ";
  const maxNrOfTheatresToDisplay = 12;

  movie = {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp2NuVXpmlEjzTKAnqGIaLyy1jIputsFujvg&usqp=CAU",
    movieName: "Stephen Curry Underrated",
    movieId: "1",
    description:
      "The documentary shows the coming-of-age story of Stephen Curry, one of the most influential players in basketball history. The focus is on his rise from barely mediocre college player to four-time NBA champion.",
    tags: "funny,goodlooking,beast",
    fsk: "1",
  };
  let theatre = {"name": "Cineplex", 
  "logo": "https://shop.cineplex.de/media/catalog/product/cache/image/700x560/e9c3970ab036de70892d86c6d221abfe/3/6/3650_1000x700_1.jpg"};
  theatres=[theatre,theatre,theatre,theatre,theatre,theatre,theatre, theatre] 
</script>

<div class="">
  <div class="flex flex-col mx-auto max-w-6xl ">
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

    <div class="flex flex-row w-full mx-auto mt-16">
      <div class="ml-5 basis-1/3">
        <img class="" src={movie.src} alt="Movie" />
      </div>
      <div class="mx-auto basis-2/3">
        <div class="mb-6">
          <h2 class="text-center break-words text-textWhite text-5xl">{movie.movieName}</h2>
        </div>
        <p class="text-textWhite text-center">{movie.description}</p>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="">
        <p class="mx-auto mt-12 mb-10 text-xl text-center text-textWhite">
          Please select a cinema to get the showings of the movie
        </p>
      </div>

      <div class="mt-5 mb-2">
        <p class="text-textWhite">THEATRES</p>
      </div>

      <div class="flex flex-row w-full justify-between">
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
          <Searchbar />
        </div>
      </div>
      <div class="">
        <div class="my-4 mb-40">
          <div class="flex flex-row flex-wrap gap-x-2rem gap-y-1 ">
            {#each theatres.slice(0, maxNrOfTheatresToDisplay) as theatre}
              <div class="flex flex-none ">
                <TheatreCard {theatre}/>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
