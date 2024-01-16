<script>
  import Swal from "sweetalert2";

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

<div class="flex w-full text-textWhite">
  <div class="space-x-5 mx-auto text-center mt-10">
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
