<script lang="ts">
  export let seatColors: any;
</script>

<div class="grid grid-cols-2 gap-y-3 bg-tileBlue rounded-md w-full h-full">
  <div
    class="grid grid-cols-5 mx-2 mt-3 bg-backgroundBlue ring-1 ring-white rounded-md"
  >
    <svg
      class="pl-2 col-span-1"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      viewBox="0 0 100 50"
    >
      <rect width="100" height="50" rx="20" fill={seatColors.regular} />
    </svg>
    <div class="col-span-4">
      <p class="c text-center text-textWhite text-lg font-semibold">Regular</p>
    </div>
  </div>

  <div
    class="grid grid-cols-5 mx-2 mt-3 bg-backgroundBlue ring-1 ring-white rounded-md"
  >
    <svg
      class="pl-2 col-span-1"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      viewBox="0 0 100 50"
    >
      <rect width="100" height="50" rx="20" fill={seatColors.vip} />
    </svg>
    <div class="col-span-4">
      <p class="c text-center text-textWhite text-lg font-semibold">Vip</p>
    </div>
  </div>
  <div
    class="grid grid-cols-5 mx-2 mb-3 bg-backgroundBlue ring-1 ring-white rounded-md"
  >
    <svg
      class="pl-2 col-span-1"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      viewBox="0 0 100 50"
    >
      <rect width="100" height="50" rx="20" fill={seatColors.loge} />
    </svg>
    <div class="col-span-4">
      <p class="c text-center text-textWhite text-lg font-semibold">Loge</p>
    </div>
  </div>
  <div
    class="grid grid-cols-5 mx-2 mb-3 bg-backgroundBlue ring-1 ring-white rounded-md"
  >
    <svg
      class="pl-2 col-span-1"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      viewBox="0 0 100 50"
    >
      <rect width="100" height="50" rx="20" fill={seatColors.selected} />
    </svg>
    <div class="col-span-4">
      <p class="c text-center text-textWhite text-lg font-semibold">Selected</p>
    </div>
  </div>
</div>
