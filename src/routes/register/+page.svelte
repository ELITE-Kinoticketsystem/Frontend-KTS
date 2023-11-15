<script>
  import { browser } from "$app/environment";

  let passwordText = "";
  let repeatPasswordText = "";

  // @ts-ignore
  function onSignIn(googleUser) {
    // get user profile information
    console.log(googleUser.getBasicProfile());
  }

  // @ts-ignore
  $: passwordValidation = (event) => {
    if (browser) {
      const regexPassword =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      const registerButton = document.getElementById("submitButton");
      if (
        regexPassword.test(passwordText) &&
        passwordText === repeatPasswordText
      ) {
        //@ts-ignore
        registerButton.disabled = false;
      }
    }
  };
</script>

Endpoint: /search/ Type: GET

<main>
  <div
    class="flex min-h-full flex-col sm:mx-auto sm:w-full sm:max-w-2xl justify-center bg-[#2A313A] bg-repeat-round pt-6 pb-6 pl-16 pr-16"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <p
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-textWhite"
      >
        ELITE KTS
      </p>
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-textWhite"
      >
        Registration
      </h2>
    </div>
    <button>Login with Google</button>
    <button>Login with Apple</button>
    <hr
      class="h-px my-2 bg-gray-200 border-0 sm:mx-auto sm:w-full sm:max-w-sm"
    />
    <div class="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-4" action="#" method="POST">
        <div>
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-textWhite"
            >Username</label
          >
          <input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            required
            class="block w-full rounded-md border-0 py-1.5 bg-inputBlue text-textWhite shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-textWhite focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter a username"
          />
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-textWhite"
            >Email</label
          >
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 bg-inputBlue text-textWhite shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-textWhite focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter an email"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-textWhite"
            >Password</label
          >
          <input
            id="password"
            on:input={passwordValidation}
            bind:value={passwordText}
            name="password"
            type="password"
            autocomplete="new-password"
            required
            class="block w-full rounded-md bg-inputBlue border-0 py-1.5 text-textWhite shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-textWhite focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter a password"
          />
        </div>

        <div>
          <label
            for="passwordrepeat"
            class="block text-sm font-medium leading-6 text-textWhite"
            >Repeat password</label
          >
          <input
            id="passwordrepeat"
            bind:value={repeatPasswordText}
            name="passwordrepeat"
            type="password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-textWhite shadow-lg ring-1 bg-inputBlue ring-inset ring-gray-300 placeholder:text-textWhite focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Repeat your password"
          />
        </div>
        <div>
          <button
            id="submitButton"
            type="submit"
            disabled
            class="w-full justify-center rounded-md bg-buttonBlue mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-textWhite shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Register</button
          >
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already a member?
        <a
          href="/login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Login</a
        >
      </p>
    </div>
  </div>
</main>
