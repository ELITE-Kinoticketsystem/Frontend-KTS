<script lang="ts">
  import { AuthService } from "$lib/_services/authService";
  import Swal from "sweetalert2";
  import { RegisterStatus } from "$lib/statusEnums";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  let redirect: string | null = null;

  $: firstname = "";
  $: lastname = "";
  $: username = "";
  $: email = "";
  $: password = "";

  onMount(() => {
    redirect = $page.url.searchParams.get("redirect");
  });

  function validateButton() {
    const erroMsg = document.getElementById("erroMsg")!;
    erroMsg.innerHTML = "";
    erroMsg.hidden = true;

    const submitButton = document.getElementById("submitButton")!;
    submitButton.disabled = !(
      email.length > 0 &&
      firstname.length > 0 &&
      lastname.length > 0 &&
      username.length > 0 &&
      email.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ) &&
      password.length > 0 &&
      password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    );
    return !submitButton.disabled;
  }

  async function register() {
    if (!validateButton()) {
      const errorMsg = document.getElementById("erroMsg")!;
      const submitButton = document.getElementById("submitButton")!;
      errorMsg.innerHTML = "Please fill out all forms!";

      errorMsg.hidden = false;
      return;
    }
    const registerRequest = await AuthService.register(
      firstname,
      lastname,
      username,
      email,
      password
    );

    if (registerRequest.ok) {
      if (browser) {
        if (redirect) {
          goto(redirect);
        } else {
          goto("/dashboard");
        }
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Something went wrong, please try again later!",
        icon: "error",
      });
    }
  }
</script>

<svelte:head>
  <title>Cinemika - Register</title>
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
      Register
    </h2>
  </div>
  <div class="flex">
    <div class="g-signin2 mx-auto rounded-lg" data-onsuccess="onSignIn" />
    <button class="mx-auto">Register with Apple</button>
  </div>
  <hr class="h-px my-8 bg-gray-200 border-0 sm:mx-auto sm:w-full sm:max-w-sm" />
  <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div class="flex space-x-6">
        <div>
          <label
            for="firstname"
            class="block text-sm font-medium leading-6 text-textWhite"
            >Firstname</label
          >
          <div class="mt-2">
            <input
              id="firstname"
              name="firstname"
              bind:value={firstname}
              on:input={validateButton}
              on:keydown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  register();
                }
              }}
              type="text"
              autocomplete="given-name"
              required
              class="block w-full rounded-md border-0 py-1.5 text-textWhite shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-textWhite focus:ring-2 bg-inputBlue focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 duration-300"
              placeholder="Firstname"
            />
          </div>
        </div>
        <div>
          <label
            for="lastname"
            class="block text-sm font-medium leading-6 text-textWhite"
            >Lastname</label
          >
          <div class="mt-2">
            <input
              id="lastname"
              name="lastname"
              bind:value={lastname}
              on:input={validateButton}
              on:keydown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  register();
                }
              }}
              type="text"
              autocomplete="family-name"
              required
              class="block w-full rounded-md border-0 py-1.5 text-textWhite shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-textWhite focus:ring-2 bg-inputBlue focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 duration-300"
              placeholder="Lastname"
            />
          </div>
        </div>
      </div>

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
                register();
              }
            }}
            type="text"
            autocomplete="username"
            required
            class="block w-full rounded-md border-0 py-1.5 text-textWhite shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-textWhite focus:ring-2 bg-inputBlue focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 duration-300"
            placeholder="Username"
          />
        </div>
      </div>
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
            on:keydown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                register();
              }
            }}
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-textWhite shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-textWhite focus:ring-2 bg-inputBlue focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 duration-300"
            placeholder="E-Mail"
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
            <button
              type="button"
              on:click={() => {
                Swal.fire({
                  title: "Password requirements",
                  text: "Your password must contain at least 8 characters, one uppercase, one lowercase, one special character and one number.",
                  icon: "info",
                });
              }}
              class="font-semibold duration-300 text-buttonBlue hover:text-green-400"
              >Requirements</button
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
                register();
              }
            }}
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-textWhite shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-textWhite bg-inputBlue focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 duration-300"
            placeholder="Password"
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
          on:click={register}
          class="flex w-full justify-center rounded-md duration-300 bg-buttonBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-lg hover:bg-green-500 disabled:hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Register</button
        >
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-textWhite">
      Already a member?
      <a
        href={redirect == null
          ? "/auth/login"
          : "/auth/login?redirect=" + redirect}
        class="font-semibold leading-6 text-inputBlue duration-300 hover:text-green-400"
        >Login</a
      >
    </p>
  </div>
</div>
