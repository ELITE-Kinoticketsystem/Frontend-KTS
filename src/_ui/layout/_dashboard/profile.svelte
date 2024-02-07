<script lang="ts">
  import Swal from "sweetalert2";
  export let userName: string = "Daniel";

  function onClick() {
    Swal.fire({
      title: "Work in progress",
      icon: "info",
      confirmButtonText: "OK",
      text: "We are sorry for the inconvenience, we are working very hard to bring you this feature as soon as possible. If you have any questions, please contact us at support@cinemika.tech",
      confirmButtonColor: "#888888",
      cancelButtonColor: "#cccccc",
      color: "#FAFAFA",
      customClass: {
        input: "rounded-md bg-backgroundBlue text-textWhite",
        title: "text-textWhite bg-backgroundBlue",
        popup: "bg-backgroundBlue",
      },
    });
  }
</script>

<section class="bg-tileBlue mt-3 rounded-md hover:shadow-md duration-300">
  <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
    <figure class="max-w-screen-md mx-auto">
      <svg
        class="h-12 mx-auto mb-3 text-textWhite"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
          fill="currentColor"
        />
      </svg>
      <blockquote>
        <p class="text-2xl font-medium text-textWhite">
          "The best dashboard on the market. I can't believe we didn't start
          using it earlier. It's so easy to use and the support is amazing. I
          can't recommend it enough. Dear {userName}, enjoy the experience!"
        </p>
      </blockquote>
      <figcaption class="flex items-center justify-center mt-6 space-x-3">
        <img
          class="w-6 h-6 rounded-full"
          src="https://avatars.githubusercontent.com/u/91363034?v=4"
          alt="Collin Forslund"
        />
        <div class="flex items-center divide-x-2 divide-gray-700">
          <div class="pr-3 font-medium text-white">Collin Forslund</div>
          <div class="pl-3 text-sm font-light text-gray-400">
            CEO at Cinemika
          </div>
        </div>
      </figcaption>
    </figure>
  </div>
</section>

<div class="flex w-full text-textWhite bg-tileBlue mt-5 rounded-md shadow-md">
  <div class="space-x-5 mx-auto text-center py-10">
    <button
      on:click={onClick}
      class="bg-buttonBlue px-4 py-2 rounded-lg hover:scale-105 duration-300"
      >Change Username</button
    >
    <button
      on:click={onClick}
      class="bg-buttonBlue px-4 py-2 rounded-lg hover:scale-105 duration-300"
      >Change Email</button
    >
    <button
      on:click={onClick}
      class="bg-buttonBlue px-4 py-2 rounded-lg hover:scale-105 duration-300"
      >Change Password</button
    >
    <button
      on:click={onClick}
      class="bg-buttonBlue px-4 py-2 rounded-lg hover:scale-105 duration-300"
      >Delete Account</button
    >
  </div>
</div>
