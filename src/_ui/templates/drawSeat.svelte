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
{:else if Type === "disabled"}
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="-290 -290 980 950"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      class="w-full h-full ring-4"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="#000000"
        d="M161.9882813,98.1240234  c24.9628906-2.3046875,44.3574219-23.8110352,44.3574219-48.9658203C206.3457031,22.0830078,184.2626953,0,157.1875,0  s-49.1572266,22.0830078-49.1572266,49.1582031c0,8.2568359,2.3037109,16.7055664,6.1445313,23.8105469l17.515625,246.4667969  l180.3964844,0.0488281l73.9912109,173.3652344l97.1445313-38.0976563l-15.0429688-35.8203125l-54.3662109,19.625  l-71.5908203-165.2802734l-167.7294922,1.1269531l-2.3027344-31.2128906l121.4228516,0.0483398v-46.1831055l-126.0546875-0.0493164  L161.9882813,98.1240234z"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="#000000"
        d="M343.4199219,451.5908203  c-30.4472656,60.1875-94.1748047,99.8398438-162.1503906,99.8398438C81.4296875,551.4306641,0,470.0009766,0,370.1611328  c0-70.1005859,42.4853516-135.2436523,105.8818359-164.1210938l4.1025391,53.5375977  c-37.4970703,23.628418-60.6123047,66.262207-60.6123047,110.9506836c0,72.4267578,59.0712891,131.4970703,131.4970703,131.4970703  c66.2617188,0,122.7646484-50.8515625,130.4697266-116.0869141L343.4199219,451.5908203z"
      />
    </svg>
  </svg>
{/if}
