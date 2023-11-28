<script>
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import MainRoundAbout from "../_ui/layout/mainRoundAbout.svelte";
    import FirstMainSiteElement from "../_ui/layout/_mainpage/firstMainSiteElement.svelte";
    import SecondMainSiteElement from "../_ui/layout/_mainpage/secondMainSiteElement.svelte";
    import ThirdMainSiteElement from "../_ui/layout/_mainpage/thirdMainSiteElement.svelte";
    import Swal from "sweetalert2";

    export let data;

    let moviesToDisplay = data.first;

    const url = $page.url;

    const registerStatus = url.searchParams.get("registerStatus");
    const loginStatus = url.searchParams.get("loginStatus");

    if (
        registerStatus === "alreadyLoggedIn" ||
        loginStatus === "alreadyLoggedIn"
    ) {
        Swal.fire({
            position: "top-end",
            icon: "info",
            title: "You are already logged in!",
            showConfirmButton: false,
            timer: 1500,
        });
    } else if (registerStatus === "accountCreated") {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your account has been created!",
            showConfirmButton: false,
            timer: 1500,
        });
    }

    if (loginStatus == "successfullLogin") {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have been logged in!",
            showConfirmButton: false,
            timer: 1500,
        });
    }
</script>

<svelte:head>
    <title>Cinemika - Home</title>
</svelte:head>

<MainRoundAbout {moviesToDisplay} />
<br />
<div class="mx-16 mt-3">
    <FirstMainSiteElement {moviesToDisplay} />
</div>
<div class="mx-16 mt-10">
    <ThirdMainSiteElement specialMovies={moviesToDisplay} />
</div>
<div class="mx-16 mt-10">
    <SecondMainSiteElement {moviesToDisplay} />
</div>
