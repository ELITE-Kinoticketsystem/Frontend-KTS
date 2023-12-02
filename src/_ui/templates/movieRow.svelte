<script lang="ts">
  import MainCard from "./mainCard.svelte";
  export let moviesToDisplay: any;
</script>

<div class="relative flex overflow-y-scroll">
  {#each moviesToDisplay as movie}
    <div class="mr-16 hover:absolute hover:inset-0">
      <MainCard {movie} />
    </div>
  {/each}
</div>
