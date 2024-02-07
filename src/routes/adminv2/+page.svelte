<script lang="ts">
  import { fly } from "svelte/transition";
  import { sayGreetingInRandomLanguage } from "$lib/randomL";
  import Logout from "../../_ui/layout/_dashboard/logout.svelte";
  import Theatres from "../../_ui/layout/_admin/theatres.svelte";
  import Halls from "../../_ui/layout/_admin/halls.svelte";
  import Movies from "../../_ui/layout/_admin/movies.svelte";
  import Genres from "../../_ui/layout/_admin/genres.svelte";
  import ProfileAdmin from "../../_ui/layout/_admin/profileAdmin.svelte";
  import { onMount } from "svelte";
  import { AuthService } from "$lib/_services/authService";

  import Actors from "../../_ui/layout/_admin/actors.svelte";
  import { goto } from "$app/navigation";

  let pages = [
    "profile",
    "theatres",
    "halls",
    "movies/events",
    "genres",
    "actors",
    "logout",
  ];
  $: activePage = "profile";
  let direction = 1;

  let userName = "Daniel";
  $: userName = userName;

  onMount(async () => {
    await AuthService.isAdmin().then((res: Boolean) => {
      if (!res as boolean) {
        goto("/dashboardv2");
      }
    });
    await AuthService.getUserData().then((res) => {
      userName = res.Username;
    });
  });
</script>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col w-full h-full flex-grow mx-auto">
    <div class="text-textWhite font-semibold mb-4">
      <div class="text-2xl">
        {sayGreetingInRandomLanguage()},
        <span class="text-red-500 font-semibold">Admin</span>
        {userName}
      </div>
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
            <Logout isAdmin={true} />
          {:else if activePage === "movies/events"}
            <Movies />
          {:else if activePage === "genres"}
            <Genres />
          {:else if activePage === "actors"}
            <Actors />
          {:else if activePage === "profile"}
            <ProfileAdmin {userName} />
          {/if}
        </div>
      </div>
    {/key}
  </div>
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
