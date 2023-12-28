<script lang="ts">
  import { onMount } from "svelte";
  import { invalidateAll } from "$app/navigation";
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
  import MovieRow from "../../../_ui/templates/movieRow.svelte";

  export let data;

  const actorData = data.actorData;

  let imgs: any[] = [];

  onMount(() => {
    invalidateAll();
    console.log(actorData.Pictures);
    for (let i = 0; i < actorData.Pictures.length; i++) {
      imgs = [...imgs, actorData.Pictures[i].PicURL];
    }
  });
</script>

<div class="max-w-6xl mt-3 mx-auto">
  <div class="flex flex-col overflow-hidden">
    <div class="flex-start">
      <div class="flex flex-row mb-8 overflow-hidden">
        <div class="basis-1/3">
          {#key imgs}
            <Splide
              options={{ autoplay: true, rewind: true }}
              hasTrack={false}
              class="relative w-full group"
            >
              <SplideTrack class="rounded-xl group">
                {#each imgs as img}
                  <SplideSlide>
                    <img src={img} alt={actorData.Name} />
                  </SplideSlide>
                {/each}
              </SplideTrack>
            </Splide>
          {/key}
        </div>
        <div class="flex-end basis-2/3 my-auto">
          <div class=" flex flex-col">
            <div>
              <h1
                class=" text-center font-bold mb-12 text-5xl text-textWhite font-sns"
              >
                {actorData.Name}
              </h1>
            </div>
            <div class=" ">
              <p class="text-textWhite p-8">{actorData.Description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-end">
      <p class="text-textWhite mb-4 text-2xl sm:text-md">
        Movies with <strong>{actorData.Name}</strong>
      </p>
      {#if actorData.Movies != null}
        <MovieRow moviesToDisplay={actorData.Movies} />
      {/if}
    </div>
  </div>
</div>
