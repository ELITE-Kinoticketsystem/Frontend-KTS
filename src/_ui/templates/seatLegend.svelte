<script lang="ts">
  const regularColor = "#00ff00";
  const vipColor = '#00ff00';
  const logeColor = '#0000ff';
  const selectedColor='#777777'
</script>

<div
  class="grid grid-cols-2 gap-y-3 bg-tileBlue rounded-md w-full h-full"
>
  <div class="grid grid-cols-5 mx-2 mt-3 bg-backgroundBlue ring-1 ring-white rounded-md">
    <svg
      class="pl-2 col-span-1"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      viewBox="0 0 100 50"
    >
      <rect width="100" height="50" rx="20" fill={regularColor} />
    </svg>
    <div class="col-span-4">
      <p class="c text-center text-textWhite text-lg font-semibold">regular</p>
    </div>
  </div>
  
  <div class="grid grid-cols-5 mx-2 mt-3 bg-backgroundBlue ring-1 ring-white rounded-md">
    <svg
      class="pl-2 col-span-1"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      viewBox="0 0 100 50"
    >
      <rect width="100" height="50" rx="20" fill={vipColor} />
    </svg>
    <div class="col-span-4">
      <p class="c text-center text-textWhite text-lg font-semibold">vip</p>
    </div>
  </div>
  <div class="grid grid-cols-5 mx-2 mb-3 bg-backgroundBlue ring-1 ring-white rounded-md">
    <svg
      class="pl-2 col-span-1"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      viewBox="0 0 100 50"
    >
      <rect width="100" height="50" rx="20" fill={logeColor} />
    </svg>
    <div class="col-span-4">
      <p class="c text-center text-textWhite text-lg font-semibold">loge</p>
    </div>
  </div>
  <div class="grid grid-cols-5 mx-2 mb-3 bg-backgroundBlue ring-1 ring-white rounded-md">
    <svg
      class="pl-2 col-span-1"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      viewBox="0 0 100 50"
    >
      <rect width="100" height="50" rx="20" fill={selectedColor} />
    </svg>
    <div class="col-span-4">
      <p class="c text-center text-textWhite text-lg font-semibold">selected</p>
    </div>
  </div>
</div>
