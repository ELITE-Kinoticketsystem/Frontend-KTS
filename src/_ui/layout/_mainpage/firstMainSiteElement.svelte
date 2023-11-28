<script lang="ts">
  import { AuthService } from "$lib/_services/authService";
  import MovieRow from "../../templates/movieRow.svelte";
  import TextMainSite from "../../templates/textMainSite.svelte";

  const authService = new AuthService();

  const isUserLoggedIn = authService.isUserLoggedIn();

  export let moviesToDisplay: any;
</script>

<div class="flex flex-col overflow-y-hidden">
  <div class="flex">
    <TextMainSite
      href={isUserLoggedIn ? "/yourwatchlist" : "/likedbyother"}
      text={isUserLoggedIn ? "Your watchlist" : "Liked by others"}
    />
  </div>

  <div class="flex">
    <MovieRow {moviesToDisplay} />
  </div>
</div>
