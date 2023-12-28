<script>
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { AuthService, apiUrl } from "$lib/_services/authService";
  import { onMount } from "svelte";

  let isUserLoggedIn = false;

  onMount(async () => {
    await AuthService.isUserLoggedIn().then((res) => {
      isUserLoggedIn = res;
      if (browser && isUserLoggedIn) {
        fetch(apiUrl + "/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        //window.location.href =
        //"/?loginStatus=" + LoginStatus.SUCCESSFUL_LOGOUT.toString();
      } else {
        goto("/auth/login");
      }
    });
  });
</script>

<div class="min-h-screen flex flex-col justify-center items-center">
  <div class="p-5 max-w-sm w-full bg-gray-800 rounded shadow-lg text-center">
    <div class="avatar-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-24 h-24 rounded-full mx-auto mb-4 text-textWhite"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </div>
    <h2 class="mb-4 text-xl text-white">Goodbye, User!</h2>
    <p class="mb-8 text-gray-400">You are now logged out. Come back soon!</p>
  </div>
</div>
