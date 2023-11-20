<script lang="ts">
  import { browser } from "$app/environment";

  let canAdvance = false;

  $: confirmPassword = "";
  $: password = "";
  $: email = "";
  $: fullName = "";

  function nextStep(): void {
    emailValidation();
    passwordValidation();
    fullNameValidation();

    if (browser) {
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem("fullname", fullName);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      window.location.href = "/auth/register/address";
    }
  }

  $: fullNameValidation = () => {
    const fullNameInput = document.getElementById("fullname")!;
    const submitButton = document.getElementById("submit-button")!;
    if (fullName.length > 0 && fullName.match(/\s/)) {
      fullNameInput.classList.remove("border-red-500");
      submitButton.disabled = false;
    } else {
      fullNameInput.classList.add("border-red-500");
      submitButton.disabled = canActivateButton("fullname");
    }
  };
  $: emailValidation = () => {
    const emailInput = document.getElementById("email")!;
    const submitButton = document.getElementById("submit-button")!;
    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      emailInput.classList.remove("border-red-500");
      submitButton.disabled = false;
    } else {
      emailInput.classList.add("border-red-500");
      submitButton.disabled = canActivateButton("email");
    }
  };
  $: passwordValidation = () => {
    const passwordInput = document.getElementById("password")!;
    const confirmPasswordInput = document.getElementById("confirm-password")!;
    const submitButton = document.getElementById("submit-button")!;
    if (
      confirmPassword === password &&
      password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    ) {
      passwordInput.classList.remove("border-red-500");
      confirmPasswordInput.classList.remove("border-red-500");
      submitButton.disabled = false;
    } else {
      passwordInput.classList.add("border-red-500");
      confirmPasswordInput.classList.add("border-red-500");
      submitButton.disabled = canActivateButton("password");
    }
  };

  function canActivateButton(notToCheck: string): boolean {
    if (notToCheck === "password") {
      return fullName !== "" && email !== "";
    } else if (notToCheck === "email") {
      return fullName !== "" && password !== "";
    } else if (notToCheck === "fullname") {
      return email !== "" && password !== "";
    } else {
      return false;
    }
  }
</script>

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
  <div class="rounded-lg mx-5">
    <div class="my-2 mx-2">
      <ol class="flex items-center w-full mb-4 ml-16 mt-2">
        <li
          class="flex w-full items-center text-textWhite after:content-[''] after:w-full after:h-1 after:border-b after:border-orange-500 after:border-4 after:inline-block"
        >
          <div
            class="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-full shrink-0"
          >
            <svg
              class="w-4 h-4 text-textWhite lg:w-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path
                d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"
              />
            </svg>
          </div>
        </li>
        <li
          class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block"
        >
          <div
            class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0"
          >
            <svg
              class="w-4 h-4 text-blue-600 lg:w-6 lg:h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path
                d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z"
              />
              <path
                d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z"
              />
            </svg>
          </div>
        </li>
        <li class="flex items-center w-full">
          <div
            class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0"
          >
            <svg
              class="w-4 h-4 text-blue-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path
                d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"
              />
            </svg>
          </div>
        </li>
      </ol>
      <form action="#">
        <h3
          class="mb-4 text-lg underline underline-offset-2 font-bold leading-none text-textWhite"
        >
          Create your account
        </h3>
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              for="fullname"
              class="block mb-2 text-sm font-medium text-textWhite"
              >Fullname</label
            >
            <input
              type="text"
              name="fullname"
              id="fullname"
              bind:value={fullName}
              on:input={fullNameValidation}
              class="bg-inputBlue placeholder:text-textWhite border border-gray-300 text-textWhite text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="Enter your fullname"
              autocomplete="given-name"
              required
            />
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-textWhite">Email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              bind:value={email}
              on:input={emailValidation}
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
              bind:value={password}
              on:input={passwordValidation}
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
              bind:value={confirmPassword}
              on:input={passwordValidation}
              id="confirm-password"
              class="bg-inputBlue border placeholder:text-textWhite border-gray-300 text-textWhite text-sm rounded-lg block w-full p-2.5"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>
        <button
          id="submit-button"
          type="button"
          disabled
          on:click={nextStep}
          class="text-textWhite bg-buttonBlue duration-300 disabled:hover:bg-red-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Next Step: Address information
        </button>
      </form>
    </div>
  </div>
</div>
