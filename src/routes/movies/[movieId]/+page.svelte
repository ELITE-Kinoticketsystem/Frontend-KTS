<script lang="ts">
  import { page } from "$app/stores";
  import DropDownMenu from "../../../_ui/templates/dropDownMenu.svelte";
  import RatingLabel from "../../../_ui/templates/ratingLabel.svelte";
  import Searchbar from "../../../_ui/templates/searchbar.svelte";
  import TheatreCard from "../../../_ui/templates/theatreCard.svelte";

  export let data;

  let movie: any = data.movie;
  let theatres: any = data.theatres;

  const regions: string[] = ["Rheinlandpfalz", "Baden-Württemberg", "Berlin", "Sachsen"];
  const types: string[] = ["2D", "3D", "4D", "5D"];

  const frstDropDownItemType = "Region";
  const sndDropDownItemType = "Typ";
  const maxNrOfTheatresToDisplay = 12;

  function filterRegion(regionToFilterFor: string){
    let filteredTheatres = [];
    for(let i = 0; i < theatres.length; ++i){
      if(theatres[i].region === regionToFilterFor){ filteredTheatres.push(theatres[i]); }
    }
    theatres = filteredTheatres;
  }
  function filterType(typeToFilterFor: string){
    let filteredTheatres = [];
    for(let i = 0; i < theatres.length; ++i){
      if(theatres[i].supportedTypes.includes(typeToFilterFor)){ filteredTheatres.push(theatres[i]); }
    }
    theatres = filteredTheatres;
  }

  movie = {
    src: "https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=",
    movieName: "Stephen Curry Underrated",
    movieId: "1",
    description:
      "The documentary shows the coming-of-age story of Stephen Curry, one of the most influential players in basketball history.\
       The focus is on his rise from barely mediocre college player to four-time NBA champion. \
       Today he is widely considered to be the greatest shooter to ever play the game of basketball \
       and this documentary shows what it took to get to that point. He is also the father to three children \
       and husband to his wife Ayesha Curry who likes to cook food for a living.",
    tags: "funny,goodlooking,beast",
    fsk: "1",
    rating: 4.9,
  };
  let theatre = {
    name: "Cineplex",
    logo: "https://shop.cineplex.de/media/catalog/product/cache/image/700x560/e9c3970ab036de70892d86c6d221abfe/3/6/3650_1000x700_1.jpg",
    region: "Rheinlandpfalz",
    supportedTypes: ["2D", "3D"]
  };
  theatres = [
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
    theatre,
  ];
</script>

<div class="">
  <div class="flex flex-col mx-auto max-w-6xl">
    <div class="mx-auto">
      <iframe
        class="rounded-lg w-65rem h-26rem"
        src="https://www.youtube.com/embed/NHhTMh0nURA?si=bxOxwt_o6PWZ-5Nb"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>

    <div class="flex flex-row w-full mx-auto mt-16">
      <div class="ml-5 basis-1/3">
        <img
          class="min-w-full h-auto aspect-auto overflow-hidden"
          src={movie.src}
          alt="Movie"
        />
      </div>
      <div class="basis-2/3 flex flex-col justify-evenly mx-auto pl-24">
        <div class=" mb-6">
          <h2 class="text-center break-words mb-4 text-textWhite text-6xl">
            {movie.movieName}
          </h2>
        </div>
        <div class="flex mx-auto">
          <div class="flex flex-col">
            <div class="flex flex-col">
              <p
                class="text-left break-words text-xl font-bold mb-4 text-textWhite"
              >
                Description:
              </p>
              <p class="flex text-textWhite text-center text-xl">
                {movie.description}
              </p>
            </div>
            <div class="mx-auto mt-5">
              <RatingLabel rating={movie.rating} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="">
        <p
          class="mx-auto mt-16 mb-10 text-2xl text-center text-textWhite dark:text-gra"
        >
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
                color="bg-buttonBlue"
                items={regions}
                type={frstDropDownItemType}
                func={filterRegion}
                paramForFunc=""
              />
            </div>
            <div class="">
              <div class="flex">
                <DropDownMenu
                  color="bg-buttonBlue"
                  items={types}
                  type={sndDropDownItemType}
                  func={filterType}
                  paramForFunc=""
                />
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
          <div class="flex flex-row flex-wrap gap-x-2rem gap-y-1">
            {#each theatres.slice(0, maxNrOfTheatresToDisplay) as theatre}
              <div class="flex flex-none">
                <TheatreCard {theatre} />
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
