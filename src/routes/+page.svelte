<script>
  import { page } from "$app/stores";
  import MainRoundAbout from "../_ui/layout/mainRoundAbout.svelte";
  import SpecialEventTile from "../_ui/layout/_mainpage/specialEventTile.svelte";
  import Swal from "sweetalert2";
  import { LoginStatus, RegisterStatus } from "$lib/statusEnums";
  import MainPageMovieRow from "../_ui/layout/_mainpage/mainPageMovieRow.svelte";
  

  export let data;

  let moviesToDisplay = data.first;


  const url = $page.url;

  const registerStatus = url.searchParams.get("registerStatus");
  const loginStatus = url.searchParams.get("loginStatus");

  if (
    registerStatus === RegisterStatus.ALREADY_LOGGED_IN.toString() ||
    loginStatus === LoginStatus.ALREADY_LOGGED_IN.toString()
  ) {
    Swal.fire({
      position: "top-end",
      icon: "info",
      title: "You are already logged in!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (registerStatus === RegisterStatus.REGISTERED.toString()) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your account has been created!",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (loginStatus == LoginStatus.SUCCESSFUL_LOGIN.toString()) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "You have been logged in!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (loginStatus == LoginStatus.SUCCESSFUL_LOGOUT.toString()) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "You have been logged out!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
</script>

<svelte:head>
  <title>Cinemika - Home</title>
</svelte:head>

<div class="flex flex-col gap-y-12 sm:gap-y-16 w-full">
  <div class="flex mx-1 mb-4">
    <MainRoundAbout {moviesToDisplay} />
  </div>

  <div class="flex mx-8 lg:mx-16">
    <MainPageMovieRow {moviesToDisplay} textData={{refs: ["/yourwatchlist", "/likedbyother"], txt: ["Your watchlist", "Liked by others"]}}/>
  </div>

  <div class="flex mx-8 h-[20vh] sm:h-[33vh] lg:mx-16">
    <SpecialEventTile specialMovies={moviesToDisplay} />
  </div>

  <div class="flex mb-4 mx-8 lg:mx-16">
    <MainPageMovieRow {moviesToDisplay} textData={{refs: ["/yoursuggestions", "/upcomingmovies"], txt: ["Your suggestions ", "Upcoming movies"]}}/>
  </div>
</div>
