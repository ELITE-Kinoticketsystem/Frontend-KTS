<script lang="ts">
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { AuthService } from "$lib/_services/authService";
  import { onMount } from "svelte";
  let showDropdown = false;

  let location = "";

  let url: string;

  let isUserLoggedIn = false;
  onMount(async () => {
    await AuthService.isUserLoggedIn().then((res) => {
      isUserLoggedIn = res;
    });
    url = $page.url.pathname;

    location = localStorage.getItem("cinema") || "Not selected";
  });

  beforeNavigate(() => {
    showDropdown = false;
    url = $page.url.pathname;
  });

  afterNavigate(() => {
    showDropdown = false;
    url = $page.url.pathname;
  });
</script>

<nav
  class="p-3 w-full bg-gradient-to-r from-slate-700 from-1% via-backgroundBlue via-50% to bg-slate-700 to-100% overflow-auto"
>
  <div class="container mx-auto flex flex-wrap items-center">
    <div
      class="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold"
    >
      <a
        class="text-white no-underline hover:no-underline hover:text-buttonBlue duration-300"
        href="/"
      >
        <span class="text-2xl pl-2 flex items-center"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
            />
          </svg>
          CINEMIKA</span
        >
      </a>
    </div>
    <div
      class="flex w-full mt-1 content-center justify-between md:w-1/2 md:justify-end overflow-y-auto sm:overflow-y-auto md:overflow-y-clip"
    >
      <ul class="flex justify-between flex-1 md:flex-none items-center text-lg">
        <li class="mr-3">
          <a
            class="inline-block py-2 px-4 {url === '/'
              ? 'text-textWhite'
              : 'text-gray-600 hover:text-buttonBlue duration-300'} no-underline"
            href="/">Home</a
          >
        </li>
        <li class="mr-3">
          <a
            class="inline-block {String(url).includes('/movies')
              ? 'text-textWhite'
              : 'text-gray-600 hover:text-buttonBlue duration-300'}  no-underline py-2 px-4 duration-300"
            href="/movies">Movies</a
          >
        </li>
        <li class="mr-3">
          <a
            class="inline-block {String(url).includes('/specialevents')
              ? 'text-textWhite'
              : 'text-gray-600 hover:text-buttonBlue duration-300'}  no-underline py-2 px-4 duration-300"
            href="/specialevents">Events</a
          >
        </li>
        <li class="mr-3">
          <a
            class="inline-block {String(url).includes('/search')
              ? 'text-textWhite'
              : 'text-gray-600 hover:text-buttonBlue duration-300'} no-underline py-2 px-4 duration-300"
            href="/search">Search</a
          >
        </li>
        <li class="mr-3">
          <a
            class="inline-block {String(url).includes('/help')
              ? 'text-textWhite'
              : 'text-gray-600 hover:text-buttonBlue duration-300'} no-underline py-2 px-4 duration-300"
            href="/help">Help</a
          >
        </li>
        <li class="mr-3">
          <button
            id="dropdownBgHoverButton"
            on:click={() => {
              showDropdown = !showDropdown;
            }}
            class=" group {url === '/auth/login' ||
            url === '/auth/register' ||
            url === '/favorites' ||
            url === '/dashboard'
              ? 'text-textWhite'
              : 'text-gray-600 hover:text-buttonBlue duration-300'}  focus:ring-4 focus:outline-none focus:ring-transparent font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <div class="flex justify-end">
            <div
              id="regionDropDown"
              class:hidden={!showDropdown}
              class="z-10 w-48 bg-tileBlue rounded-lg shadow absolute origin-top mt-2"
            >
              <ul
                class="p-3 space-y-1 text-sm text-textWhite"
                aria-labelledby="regionDropDown"
              >
                <li>
                  <a href="/locations">
                    <div
                      class="flex flex-col items-center p-2 rounded hover:bg-buttonBlue duration-300"
                    >
                      <span
                        class:hidden={location == "" ||
                          location == "Not selected"}>Location: {location}</span
                      >
                      Change location
                    </div>
                  </a>
                </li>
                <li>
                  <a href={isUserLoggedIn ? "/dashboard" : "/auth/register"}>
                    <div
                      class="flex items-center p-2 rounded hover:bg-buttonBlue duration-300"
                    >
                      {isUserLoggedIn ? "Your dashboard" : "Register"}
                    </div>
                  </a>
                </li>
                <li class:hidden={!isUserLoggedIn}>
                  <a href="/favorites">
                    <div
                      class="flex items-center p-2 rounded hover:bg-buttonBlue duration-300"
                    >
                      Your favorites
                    </div>
                  </a>
                </li>
                <li>
                  <a href={isUserLoggedIn ? "/auth/logout" : "/auth/login"}>
                    <div
                      class="flex items-center p-2 rounded hover:bg-buttonBlue duration-300"
                    >
                      {isUserLoggedIn ? "Logout" : "Login"}
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>
