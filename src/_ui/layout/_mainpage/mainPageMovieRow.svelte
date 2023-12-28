<script lang="ts">
  import MovieRow from "../../templates/movieRow.svelte";
  import TextMainSite from "../../templates/textMainSite.svelte";

  export let isUserLoggedIn: boolean;
  export let textData: any;
  export let moviesToDisplay: any;
</script>

<div class="flex flex-col w-full h-full">
  <div class="flex">
    <TextMainSite
      href={isUserLoggedIn ? textData.refs[0] : textData.refs[1]}
      text={isUserLoggedIn ? textData.txt[0] : textData.txt[1]}
    />
  </div>

  <div class="flex md:mx-2 lg:mx-5">
    <MovieRow {moviesToDisplay} />
  </div>
</div>
