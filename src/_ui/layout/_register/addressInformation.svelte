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
      Address information
    </h3>
    <div class="grid gap-4 mb-4 sm:grid-cols-2">
      <div>
        <label for="coun" class="block mb-2 text-sm font-medium text-textWhite"
          >Country</label
        >
        <input
          type="text"
          name="country"
          id="country"
          class="bg-inputBlue placeholder:text-textWhite border border-gray-300 text-textWhite text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          placeholder="Enter your country"
          autocomplete="given-name"
          required
        />
      </div>
      <div>
        <label
          for="zipcode"
          class="block mb-2 text-sm font-medium text-textWhite dark:text-white"
          >Zipcode</label
        >
        <input
          type="text"
          name="zipcode"
          id="zipcode"
          class="bg-inputBlue border placeholder:text-textWhite border-gray-300 text-textWhite text-sm rounded-lg block w-full p-2.5"
          placeholder="Enter your zipcode"
          required
        />
      </div>
      <div>
        <label for="city" class="block mb-2 text-sm font-medium text-textWhite"
          >City</label
        >
        <input
          type="text"
          name="city"
          id="city"
          class="bg-inputBlue border border-gray-300 text-textWhite placeholder:text-textWhite text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          placeholder="Enter your city"
          required
        />
      </div>
      <div>
        <label
          for="street_housenumber"
          class="block mb-2 text-sm font-medium text-textWhite dark:text-white"
          >Street + Housnumber</label
        >
        <input
          type="text"
          name="street_housenumber"
          id="street_housenumber"
          class="bg-inputBlue border placeholder:text-textWhite border-gray-300 text-textWhite text-sm rounded-lg block w-full p-2.5"
          placeholder="Enter your street"
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
      Previous Step: General Information
    </button>
    <button
      id="next-button"
      type="button"
      on:click={nextStep}
      disabled
      class="text-textWhite bg-buttonBlue duration-300 disabled:hover:bg-red-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Next Step: Review information
    </button>
  </form>
</div>
