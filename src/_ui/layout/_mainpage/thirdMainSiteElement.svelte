<script lang="ts">
  import SpecialCard from "../../templates/specialCard.svelte";
  import TextMainSite from "../../templates/textMainSite.svelte";
  import { AuthService } from "$lib/_services/authService";

  const isUserLoggedIn = new AuthService().isUserLoggedIn();

  export let specialMovies: any;
  let randomEvents = Math.floor(Math.random() * specialMovies.length) + 1;
  if (randomEvents + 2 > specialMovies.length) {
    randomEvents = specialMovies.length - 2;
  }
</script>

<div class="flex flex-col">
  <div class="flex">
    <TextMainSite
      href={isUserLoggedIn ? "/events" : "/events"}
      text={isUserLoggedIn
        ? "Events in your favorite cinemas "
        : "Events in nearby cinemas"}
    />
  </div>

  <div class="flex">
    {#each specialMovies.slice(randomEvents, randomEvents + 2) as specialMovie}
      <SpecialCard movie={specialMovie} />
    {/each}
  </div>
</div>
