<script lang="ts">
  import { registrationStep } from "$lib/stores";

  function nextStep() {
    registrationStep.update((n) => n + 1);
  }

  function previousStep() {
    registrationStep.update((n) => n - 1);
  }
</script>

<div class="my-2 mx-2">
  <form action="#">
    <h3
      class="mb-4 text-lg underline underline-offset-2 font-bold leading-none text-textWhite"
    >
      Review information
    </h3>
    <div class="grid gap-4 mb-4 sm:grid-cols-2">
      <div>
        <label
          for="fullname"
          class="block mb-2 text-sm font-medium text-textWhite">Fullname</label
        >
        <input
          type="text"
          name="fullname"
          id="fullname"
          class="bg-inputBlue placeholder:text-textWhite border border-gray-300 text-textWhite text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          placeholder="Enter your fullname"
          autocomplete="given-name"
          required
        />
      </div>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-textWhite"
          >Email</label
        >
        <input
          type="email"
          name="email"
          id="email"
          class="bg-inputBlue border border-gray-300 text-textWhite placeholder:text-textWhite text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-textWhite dark:text-white"
          >Password</label
        >
        <input
          type="password"
          name="password"
          id="password"
          class="bg-inputBlue border placeholder:text-textWhite border-gray-300 text-textWhite text-sm rounded-lg block w-full p-2.5"
          placeholder="Enter a password"
          required
        />
      </div>
      <div>
        <label
          for="confirm-password"
          class="block mb-2 text-sm font-medium text-textWhite dark:text-white"
          >Confirm password</label
        >
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          class="bg-inputBlue border placeholder:text-textWhite border-gray-300 text-textWhite text-sm rounded-lg block w-full p-2.5"
          placeholder="Confirm your password"
          required
        />
      </div>
    </div>
    <button
      id="previous-button"
      type="button"
      on:click={previousStep}
      class="text-textWhite bg-buttonBlue duration-300 disabled:hover:bg-red-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Previous Step: Address information
    </button>
    <button
      id="next-button"
      type="button"
      on:click={nextStep}
      disabled
      class="text-textWhite bg-buttonBlue duration-300 disabled:hover:bg-red-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Next Step: Register
    </button>
  </form>
</div>
