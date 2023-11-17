<script>
  import { browser } from "$app/environment";

  const longSearchbarText = "Search for movies, actors or tags";

  let isLoggedIn = Math.floor(Math.random() * 10) > 5;

  $: searchBarOpen = false;

  let showDropdown = false;

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  $: onFocus = () => {
    searchBarOpen = true;
  };

  $: onBlur = () => {
    searchBarOpen = false;
  };
</script>

<nav class="bg-headerBlue w-full z-20 top-0 start-0">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <a
            href="/"
            class="text-textWhite text-xl hover:bg-gray-700 hover:text-textWhite rounded-md px-3 py-2 font-medium"
            >ELITE KTS</a
          >
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <!-- Current: "bg-gray-900 text-textWhite", Default: "text-gray-300 hover:bg-gray-700 hover:text-textWhite" -->
            <a
              href="/#"
              class="bg-gray-900 text-textWhite rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page">Overview</a
            >
            <!--<a href="/#liked" class="text-gray-300 hover:bg-gray-700 hover:text-textWhite rounded-md px-3 py-2 text-sm font-medium">Liked by others</a>-->
            <form>
              <div class="relative">
                <div
                  class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 text-textWhite"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  on:focus={onFocus}
                  on:blur={onBlur}
                  class="block p-2 ps-10 {searchBarOpen
                    ? `w-96`
                    : 'w-36'} duration-300 text-sm text-textWhite border border-gray-300 rounded-lg bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search for movies, actors or tags"
                />
              </div>
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

          <!-- Profile dropdown -->
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

            <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"-->

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
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <a
                      href="/dashboard"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0">Dashboard</a
                    >
                    <a
                      href="/dashboard/mytickets"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1">Tickets</a
                    >
                  </div>
                  <div class="py-1" role="none">
                    <a
                      href="/dashboard/settings"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-2">Settings</a
                    >
                    <a
                      href="/logout"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
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
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <a
                      href="/login"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0">Login</a
                    >
                    <a
                      href="/register"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1">Register</a
                    >
                  </div>
                  <div class="py-1" role="none">
                    <a
                      href="/help?q=login"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
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
        <!-- Mobile menu button -->
        <button
          type="button"
          class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-textWhite focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="absolute -inset-0.5" />
          <span class="sr-only">Open main menu</span>
          <!-- Menu open: "hidden", Menu closed: "block" -->
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
          <!-- Menu open: "block", Menu closed: "hidden" -->
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

  <!-- Mobile menu, show/hide based on menu state.
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
    </div>-->
</nav>
