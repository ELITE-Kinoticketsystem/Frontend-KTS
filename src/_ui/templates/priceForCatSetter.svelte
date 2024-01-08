<script lang="ts">
  import PriceSetter from "./priceSetter.svelte";

  export let prices = { regular: 0.0, vip: 0.0, loge: 0.0 };
</script>

<div class="w-full h-full flex flex-col justify-between p-2">
  <p class="w-full text-center font-bold text-textWhite text-2xl">
    Select prices in €
  </p>
  <div class="w-full h-[25%]">
    <PriceSetter priceCategory={"Regular"} bind:value={prices.regular} />
  </div>
  <div class="w-full h-[25%]">
    <PriceSetter priceCategory={"Loge"} bind:value={prices.loge} />
  </div>
  <div class="w-full h-[25%]">
    <PriceSetter priceCategory={"Vip"} bind:value={prices.vip} />
  </div>
</div>
