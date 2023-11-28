<script>
    import { page } from "$app/stores";
    import MainRoundAbout from "../_ui/layout/mainRoundAbout.svelte";
    import FirstMainSiteElement from "../_ui/layout/_mainpage/firstMainSiteElement.svelte";
    import SecondMainSiteElement from "../_ui/layout/_mainpage/secondMainSiteElement.svelte";
    import ThirdMainSiteElement from "../_ui/layout/_mainpage/thirdMainSiteElement.svelte";
    import Swal from "sweetalert2";

    export let data;

    let moviesToDisplay = data.first;

    const url = $page.url;

    const registerStatus = url.searchParams.get("rs");
    const loginStatus = url.searchParams.get("ls");

    if (registerStatus === "0" || loginStatus === "0") {
        Swal.fire({
            position: "top-end",
            icon: "info",
            title: "You are already logged in!",
            showConfirmButton: false,
            timer: 1500,
        });
    } else if (registerStatus === "1") {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your account has been created!",
            showConfirmButton: false,
            timer: 1500,
        });
    }

    if (loginStatus == "1") {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have been logged in!",
            showConfirmButton: false,
            timer: 1500,
        });
    }
</script>

<main>
    <div class="flex flex-col">
        <div class="flex mb-12">
            <MainRoundAbout {moviesToDisplay} />
        </div>

        <div class="flex mx-16 mt-3 bg-blue-600">
            <FirstMainSiteElement {moviesToDisplay} />
        </div>
        <div class="flex mx-16 mt-10">
            <ThirdMainSiteElement specialMovies={moviesToDisplay} />
        </div>
        <div class="flex mx-16 mt-10">
            <SecondMainSiteElement {moviesToDisplay} />
        </div>
    </div>
</main>
