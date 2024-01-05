<script lang="ts">
  export let movies: any[];

  let selectedImageIndex = 0;
  let drawerOpen = false;

  function toggleDrawer() {
    drawerOpen = !drawerOpen;
  }
</script>

<div
  class="drawer-container"
  on:mouseover={toggleDrawer}
  on:mouseout={toggleDrawer}
>
  <div class="image-container">
    <img
      src={movies[selectedImageIndex].CoverPicURL}
      alt="Main"
      class="w-full h-auto main-image"
    />

    <div class="hover-images" class:open={drawerOpen}>
      {#if drawerOpen}
        {#each movies as movie, index}
          {#if index !== selectedImageIndex}
            <img
              src={movie.CoverPicURL}
              alt="Alt"
              class="hover-image"
              on:click={() => {
                selectedImageIndex = index;
                toggleDrawer();
              }}
            />
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
  .drawer-container {
    position: relative;
    overflow: hidden;
  }

  .image-container {
    position: relative;
    overflow: hidden;
  }

  .main-image {
    z-index: 1;
  }

  .hover-images {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    pointer-events: none; /* Allow mouse events to go through the hover-images */
  }

  .drawer-container:hover .hover-images {
    pointer-events: auto; /* Enable mouse events when the container is hovered */
  }

  .hover-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin: 5px;
    cursor: pointer;
    transition: opacity 0.3s;
    z-index: 2; /* Ensure the hover images are above the main image */
  }

  .hover-image:hover {
    opacity: 1;
  }
</style>
