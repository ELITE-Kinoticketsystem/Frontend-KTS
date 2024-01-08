<script lang="ts">
  export let priceCategory = "Regular";
  export let value = 0.0;
  let inputValue = value.toString();

  $: convertedInputValue = parseFloat(parseFloat(inputValue).toFixed(2));
</script>

<div class="flex flex-row justify-between items-center w-full h-full">
  <p
    class="w-[55%] text-center text-textWhite font-bold text-xl rounded-md bg-slate-500 py-[0.6rem]"
  >
    {priceCategory}
  </p>
  <form class="w-[40%]">
    <input
      class="w-full rounded-md p-2 duration-300 text-lg text-center text-textWhite border border-gray-300
           bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      title={"Please use enter a number followed by\n at most two decimal places"}
      pattern={"^\\d{0,5}(\\.\\d{1,2})?$"}
      bind:value={inputValue}
      on:blur={() => {
        value = convertedInputValue;
      }}
    />
    <input type="submit" hidden />
  </form>
</div>
