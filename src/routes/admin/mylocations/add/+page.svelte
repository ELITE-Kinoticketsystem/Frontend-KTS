<script lang="ts">
  import Swal from "sweetalert2";
  import PlusButton from "../../../../_ui/templates/plusButton.svelte";

  let nameOfTheatre = "";
  let street = "";
  let city = "";
  let postCode = "";
  let country = "";

  let pictureUrl = "";
  $: pictureUrl = pictureUrl;

  async function createLocation() {
    let location = {
      nameOfTheatre,
      city,
      postCode,
      country,
      pictureUrl,
    };
    fetch("", {
      method: "PUT",
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(location),
    });
  }
  function addPicture() {
    Swal.fire({
      title: "Enter url",
      input: "text",
      confirmButtonColor: "#89a3be",
      customClass: {
        popup: "bg-backgroundBlue text-textWhite text-[100%]",
      },
    }).then((input) => {
      if (input.value === "") {
        Swal.fire({
          title: "You have to enter a non empty url",
          confirmButtonColor: "#89a3be",
          customClass: {
            popup: "bg-backgroundBlue text-textWhite text-[100%]",
          },
        });
        return;
      }
      pictureUrl = input.value;
    });
  }
</script>

<div class="flex flex-col w-[75%] mx-auto items-center">
  <div
    class="flex flex-row w-full border-b-2 border-white mx-auto justify-between pb-2 mb-6"
  >
    <p class="flex w-[25%] text-textWhite text-center text-3xl font-semibold">
      Create theatre
    </p>

    <button
      on:click={createLocation}
      class=" bg-buttonBlue ring-1 ring-white rounded-lg hover:bg-headerBlue px-3 text-textWhite text-xl font-semibold"
    >
      Create now
    </button>
  </div>

  <div
    class="flex flex-col w-[50%] gap-y-3 bg-backgroundBlue items-center rounded-md p-2"
  >
    {#key pictureUrl}
      <button
        on:click={addPicture}
        class="flex flex-col w-full h-[20vh] items-center justify-center hover:bg-blue-400 bg-buttonBlue rounded-md"
      >
        {#if pictureUrl === ""}
          <div
            class="flex flex-col items-center justify-center w-[80%] h-[80%] mx-auto my-auto"
          >
            <div class="w-[6%] mx-auto rounded-full mb-5">
              <PlusButton />
            </div>
            <p class="text-textWhite text-[100%] font-semibold">
              Add url for picture
            </p>
          </div>
        {:else}
          <img
            src={pictureUrl}
            class="w-full h-full overflow-hidden rounded-md object-cover aspect-auto"
            alt="Cinema Theatre"
          />
        {/if}
      </button>
    {/key}
    <input
      class="w-1/2 h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      maxlength="24"
      placeholder="Name of the theatre"
      bind:value={nameOfTheatre}
    />
    <input
      class="w-1/2 h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      maxlength="24"
      placeholder="Street"
      bind:value={street}
    />
    <input
      class="w-1/2 h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      maxlength="24"
      placeholder="City"
      bind:value={city}
    />
    <input
      class="w-1/2 h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      maxlength="24"
      placeholder="Post code"
      pattern="^[0-9]\{(3, 6)}\$"
      title="Please enter 3-6 digits"
      bind:value={postCode}
    />
    <input
      class="w-1/2 h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      maxlength="24"
      placeholder="Country"
      bind:value={country}
    />
  </div>
</div>
