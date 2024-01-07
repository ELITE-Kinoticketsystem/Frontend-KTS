<script lang="ts">
  export let prices = { regular: 0.0, vip: 0.0, loge: 0.0 };

  let pClass =
    "w-[55%] text-center text-textWhite font-bold text-xl rounded-md bg-slate-500 py-[0.6rem] ";
  let inptClass =
    "w-full rounded-md p-2 duration-300 text-lg text-center text-textWhite border border-gray-300 bg-buttonBlue placeholder:text-gray-300";
  (" focus:ring-blue-500 focus:border-blue-500");
  let divClass = "flex flex-row justify-between items-center w-full h-[25%]";
</script>

<div class="w-full h-full flex flex-col justify-between p-2">
  <p class="w-full text-center font-bold text-textWhite text-2xl">
    Select prices in €
  </p>
  <div class={divClass}>
    <p class={pClass}>Regular</p>
    <form class="w-[40%]">
      <input
        class={inptClass}
        type="text"
        title={"Please enter a decimal value for the price"}
        pattern={"^\\d{0,5}(.\\d{1,2})?$"}
        bind:value={prices.regular}
      />
      <input type="submit" hidden />
    </form>
  </div>
  <div class={divClass}>
    <p class={pClass}>Loge</p>
    <form class="w-[40%]">
      <input
        class={inptClass}
        type="text"
        title={"Please enter a decimal value for the price"}
        pattern={"^\\d{0,5}(.\\d{1,2})?$"}
        bind:value={prices.loge}
      />
      <input type="submit" hidden />
    </form>
  </div>
  <div class={divClass}>
    <p class={pClass}>Vip</p>
    <form class="w-[40%]">
      <input
        class={inptClass}
        type="text"
        title={"Please enter a decimal value for the price"}
        pattern={"^\\d{0,5}(.\\d{1,4})?$"}
        bind:value={prices.vip}
      />
      <input type="submit" hidden />
    </form>
  </div>
</div>
