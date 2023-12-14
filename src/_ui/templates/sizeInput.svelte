<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Swal from "sweetalert2";

  const dispatch = createEventDispatcher();

  const pattern = new RegExp("^[0-9]{0,3}$");

  export let placeholder = "X:";
  export let updateSize = 11;
  $: {
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
      Swal.fire({
        icon: "warning",
        title: "Invalid number",
        color: "#FAFAFA",
        timer: 3000,
        customClass: "rounded-lg w-[70%] sm:w-1/3",
        timerProgressBar: true,
        background: "#354A5F",
        text: "Please enter a number between 0-999",
      });
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
    title={"Enter a number between 0-999"}
    {placeholder}
    on:keydown={(e) => {
      if (e.key === "Enter") {
        giveSizeUpdateIfNecessary();
      }
    }}
    on:blur={giveSizeUpdateIfNecessary}
    bind:value={size}
  />
</div>
