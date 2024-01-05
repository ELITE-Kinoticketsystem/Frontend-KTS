<script lang="ts">
  import { fire } from "$lib/swalTemplate";
  import { createEventDispatcher } from "svelte";
  import Swal from "sweetalert2";

  const dispatch = createEventDispatcher();

  const pattern = new RegExp("^[1-9][0-9]?[0-9]?$");

  export let placeholder = "X:";
  export let updateSize = 11;
  $: {
    updateSize = updateSize;
    previousSize = updateSize;
    size = updateSize;
  }
  export let size = 11;
  let previousSize = size; //only fire event if value changed
  $: {
    size = size;
  }

  function giveSizeUpdateIfNecessary() {
    if (!pattern.test(size.toString())) {
      fire("Invalid number\nPlease enter a number between 1-999", 3000);
      size = previousSize;
      return;
    }
    if (size === previousSize) {
      return;
    }
    previousSize = size;
    dispatch("sizeChanged", size);
  }
</script>

<div class="w-full h-full">
  <input
    class="h-full w-full p-2 duration-300 text-center text-lg font-semibold text-textWhite border border-gray-300 rounded-lg
     bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
    type="text"
    maxlength="3"
    title={"Enter a number between 1-999"}
    {placeholder}
    on:keydown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        giveSizeUpdateIfNecessary();
      }
    }}
    on:blur={giveSizeUpdateIfNecessary}
    bind:value={size}
  />
</div>
