<script>
  import Profile from "../../_ui/layout/_dashboard/profile.svelte";
  import Ticket from "../../_ui/layout/_dashboard/ticket.svelte";
  import Stats from "../../_ui/layout/_dashboard/stats.svelte";
  import Logout from "../../_ui/layout/_dashboard/logout.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { AuthService } from "$lib/_services/authService";
  import Swal from "sweetalert2";

  let pages = ["profile", "tickets", "statistics", "logout"];

  $: activePage = "profile";

  let direction = 1;

  let isUserLoggedIn = false;
  onMount(async () => {
    await AuthService.isUserLoggedIn().then((res) => {
      isUserLoggedIn = res;
      if (!isUserLoggedIn) {
        goto("/auth/login");
        return;
      }
    });
  });
  if ($page.url.searchParams.has("migrated")) {
    Swal.fire({
      title: "New Dashboard",
      icon: "success",
      confirmButtonText: "OK",
      html: "We have migrated your account to our new dashboard. <br> The new dashboard is still in development, so some features may not work as expected.",
      confirmButtonColor: "#888888",
      color: "#FAFAFA",
      customClass: {
        input: "rounded-md bg-backgroundBlue text-textWhite",
        title: "text-textWhite bg-backgroundBlue",
        popup: "bg-backgroundBlue",
      },
    });
    goto("/newdashboard");
  }
  function getGreetingBasedOnTime() {
    const currentHour = new Date().getHours();
    let timeOfDay;

    if (currentHour >= 5 && currentHour < 12) {
      timeOfDay = "morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      timeOfDay = "afternoon";
    } else {
      timeOfDay = "evening";
    }

    return timeOfDay;
  }

  function sayGreetingInRandomLanguage() {
    const timeOfDay = getGreetingBasedOnTime();

    const languages = [
      {
        language: "English",
        greetings: {
          morning: "Good morning",
          afternoon: "Good afternoon",
          evening: "Good evening",
        },
      },
      {
        language: "Spanish",
        greetings: {
          morning: "Buenos días",
          afternoon: "Buenas tardes",
          evening: "Buenas noches",
        },
      },
      {
        language: "French",
        greetings: {
          morning: "Bonjour",
          afternoon: "Bon après-midi",
          evening: "Bonsoir",
        },
      },
      {
        language: "German",
        greetings: {
          morning: "Guten Morgen",
          afternoon: "Guten Tag",
          evening: "Guten Abend",
        },
      },
      {
        language: "Italian",
        greetings: {
          morning: "Buongiorno",
          afternoon: "Buon pomeriggio",
          evening: "Buona sera",
        },
      },
      {
        language: "Japanese",
        greetings: {
          morning: "おはようございます",
          afternoon: "こんにちは ",
          evening: "こんばんは",
        },
      },
      {
        language: "Russian",
        greetings: {
          morning: "Доброе утро",
          afternoon: "Добрый день",
          evening: "Добрый вечер",
        },
      },
      {
        language: "Chinese",
        greetings: {
          morning: "早上好",
          afternoon: "下午好",
          evening: "晚上好",
        },
      },
      {
        language: "Arabic",
        greetings: {
          morning: "صباح الخير",
          afternoon: "مساء الخير",
          evening: "مساء الخير",
        },
      },
      {
        language: "Korean",
        greetings: {
          morning: "안녕하세요",
          afternoon: "안녕하세요",
          evening: "안녕하세요",
        },
      },
    ];

    // Randomly select a language
    const randomIndex = Math.floor(Math.random() * languages.length);
    const randomLanguage = languages[randomIndex];

    return `${randomLanguage.greetings[timeOfDay]}`;
  }
</script>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col w-full h-full flex-grow mx-auto">
    <div class="text-textWhite font-semibold mb-4">
      <h1 class="text-2xl">{sayGreetingInRandomLanguage()}, Dániel</h1>
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
          </li>{/each}
      </ul>
    </div>
    {#key activePage}
      <div
        in:fly={{ x: 100 * direction, duration: 400, delay: 401 }}
        out:fly={{ x: -100 * direction, duration: 400 }}
      >
        <div class="">
          {#if activePage === "profile"}
            <Profile />
          {:else if activePage === "tickets"}
            <Ticket />
          {:else if activePage === "statistics"}
            <Stats />
          {:else if activePage === "logout"}
            <Logout />
          {/if}
        </div>
      </div>
    {/key}
  </div>
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
