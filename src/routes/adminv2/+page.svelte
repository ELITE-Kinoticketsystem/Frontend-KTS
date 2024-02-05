<script>
  import { fly } from "svelte/transition";
  import { sayGreetingInRandomLanguage } from "$lib/randomL";
  import Logout from "../../_ui/layout/_dashboard/logout.svelte";
  import Theatres from "../../_ui/layout/_admin/theatres.svelte";
  import Halls from "../../_ui/layout/_admin/halls.svelte";
  let pages = [
    "profile",
    "theatres",
    "halls",
    "events",
    "movies",
    "genres",
    "actors",
    "logout",
  ];
  $: activePage = "profile";
  let direction = 1;
</script>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col w-full h-full flex-grow mx-auto">
    <div class="text-textWhite font-semibold mb-4">
      <h1 class="text-2xl">
        {sayGreetingInRandomLanguage()},
        <span class="text-red-500 font-semibold">Admin</span> Dániel
      </h1>
    </div>
    <div class="">
      <ul
        class="flex flex-wrap text-sm font-medium text-center text-textWhite border-b border-textWhite"
      >
        {#each pages as page}
          <li class="me-4">
            <button
              on:click={() => {
                direction =
                  pages.indexOf(page) > pages.indexOf(activePage) ? 1 : -1;
                activePage = page;
              }}
              aria-current="page"
              class="inline-block p-4 text-textWhite bg-buttonBlue rounded-t-lg capitalize {activePage ===
              page
                ? ''
                : 'opacity-60 duration-300'}">{page}</button
            >
          </li>
        {/each}
      </ul>
    </div>
    {#key activePage}
      <div
        in:fly={{ x: 100 * direction, duration: 400, delay: 401 }}
        out:fly={{ x: -100 * direction, duration: 400 }}
      >
        <div class="w-full">
          {#if activePage === "theatres"}
            <Theatres />
          {:else if activePage === "halls"}
            <Halls />
          {:else if activePage === "logout"}
            <Logout />
          {/if}
        </div>
      </div>
    {/key}
  </div>
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
