<script lang="ts">
  import MovieRow from "../../templates/movieRow.svelte";
  import TextMainSite from "../../templates/textMainSite.svelte";

  export let isUserLoggedIn: boolean;
  export let moviesToDisplay: any;
</script>

<div class="flex flex-col">
  <div class="flex">
    <TextMainSite
      href={isUserLoggedIn ? "/yoursuggestions" : "/upcomingmovies"}
      text={isUserLoggedIn ? "Your suggestions " : "Upcoming movies "}
    />
  </div>

  <div class="flex mx-0 sm:mx-0 md:mx-2 lg:mx-5">
    <MovieRow {moviesToDisplay} />
  </div>
</div>
