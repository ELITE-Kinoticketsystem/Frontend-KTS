<script lang="ts">
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { AuthService } from "$lib/_services/authService";
  import { onMount } from "svelte";

  const isUserLoggedIn = new AuthService().isUserLoggedIn();

  let showDropdown = false;

  let url: string;

  onMount(() => (url = $page.url.pathname));

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
  class="p-3 w-full bg-gradient-to-r from-slate-700 from-1% via-backgroundBlue via-50% to bg-slate-700 to-100%"
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
      class="flex w-full mt-1 content-center justify-between md:w-1/2 md:justify-end"
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
            class="inline-block {url === '/movies'
              ? 'text-textWhite'
              : 'text-gray-600 hover:text-buttonBlue duration-300'}  no-underline py-2 px-4 duration-300"
            href="/movies">Movies</a
          >
        </li>
        <li class="mr-3">
          <a
            class="inline-block {url === '/specialevents'
              ? 'text-textWhite'
              : 'text-gray-600 hover:text-buttonBlue duration-300'}  no-underline py-2 px-4 duration-300"
            href="/specialevents">Events</a
          >
        </li>
        <li class="mr-3">
          <a
            class="inline-block {url === '/contact'
              ? 'text-textWhite'
              : 'text-gray-600 hover:text-buttonBlue duration-300'} no-underline py-2 px-4 duration-300"
            href="/contact">Contact</a
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
                  <a href={isUserLoggedIn ? "/dashboard" : "/auth/register"}>
                    <div
                      class="flex items-center p-2 rounded hover:bg-buttonBlue duration-300"
                    >
                      {isUserLoggedIn ? "Your dashboard" : "Register"}
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

<!--<script lang="ts">
  import { AuthService } from "$lib/_services/authService";
  import Searchbar from "../templates/searchbar.svelte";

  let isLoggedIn = new AuthService().isUserLoggedIn();

  const longSearchBarText = "Search movies, actors or tags";
  const shortSearchBarText = "Search movie...";
  let showDropdown = false;

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }
</script>

<nav class="bg-headerBlue w-full z-20 top-0 start-0">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <a
            href="/"
            class="text-iconColorBlue text-xl hover:bg-buttonBlue hover:duration-500 hover:text-textWhite rounded-md px-3 py-2 font-medium"
            >CINEMIKA</a
          >
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
             Current: "bg-gray-900 text-textWhite", Default: "text-gray-300 hover:bg-gray-700 hover:text-textWhite"
            <a
              href="/#"
              class="bg-gray-900 text-textWhite rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page">Overview</a
            >
            <form>
              <Searchbar {longSearchBarText} {shortSearchBarText} />
            </form>
          </div>
        </div>
      </div>

      <div class="hidden md:block">
        <div class="ml-4 flex items-center md:ml-6">
          {#if isLoggedIn}
            <button
              type="button"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-textWhite focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
          {/if}

           Profile dropdown 
          <div class="relative ml-3">
            <div>
              <button
                type="button"
                class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded={showDropdown}
                aria-haspopup="true"
                on:mouseenter={toggleDropdown}
                on:click={toggleDropdown}
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <svg
                  class="h-8 w-8 rounded-full bg-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            <!
    
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"

            {#if showDropdown}
              {#if isLoggedIn}
                <div
                  class="absolute right-0 z-10 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div class="py-1" role="none">
                    <-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700"
                    <a
                      href="/dashboard"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      on:click={toggleDropdown}
                      tabindex="-1"
                      id="menu-item-0">Dashboard</a
                    >
                    <a
                      href="/dashboard/mytickets"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      on:click={toggleDropdown}
                      tabindex="-1"
                      id="menu-item-1">Tickets</a
                    >
                  </div>
                  <div class="py-1" role="none">
                    <a
                      href="/dashboard/settings"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      on:click={toggleDropdown}
                      tabindex="-1"
                      id="menu-item-2">Settings</a
                    >
                    <a
                      href="/auth/logout"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      on:click={toggleDropdown}
                      tabindex="-1"
                      id="menu-item-3">Logout</a
                    >
                  </div>
                </div>
              {:else}
                <div
                  class="absolute right-0 z-10 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div class="py-1" role="none">
                    <- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700"
                    <a
                      href="/auth/login"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      on:click={toggleDropdown}
                      tabindex="-1"
                      id="menu-item-0">Login</a
                    >
                    <a
                      href="/auth/register"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      on:click={toggleDropdown}
                      tabindex="-1"
                      id="menu-item-1">Register</a
                    >
                  </div>
                  <div class="py-1" role="none">
                    <a
                      href="/help?q=login"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      on:click={toggleDropdown}
                      tabindex="-1"
                      id="menu-item-2">Help</a
                    >
                  </div>
                </div>
              {/if}
            {/if}
          </div>
        </div>
      </div>
      <div class="-mr-2 flex md:hidden">
         Mobile menu button 
        <button
          type="button"
          class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-textWhite focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="absolute -inset-0.5" />
          <span class="sr-only">Open main menu</span>
          <-- Menu open: "hidden", Menu closed: "block" --
          <svg
            class="block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <!- Menu open: "block", Menu closed: "hidden" --
          <svg
            class="hidden h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!- Mobile menu, show/hide based on menu state.
    <div class="md:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        "COMMENT:" Current: "bg-gray-900 text-textWhite", Default: "text-gray-300 hover:bg-gray-700 hover:text-textWhite"
        <a href="#" class="bg-gray-900 text-textWhite block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-textWhite block rounded-md px-3 py-2 text-base font-medium">Team</a>
        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-textWhite block rounded-md px-3 py-2 text-base font-medium">Projects</a>
        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-textWhite block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-textWhite block rounded-md px-3 py-2 text-base font-medium">Reports</a>
      </div>
      <div class="border-t border-gray-700 pb-3 pt-4">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-textWhite">Tom Cook</div>
            <div class="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
          </div>
          <button type="button" class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-textWhite focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="absolute -inset-1.5"></span>
            <span class="sr-only">View notifications</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-textWhite">Your Profile</a>
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-textWhite">Settings</a>
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-textWhite">Sign out</a>
        </div>
      </div>
    </div>
</nav>-->
