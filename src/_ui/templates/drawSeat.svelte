<script lang="ts">
  export let color = "#cccccc";
  export let Type = "regular";
  export let BlockedByOther = false;
</script>

{#if Type === "regular"}
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
      fill={color}
    />
    <rect height="30" width="90" y="65" x="5" stroke-width="0" fill={color} />
    <rect
      rx="20"
      height="70"
      width="68"
      y="19"
      x="16"
      stroke-width="0"
      fill={color}
    />
    {#if BlockedByOther}
      <ellipse
        ry="13"
        rx="13"
        id="svg_1"
        cy="37.23404"
        cx="50"
        stroke-width="0"
        stroke="#000"
        fill="#BBBBBB"
      />
      <rect
        stroke="#000"
        id="svg_2"
        height="21.06383"
        width="56"
        y="70"
        x="22"
        stroke-width="0"
        fill="#BBBBBB"
      />
      <ellipse
        stroke="#000"
        ry="18"
        rx="28"
        id="svg_3"
        cy="70"
        cx="50"
        stroke-width="0"
        fill="#BBBBBB"
      />
    {/if}
  </svg>
{:else if Type === "double"}
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
      fill={color}
    />
    <rect
      stroke="#000"
      height="30"
      width="190"
      y="65"
      x="5"
      stroke-width="0"
      fill={color}
    />
    <rect
      rx="20"
      height="70"
      width="156"
      y="19"
      x="22"
      stroke-width="0"
      stroke="#000"
      fill={color}
    />
    {#if BlockedByOther}
      <ellipse
        ry="13"
        rx="13"
        id="svg_1"
        cy="37.23404"
        cx="100"
        stroke-width="0"
        stroke="#000"
        fill="#BBBBBB"
      />
      <rect
        stroke="#000"
        id="svg_2"
        height="21.06383"
        width="56"
        y="70"
        x="72"
        stroke-width="0"
        fill="#BBBBBB"
      />
      <ellipse
        stroke="#000"
        ry="18"
        rx="28"
        id="svg_3"
        cy="70"
        cx="100"
        stroke-width="0"
        fill="#BBBBBB"
      />
    {/if}
  </svg>
{/if}
