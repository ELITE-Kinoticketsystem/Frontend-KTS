<script lang="ts">
  export let element: { src: string; undertitle: string };
</script>

<div class="flex flex-col w-full h-full items-center">
  <div class="flex-none h-[88%] overflow-hidden">
    <img
      class="object-cover aspect-auto rounded-md"
      src={element.src}
      alt={element.undertitle}
    />
  </div>
  <div class="flex flex-col place-content-evenly w-full h-[12%]">
    <p class="text-center break-wors text-textWhite font-semibold text-[85%]">
      {element.undertitle}
    </p>
  </div>
</div>
