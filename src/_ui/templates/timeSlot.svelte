<script lang="ts">
  import Swal from "sweetalert2";

  export let value = "0";
  export let maxValue = "9";
  $: {
    value = value;
    maxValue = maxValue;
  }

  const pattern = new RegExp("\\d");

  function fireAndResetIfInvalidValue() {
    if (value === "") {
      value = "0";
      return;
    }
    
    if (!pattern.test(value) || Number(value) > Number(maxValue)) {
      value = "0";
      Swal.fire({
        title: `Only values between 0-${maxValue} are allowed`,
      });
    }
  }

  let upperHovering = false;
  let lowerHovering = false;
</script>

<div
  class="flex flex-col items-center justify-between w-full h-full rounded-sm"
>
  <button
    on:mouseenter={(e) => {
      upperHovering = true;
    }}
    on:mouseleave={() => {
      upperHovering = false;
    }}
    on:click={() => {
      value = ((Number(value) + 1) % (Number(maxValue) + 1)).toString();
    }}
    class="bg-tileBlue w-full hover:bg-blue-200 rounded-sm h-[15%]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      stroke={upperHovering ? "#000000" : "#cccccc"}
      class="w-full h-full"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  </button>

  <input
    class="h-[60%] w-full p-[0.2rem] duration-300 text-center text-textWhite text-[80%] border border-gray-300 rounded-md
     bg-buttonBlue focus:ring-blue-500 focus:border-blue-500
     [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    type="text"
    maxlength="1"
    on:keydown={(e) => {
      if (e.key === "Enter") {
        fireAndResetIfInvalidValue();
      }
    }}
    on:blur={fireAndResetIfInvalidValue}
    bind:value
  />

  <button
    on:mouseenter={() => {
      lowerHovering = true;
    }}
    on:mouseleave={() => {
      lowerHovering = false;
    }}
    on:click={() => {
      value = (
        (Number(value) + Number(maxValue)) %
        (Number(maxValue) + 1)
      ).toString();
    }}
    class="bg-tileBlue w-full hover:bg-blue-200 rounded-sm h-[15%]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      stroke={lowerHovering ? "#000000" : "#cccccc"}
      class="w-full h-full"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  </button>
</div>
