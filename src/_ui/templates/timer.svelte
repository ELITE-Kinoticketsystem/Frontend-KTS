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
      dispatch("timerFinished");
      currentTime = startTime;
      return;
    }

    setTimeout(() => {
      --currentTime;
      decreaseTimer();
    }, 100);
  }
</script>

<div class="flex flex-row overflow-hidden w-full rounded-lg bg-black my-2 pr-1 ring-1 ring-white">
  <div class="flex flex-none basis-1/3">
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
  <div class="flex my-auto basis-2/3">
    {#key currentTime}
        <p class=" mx-auto text-textWhite text-lg font-semibold">
          {minutes}:{higherDigitSeconds}{lowerDigitSeconds}
        </p>
    {/key}
  </div>
</div>
