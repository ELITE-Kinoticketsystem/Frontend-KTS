<script lang="ts">
  export let color = "#cccccc";
  export let type = "regular";
  export let bookedByOther = false;

  const bookedColor = "#777777";
</script>

{#if type === "regular"}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    class="w-full h-full"
  >
    <rect
      rx="20"
      height="50"
      width="90"
      y="45"
      x="5"
      stroke-width="0"
      fill={bookedByOther ? bookedColor : color}
    />
    <rect
      height="30"
      width="90"
      y="65"
      x="5"
      stroke-width="0"
      fill={bookedByOther ? bookedColor : color}
    />
    <rect
      rx="20"
      height="70"
      width="68"
      y="19"
      x="16"
      stroke-width="0"
      fill={bookedByOther ? bookedColor : color}
    />
  </svg>
{:else if type === "double"}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 100"
    preserveAspectRatio="xMidYMid meet"
    class="w-full h-full"
  >
    <rect
      stroke="#000"
      rx="20"
      height="50"
      width="190"
      y="45"
      x="5"
      stroke-width="0"
      fill={bookedByOther ? bookedColor : color}
    />
    <rect
      stroke="#000"
      height="30"
      width="190"
      y="65"
      x="5"
      stroke-width="0"
      fill={bookedByOther ? bookedColor : color}
    />
    <rect
      rx="20"
      height="70"
      width="156"
      y="19"
      x="22"
      stroke-width="0"
      stroke="#000"
      fill={bookedByOther ? bookedColor : color}
    />
  </svg>
{/if}
