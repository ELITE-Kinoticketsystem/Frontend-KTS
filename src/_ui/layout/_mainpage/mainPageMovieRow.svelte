<script lang="ts">
  import MovieRow from "../../templates/movieRow.svelte";
  import TextMainSite from "../../templates/textMainSite.svelte";

  export let moviesToDisplay: any;
</script>

<div class="flex flex-col w-full h-full">
  <div class="flex">
    <TextMainSite
      href="/movies"
      text="See other movies"
    />
  </div>

  <div class="flex md:mx-2 lg:mx-5">
    <MovieRow {moviesToDisplay} />
  </div>
</div>
