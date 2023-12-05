<script lang="ts">
  import { AuthService } from "$lib/_services/authService";
  import MovieRow from "../../templates/movieRow.svelte";
  import TextMainSite from "../../templates/textMainSite.svelte";

  const authService = new AuthService();
  const isUserLoggedIn = authService.isUserLoggedIn();

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

