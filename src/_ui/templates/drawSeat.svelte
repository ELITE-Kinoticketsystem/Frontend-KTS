<script>
  export let color = "#cccccc";
  export let type = "regular";
</script>

{#if type === "regular"}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
    class="w-full h-auto"
  >
    <rect
      x="10"
      y="50"
      width="80"
      height="30"
      rx="5"
      ry="5"
      fill={color}
      class=""
    />
    <path d="M20,50 A15,15 0 0,1 80,50" fill="#CCCCCC" />
  </svg>
{:else if type === "double"}
  <svg
    viewBox="-10 -10 115 45"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full h-auto"
  >
    <path
      d="M0 26C0 20.4772 4.47715 16 10 16H85C90.5228 16 95 20.4772 95 26V40H0V26Z"
      fill={color}
    />
    <path
      d="M6 10C6 4.47715 10.4772 0 16 0H79C84.5229 0 89 4.47715 89 10V40H6V10Z"
      fill={color}
    />
  </svg>
{/if}
