<script lang="ts">
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";

  export let srcs: Array<string> = [];
  let currentImg = 0;

  function increaseIndex() {
    currentImg = (currentImg + 1) % srcs.length;
  }
  function decreaseIndex() {
    --currentImg;
    if (currentImg < 0) {
      currentImg = srcs.length - 1;
    }
  }
</script>

<div class="">
  <div class="">
    <Splide options={{ autoplay: true, rewind: true }} hasTrack={false}>
      <div class="relative mr-10 ml-3">
        <SplideTrack class="rounded-lg">
          {#each srcs as src}
            <SplideSlide>
              <img
                class="w-full h-full object-cover "
                {src}
                alt="Actor"
              />
            </SplideSlide>
          {/each}
        </SplideTrack>
      </div>
    </Splide>
  </div>
</div>
