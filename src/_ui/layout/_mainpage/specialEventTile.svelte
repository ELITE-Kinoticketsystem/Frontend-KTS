<script lang="ts">
  import SpecialCard from "../../templates/specialCard.svelte";
  import TextMainSite from "../../templates/textMainSite.svelte";

  export let events: any[];
  let eventsToDisplay: any[] = [];

  if (events !== null && events.length > 0) {
    let length = 0;
    if (events.length == 2) {
      length = 2;
    }
    if (events.length > 2) {
      length = 3;
    }
    for (let i = 0; i < length; ++i) eventsToDisplay.push(events.at(i));
  }
</script>

{#if events !== null && eventsToDisplay.length > 0}
  <div class="flex flex-col h-full w-full">
    <div class="flex">
      <TextMainSite href="/specialevents" text="See other special events" />
    </div>
    <div class="flex flex-row justify-between h-full w-full">
      {#each eventsToDisplay as event}
        <a
          href="specialevents/{event.ID}"
          class="h-full flex hover:scale-105 duration-300 {event.Movies.length >
          2
            ? 'w-[45%]'
            : 'w-[30%]'}"
        >
          <SpecialCard {event} />
        </a>
      {/each}
    </div>
  </div>
{/if}
