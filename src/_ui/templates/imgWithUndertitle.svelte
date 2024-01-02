<script lang="ts">
  export let element: { src: string; undertitle: string };
</script>

<div class="flex flex-col w-full h-full items-center">
  <div class="flex-none h-[85%] overflow-hidden">
    <img
      class="object-cover aspect-auto rounded-md"
      src={element.src}
      alt={element.undertitle}
    />
  </div>
  <div
    class="flex flex-col place-content-evenly w-full h-[13%]"
  >
    <p
      class="text-center leading-snug line-clamp-2 text-textWhite font-semibold {element
        .undertitle.length < 15
        ? 'text-[100%]'
        : 'text-[80%]'}"
    >
      {element.undertitle}
    </p>
  </div>
</div>
