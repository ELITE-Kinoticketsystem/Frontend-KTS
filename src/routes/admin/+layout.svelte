<script>
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { AuthService } from "$lib/_services/authService";
  import { onMount } from "svelte";
  let isUserLoggedIn = false;
  onMount(async () => {
    await AuthService.isUserLoggedIn().then((res) => {
      isUserLoggedIn = res;
    });
    if (!isUserLoggedIn && browser) {
      goto("/auth/login");
    }
  });
</script>

<slot />
