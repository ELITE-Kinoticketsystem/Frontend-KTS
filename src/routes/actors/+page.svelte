<script lang="ts">
  import { onMount } from "svelte";
  import MainCard from "../../_ui/templates/mainCard.svelte";
  import Searchbar from "../../_ui/templates/searchbar.svelte";
  import { invalidateAll } from "$app/navigation";

  let actorInput: string = "";
  let displayedActorInput: string = "";

  let filteredActors: any[] = [];

  export let data;

  let allActors = data.actors;

  onMount(() => {
    invalidateAll();
  });

  function loadFilterActors() {
    if (actorInput === "" || actorInput === undefined) {
      filteredActors = [];
      return;
    }
    filteredActors = allActors.filter((actor: any) =>
      actor.Name.toLowerCase().includes(actorInput)
    );
  }
</script>

<svelte:head>
  <title>Cinemika - Actors</title>
</svelte:head>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col flex-grow w-max">
    <p class="text-textWhite text-xl font-semibold mb-3">Enter an actor</p>
    <div class="mx-auto w-full">
      <Searchbar
        longSearchBarSize="w-full"
        shortSearchBarSize="w-full"
        shortSearchBarText="Search for an actor"
        longSearchBarText="Search for an actor"
        on:inputChange={(event) => {
          actorInput = event.detail.toLowerCase().trim();
          displayedActorInput = event.detail.trim();
          loadFilterActors();
        }}
      />
    </div>
    <hr
      class="h-px my-2 bg-textWhite border-0"
      class:hidden={actorInput === "" || actorInput === undefined}
    />
    {#key actorInput}
      <p
        class="my-3 text-textWhite text-xl"
        class:hidden={actorInput === "" ||
          actorInput === undefined ||
          filteredActors.length === 0}
      >
        Results for <span class="underline-offset-2 underline"
          >{displayedActorInput}</span
        >
      </p>
      <p
        class="my-3 text-textWhite text-xl"
        class:hidden={filteredActors.length > 0 || actorInput === ""}
      >
        No results for <span class="underline-offset-2 underline"
          >{displayedActorInput}</span
        >
      </p>

      <div class="grid grid-cols-5 mx-auto gap-5">
        {#each filteredActors as actor}
          <MainCard movie={actor} isActor={true} />
        {/each}
      </div>
    {/key}
  </div>
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
