<script lang="ts">
  import { AuthService } from "$lib/_services/authService";

  const authService = new AuthService();
  const isUserLoggedIn = authService.isUserLoggedIn();

  if (isUserLoggedIn) {
    window.location.href = "/?alreadyLoggedIn=true";
  }
</script>

<main>
  <div
    class="flex min-h-full flex-col rounded-xl sm:mx-auto sm:w-full sm:max-w-2xl justify-center bg-[#2A313A] bg-repeat-round pt-6 pb-6 pl-16 pr-16"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <p
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight duration-300 text-buttonBlue hover:text-textWhite"
      >
        CINEMIKA
      </p>
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-textWhite"
      >
        Login
      </h2>
    </div>
    <button>Login with Google</button>
    <button>Login with Apple</button>
    <hr
      class="h-px my-8 bg-gray-200 border-0 sm:mx-auto sm:w-full sm:max-w-sm"
    />
    <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-textWhite"
            >E-Mail</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-textWhite shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-textWhite focus:ring-2 bg-inputBlue focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter an e-mail"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-textWhite"
              >Password</label
            >
            <div class="text-sm">
              <a
                href="/forgot-password"
                class="font-semibold duration-300 text-buttonBlue hover:text-textWhite"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-textWhite shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-textWhite bg-inputBlue focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter a password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md duration-300 bg-buttonBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Login</button
          >
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-textWhite">
        Not a member?
        <a
          href="/register"
          class="font-semibold leading-6 text-indigo-500 hover:text-indigo-200"
          >Register for free</a
        >
      </p>
    </div>
  </div>
</main>
