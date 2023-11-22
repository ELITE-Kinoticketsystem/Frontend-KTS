<script lang="ts">
  import { fly } from "svelte/transition";
  import { registrationStep } from "$lib/stores";
  import AddressInformation from "../../../_ui/layout/_register/addressInformation.svelte";
  import GeneralInformation from "../../../_ui/layout/_register/generalInformation.svelte";
  import ReviewInformation from "../../../_ui/layout/_register/reviewInformation.svelte";
  import RegisterBar from "../../../_ui/layout/_register/registerBar.svelte";

  let step: number = 0;

  registrationStep.subscribe((value) => {
    step = value;
  });

  let multiplier = 1;
  function nextStep() {
    registrationStep.update((n) => n + 1);
    multiplier = 1;
  }

  function previousStep() {
    registrationStep.update((n) => n - 1);
    multiplier = -1;
  }
</script>

<svelte:head>
  <title>Cinemika - Register</title>
</svelte:head>
<div
  class="flex flex-col rounded-xl mx-auto w-full max-w-2xl justify-center bg-[#2A313A] bg-repeat-round pt-6 pb-6 pl-16 pr-16"
>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <p
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight duration-300 text-buttonBlue hover:text-textWhite"
    >
      CINEMIKA
    </p>
    <h2
      class="mt-8 mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-textWhite"
    >
      Register
    </h2>
  </div>
  <button>Login with Google</button>
  <button>Login with Apple</button>
  <hr class="h-px my-8 bg-gray-200 border-0 sm:mx-auto sm:w-full sm:max-w-sm" />
  <div class="rounded-lg mx-5">
    {#key step}
      <RegisterBar />
    {/key}
    {#key step}
      <div
        in:fly={{ x: 100 * multiplier, duration: 500, delay: 501 }}
        out:fly={{ x: -100 * multiplier, duration: 500 }}
      >
        {#if step === 0}
          <GeneralInformation />
        {:else if step === 1}
          <AddressInformation />
        {:else}
          <ReviewInformation />
        {/if}
      </div>
    {/key}
    <p class="mt-10 text-center text-sm text-textWhite">
      Already a member?
      <a
        href="/auth/login"
        class="font-semibold leading-6 text-inputBlue duration-300 hover:text-textWhite"
        >Login</a
      >
    </p>
  </div>
</div>

<button on:click={nextStep}>Inc</button>
<button on:click={previousStep}>Decrease</button>
