<script lang="ts">
  import SpecialCard from "../../templates/specialCard.svelte";
  import TextMainSite from "../../templates/textMainSite.svelte";
  import { AuthService } from "$lib/_services/authService";

  const isUserLoggedIn = new AuthService().isUserLoggedIn();

  export let specialMovies: any;
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
    {#each specialMovies as specialMovie}
      <div class="flex">
        <SpecialCard movie={specialMovie} />
      </div>
    {/each}
  </div>
</div>
