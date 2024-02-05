<script lang="ts">

  export let hall: any;
</script>

<div
  class="relative overflow-hidden rounded-lg shadow-md duration-300 hover:scale-105 bg-headerBlue px-2 py-2"
>
  <img src={hall.ImageUrl} alt={hall.Name} class="w-full h-48 object-cover" />

  <div class="p-4">
    <h2 class="text-2xl font-bold mb-2 text-textWhite">{hall.Name}</h2>
    <p class="text-gray-500 mb-2">{hall.Width} x {hall.Height}</p>
    <p class="text-gray-300">Capacity: {hall.Capacity}</p>
  </div>
</div>
