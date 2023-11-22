<script lang="ts">
  import { AuthService } from "$lib/_services/authService";
  import { browser } from "$app/environment";

  const authService = new AuthService();
  const isUserLoggedIn = authService.isUserLoggedIn();

  if (isUserLoggedIn) {
    window.location.href = "/?alreadyLoggedIn=true";
  }

  $: email = "";
  $: password = "";

  $: validateButton = () => {
    const erroMsg = document.getElementById("erroMsg")!;
    erroMsg.innerHTML = "";
    erroMsg.hidden = true;

    const submitButton = document.getElementById("submitButton")!;
    submitButton.disabled = !(
      email.length > 0 &&
      email.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ) &&
      password.length > 0
    );
  };

  async function login() {
    const userIsLoggedIn = await authService.login(email, password);
    if (userIsLoggedIn) {
      if (browser) {
        window.location.href = "/?login=true";
      }
    } else {
      const errorMsg = document.getElementById("erroMsg")!;
      const submitButton = document.getElementById("submitButton")!;
      errorMsg.innerHTML = "Wrong e-mail or password!";

      errorMsg.hidden = false;
      submitButton.disabled = true;
    }
  }

  function onSignIn(googleUser: any) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
</script>

<svelte:head>
  <title>Cinemika - Login</title>
</svelte:head>

<main>
  <div
    class="flex min-h-full flex-col rounded-xl sm:mx-auto sm:w-full sm:max-w-2xl justify-center bg-[#2A313A] bg-repeat-round pt-6 pb-6 pl-16 pr-16"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <p
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight duration-300 text-buttonBlue hover:text-textWhite"
      >
        CINEMIKA
      </p>
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-textWhite"
      >
        Login
      </h2>
    </div>
    <!--<div class="g-signin2" data-onsuccess="onSignIn" />-->
    <button>Login with Google</button>
    <button>Login with Apple</button>
    <hr
      class="h-px my-8 bg-gray-200 border-0 sm:mx-auto sm:w-full sm:max-w-sm"
    />
    <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-textWhite"
            >E-Mail</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              bind:value={email}
              on:input={validateButton}
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-textWhite shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-textWhite focus:ring-2 bg-inputBlue focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter an e-mail"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-textWhite"
              >Password</label
            >
            <div class="text-sm">
              <a
                href="/auth/forgot-password"
                class="font-semibold duration-300 text-buttonBlue hover:text-textWhite"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              bind:value={password}
              on:input={validateButton}
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-textWhite shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-textWhite bg-inputBlue focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter a password"
            />
          </div>
        </div>

        <p
          hidden
          class="flex items-center text-red-500 duration-300 font-bold leading-6 text-sm"
          id="erroMsg"
        />

        <div>
          <button
            disabled
            type="button"
            id="submitButton"
            on:click={login}
            class="flex w-full justify-center rounded-md duration-300 bg-buttonBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-lg hover:bg-green-500 disabled:hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Login</button
          >
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-textWhite">
        Not a member?
        <a
          href="/auth/register"
          class="font-semibold leading-6 text-inputBlue duration-300 hover:text-textWhite"
          >Register for free</a
        >
      </p>
    </div>
  </div>
</main>
