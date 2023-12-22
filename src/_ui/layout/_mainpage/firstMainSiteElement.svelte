<script lang="ts">
  import MovieRow from "../../templates/movieRow.svelte";
  import TextMainSite from "../../templates/textMainSite.svelte";

  export let isUserLoggedIn: boolean;
  export let moviesToDisplay: any;
</script>

<div class="flex flex-col w-full h-auto">
  <div class="flex">
    <TextMainSite
      href={isUserLoggedIn ? "/yourwatchlist" : "/likedbyother"}
      text={isUserLoggedIn ? "Your watchlist" : "Liked by others"}
    />
  </div>

  <div class="flex md:mx-2 lg:mx-5 basis-1/3">
    <MovieRow {moviesToDisplay} />
  </div>
</div>
