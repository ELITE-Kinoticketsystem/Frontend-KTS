<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let updateSize = 11;
  $: {
    updateSize = updateSize;
    size = updateSize;
  }
  export let size = 11;
  let previousSize = size; //only fire event if value changed
  $: size = size;

  function giveSizeUpdateIfNecessary() {
    if (size === previousSize) {
      return;
    }
    previousSize = size;
    dispatch("sizeChanged", size);
  }
</script>

<div class="w-full h-full">
  <input
    on:keydown={(e) => {
      if (e.key === "Enter") {
        giveSizeUpdateIfNecessary();
      }
    }}
    on:blur={giveSizeUpdateIfNecessary}
    type="text"
    bind:value={size}
    class="h-full w-full p-2 duration-300 text-center text-lg font-semibold text-textWhite border border-gray-300 rounded-lg bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
    placeholder={"Y:"}
  />
</div>
