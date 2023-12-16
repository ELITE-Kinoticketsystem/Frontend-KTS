<script lang="ts">
  import TimeSlot from "./timeSlot.svelte";

  export let hours = 0;
  export let minutes = 0;

  let lowMinDigit = "0";
  let highMinDigit = "0";
  let lowHourDigit = "0";
  let highHourDigit = "0";

  $: {
    lowMinDigit = (minutes % 10).toString();
    highMinDigit = (Math.floor(minutes - Number(lowMinDigit)) / 10).toString();

    lowHourDigit = (hours % 10).toString();
    highHourDigit = (Math.floor(hours - Number(lowHourDigit)) / 10).toString();
  }
</script>

<div
  class="grid grid-rows-1 gap-x-[0.1rem] w-full h-full ring-1 rounded-sm ring-white p-1"
  style="grid-template-columns: repeat(17, minmax(0, 1fr));"
>
  <div class="col-span-4">
    <TimeSlot value={highHourDigit} maxValue={'2'} />
  </div>
  <div class="col-span-4">
    <TimeSlot value={lowHourDigit} maxValue={'3'} />
  </div>
  <div class="col-span-1 w-fit m-auto">
    <p
      class="mx-auto font-serif text-center text-textWhite text-[85%] font-bold"
    >
      :
    </p>
  </div>

  <div class="col-span-4">
    <TimeSlot value={highMinDigit} maxValue={'5'} />
  </div>
  <div class="col-span-4">
    <TimeSlot value={lowMinDigit} maxValue={'9'} />
  </div>
</div>
