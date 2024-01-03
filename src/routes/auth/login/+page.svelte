<script lang="ts">
  import { AuthService } from "$lib/_services/authService";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  $: username = "";
  $: password = "";

  let redirect: string | null = null;

  let isUserLoggedIn = false;
  onMount(async () => {
    await AuthService.isUserLoggedIn().then((res) => {
      isUserLoggedIn = res;
    });

    if (isUserLoggedIn) {
      if (redirect) goto(redirect);
      else goto("/dashboard");
    }
    redirect = $page.url.searchParams.get("redirect");
  });

  function validateButton() {
    const erroMsg = document.getElementById("erroMsg")!;
    erroMsg.innerHTML = "";
    erroMsg.hidden = true;

    const submitButton = document.getElementById("submitButton")!;
    submitButton.disabled = !(username.length > 0 && password.length > 0);
  }

  async function login() {
    const userIsLoggedIn = await AuthService.login(username, password);

    if (userIsLoggedIn.status === 200) {
      if (browser) {
        if (redirect) {
          goto(redirect);
        } else {
          goto("/dashboard");
        }
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

<div
  class="flex h-full flex-col rounded-xl sm:mx-auto sm:w-full sm:max-w-2xl justify-center bg-[#2A313A] bg-repeat-round pt-6 pb-6 pl-16 pr-16"
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
  <div class="flex">
    <div class="g-signin2 mx-auto" data-onsuccess="onSignIn" />
    <button class="mx-auto">Login with Apple</button>
  </div>
  <hr class="h-px my-8 bg-gray-200 border-0 sm:mx-auto sm:w-full sm:max-w-sm" />
  <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label
          for="username"
          class="block text-sm font-medium leading-6 text-textWhite"
          >Username</label
        >
        <div class="mt-2">
          <input
            id="username"
            name="username"
            bind:value={username}
            on:input={validateButton}
            on:keydown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                login();
              }
            }}
            type="text"
            autocomplete="username"
            required
            class="block w-full rounded-md border-0 py-1.5 text-textWhite shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-textWhite focus:ring-2 bg-inputBlue focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter an username"
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
            on:keydown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                login();
              }
            }}
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
        href={redirect == null
          ? "/auth/register"
          : "/auth/register?redirect=" + redirect}
        class="font-semibold leading-6 text-inputBlue duration-300 hover:text-textWhite"
        >Register for free</a
      >
    </p>
  </div>
</div>
