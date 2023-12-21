<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let startTime: number;
  let currentTime = startTime;
  export let signal: number;

  const dispatch = createEventDispatcher();

  $: startTimer(signal);

  $: minutes = Math.floor(currentTime / 60);
  $: higherDigitSeconds = Math.floor((currentTime % 60) / 10);
  $: lowerDigitSeconds = currentTime % 10;

  function startTimer(signal: number) {
    if (signal === 1) {
      decreaseTimer();
    }
  }
  function decreaseTimer() {
    if (signal == 0) {
      currentTime = startTime;
      return;
    }

    if (currentTime === 0) {
      currentTime = startTime;
      dispatch("timerFinished");
      return;
    }

    setTimeout(() => {
      --currentTime;
      decreaseTimer();
    }, 100);
  }
</script>

<div
  class="flex flex-row overflow-hidden w-full h-full rounded-sm sm:rounded-lg xl:rounded-2xl bg-headerBlue mt-8 pr-10 ring-1 ring-white"
>
  <div class="flex-none basis-1/3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="-4 -2 28 28"
      stroke-width="1.5"
      stroke="#ffffff"
      class="w-full h-full"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
  <div class=" my-auto basis-2/3 h-full">
    {#key currentTime}
      <div
        class="flex flex-col place-content-evenly items-center h-full"
      >
        <p
          class="w-full h-full text-center font-mono text-textWhite text-[3cqw] p-1 font-semibold"
        >
          {minutes}:{higherDigitSeconds}{lowerDigitSeconds}
        </p>
      </div>
    {/key}
  </div>
</div>
