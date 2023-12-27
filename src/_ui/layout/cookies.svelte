<script>
  import { browser } from "$app/environment";
  import Swal from "sweetalert2";

  let accepted = false;
  function accept() {
    accepted = true;
    // save to local storage or cookie
    if (browser) localStorage.setItem("cookieAccepted", "true");
  }

  // check local storage or cookie at the start
  if (browser) {
    if (localStorage.getItem("cookieAccepted") === "true") {
      accepted = true;
    }
  } else {
    accepted = false;
  }

  function learnMoreCookies() {
    Swal.fire({
      icon: "info",
      title: "Cookies",
      color: "#FAFAFA",
      customClass: "rounded-lg w-[70%] sm:w-1/3",
      background: "#354A5F",
      text: "We just use cookies for the login functionality and to display the trailers via youtube.",
      footer: "Both functionalities are necessary for the website to work.",
    });
  }
</script>

{#if !accepted}
  <div class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:px-6 sm:pb-6 z-50">
    <div class="p-2 rounded-lg bg-tileBlue opacity-95">
      <div class="flex items-center justify-between flex-wrap">
        <div class="w-0 flex-1 flex items-center">
          <span class="ml-3 font-medium text-white">
            We use cookies to enhance your experience. By continuing to visit
            this site you agree to our use of cookies. <button
              class="text-buttonBlue hover:text-textWhite duration-300"
              on:click={learnMoreCookies}>[Learn more]</button
            >
          </span>
        </div>
        <div class="order-3 mt-2 flex-shrink-0 sm:order-2 sm:mt-0 sm:w-32">
          <button
            class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-textWhite bg-buttonBlue hover:bg-headerBlue duration-300"
            on:click={accept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
