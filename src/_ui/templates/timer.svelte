<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";

  const startTime = 900;

  export let blockedUntil: number = 0;

  let currentTime =
    blockedUntil === 0 ? 900 : Math.floor((blockedUntil - Date.now()) / 1000);

  export let timerSignal: number;

  const dispatch = createEventDispatcher();

  $: startTimer(timerSignal);
  $: minutes = Math.floor(currentTime / 60);
  $: higherDigitSeconds = Math.floor((currentTime % 60) / 10);
  $: lowerDigitSeconds = currentTime % 10;
  $: blockedUntil = blockedUntil;

  function startTimer(signal: number) {
    if (signal === 0) {
      currentTime = startTime;
      return;
    }
    if (signal === 1) {
      decreaseTimer();
    }
  }
  function decreaseTimer() {
    if (timerSignal === 0) {
      return;
    }
    if (currentTime === 0) {
      dispatch("timerFinished");
      return;
    }
    currentTime =
      blockedUntil === 0
        ? startTime
        : Math.floor((blockedUntil - Date.now()) / 1000);

    setTimeout(() => {
      currentTime = Math.floor((blockedUntil - Date.now()) / 1000);
      decreaseTimer();
    }, 100);
  }
  onDestroy(() => {
    timerSignal = 0;
  });
</script>

<div
  class="flex flex-row ring-inset overflow-hidden w-full h-full place-content-evenly rounded-md sm:rounded-lg xl:rounded-2xl bg-headerBlue mt-8 pr-2 ring-1 ring-white"
>
  <div class="flex-none w-[30%]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
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
  <div class=" my-auto w-[60%] h-full">
    {#key currentTime}
      <div class="flex flex-col justify-center items-center h-full w-full">
        <p
          class="font-mono text-textWhite font-semibold
          text-[7vw] sm:text-[2.8vw]"
        >
          {minutes}:{higherDigitSeconds}{lowerDigitSeconds}
        </p>
      </div>
    {/key}
  </div>
</div>
