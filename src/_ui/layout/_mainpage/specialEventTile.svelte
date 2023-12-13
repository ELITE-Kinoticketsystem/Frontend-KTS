<script lang="ts">
  import SpecialCard from "../../templates/specialCard.svelte";
  import TextMainSite from "../../templates/textMainSite.svelte";
  import { AuthService } from "$lib/_services/authService";

  const isUserLoggedIn = new AuthService().isUserLoggedIn();

  export let specialMovies: any;
  export let textData: any;
  let randomEvents = Math.floor(Math.random() * specialMovies.length) + 1;
  if (randomEvents + 2 > specialMovies.length) {
    randomEvents = specialMovies.length - 2;
  }
</script>

<div class="flex flex-col w-full h-full">
  <div class="flex">
    <TextMainSite
      href={isUserLoggedIn ? textData.refs[0] : textData.refs[1]}
      text={isUserLoggedIn ? textData.txt[0] : textData.txt[1]}
    />
  </div>

  <div class="w-full h-full flex flex-row gap-x-3">
    <div class="flex w-full hover:scale-105 duration-300">
      <SpecialCard movie={specialMovies[0]} />
    </div>
    <div class="hidden sm:flex w-full hover:scale-105 duration-300">
      <SpecialCard movie={specialMovies[1]} />
    </div>
  </div>
</div>
