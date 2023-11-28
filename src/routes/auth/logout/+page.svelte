<script>
  import { browser } from "$app/environment";
  import { AuthService } from "$lib/_services/authService";
  import { LoginStatus } from "$lib/statusEnums";

  const authService = new AuthService();

  const isUserLoggedIn = authService.isUserLoggedIn();
  if (browser && isUserLoggedIn) {
    window.location.href =
      "/?loginStatus=" + LoginStatus.SUCCESSFUL_LOGOUT.toString();
  } else {
    if (browser) window.location.href = "/auth/login";
  }
</script>
