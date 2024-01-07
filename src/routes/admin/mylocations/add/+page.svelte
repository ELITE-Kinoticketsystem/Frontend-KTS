<script lang="ts">
  import Swal from "sweetalert2";
  import PlusButton from "../../../../_ui/templates/plusButton.svelte";
  import { apiUrl } from "$lib/_services/authService";

  let Name = "";
  let Street = "";
  let StreetNr = "";
  let City = "";
  let Zipcode = "";
  let Country = "";

  let nameIsValid = true;
  let streetIsValid = true;
  let streetNrIsValid = true;
  let cityIsValid = true;
  let zipcodeIsValid = true;
  let countryIsValid = true;

  let LogoUrl = "";
  $: LogoUrl = LogoUrl;

  function fire(message: string) {
    Swal.fire({
      title: message,
      confirmButtonColor: "#89a3be",
      customClass: {
        popup: "bg-backgroundBlue text-textWhite text-[100%]",
      },
    });
  }

  function showWhichInputsAreValid() {
    if (!RegExp("[a-z]{2,20}").test(Name)) {
      nameIsValid = false;
    }
    if (!RegExp("[a-z]{2,20}").test(Street)) {
      streetIsValid = false;
    }
    if (!RegExp("[0-9]{1,4}").test(StreetNr)) {
      streetNrIsValid = false;
    }
    if (!RegExp("[a-z]{2,20}").test(City)) {
      cityIsValid = false;
    }
    if (!RegExp("^[0-9]{3,6}$").test(Zipcode)) {
      zipcodeIsValid = false;
    }
    if (!RegExp("^[a-zA-Z]{2,20}$").test(Country)) {
      countryIsValid = false;
    }
  }

  function createLocation() {
    showWhichInputsAreValid();

    if (Name === "") {
      document.getElementById("nameInput")!.focus();
      fire("You have to enter non empty name");
      return;
    }
    if (Street === "") {
      document.getElementById("streetInput")!.focus();
      fire("You have to enter non empty streetname");
      return;
    }
    if (StreetNr === "") {
      document.getElementById("streetNrInput")!.focus();
      fire("You have to enter non empty streetname");
      return;
    }
    if (City === "") {
      document.getElementById("cityInput")!.focus();
      fire("You have to enter non empty cityname");
      return;
    }
    if (Zipcode === "") {
      document.getElementById("postcodeInput")!.focus();
      fire("You have to enter non empty postcode");
      return;
    }
    if (Country === "") {
      document.getElementById("countryInput")!.focus();
      fire("You have to enter non empty country");
      return;
    }
    if (LogoUrl === "") {
      Swal.fire({
        title: "Are you sure you want to create a theatre without a picture?",
        confirmButtonColor: "#89a3be",
        showCancelButton: true,
        customClass: {
          popup: "bg-backgroundBlue text-textWhite text-[100%]",
        },
      }).then((answer) => {
        if (answer.isConfirmed) {
          let location = {
            Name,
            LogoUrl,
            Address: {
              Street,
              StreetNr,
              Zipcode,
              City,
              Country,
            },
          };
          fetch(`${apiUrl}/theatres`, {
            method: "POST",
            credentials: "include",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(location),
          }).then((response) => {
            if (response.ok) {
              fire(`${Name} was successfully created!`);
            } else {
              fire("A database error occured. Theatre was not created!");
            }
          });
        }
      });
    }
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
        fire("You have to enter a non empty url");
        return;
      }
      LogoUrl = input.value;
    });
  }
</script>

<div class="flex flex-col w-[75%] mx-auto items-center">
  <div
    class="flex flex-row w-full border-b-2 border-white mx-auto justify-between pb-2 mb-6"
  >
    <p class="flex w-[25%] text-textWhite text-center text-3xl font-semibold">
      Create Theatre
    </p>

    <button
      on:click={createLocation}
      class=" bg-buttonBlue ring-1 ring-white rounded-lg hover:bg-headerBlue px-3 text-textWhite text-xl font-semibold
      duration-300"
    >
      Create now
    </button>
  </div>

  <div
    class="flex flex-col w-[50%] gap-y-3 bg-backgroundBlue items-center rounded-lg p-2"
  >
    {#key LogoUrl}
      <button
        on:click={addPicture}
        class="flex flex-col w-full h-[20vh] items-center justify-center hover:bg-blue-400 bg-buttonBlue rounded-md duration-300"
      >
        {#if LogoUrl === ""}
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
            src={LogoUrl}
            class="w-full h-full overflow-hidden rounded-md object-cover aspect-auto"
            alt="Cinema Theatre"
          />
        {/if}
      </button>
    {/key}
    <input
      on:focus={() => {
        nameIsValid = true;
      }}
      on:blur={() => {
        if (!RegExp("[a-z]{2,20}").test(Name)) {
          nameIsValid = false;
        }
      }}
      id="nameInput"
      class="{nameIsValid
        ? ''
        : 'ring-1 ring-red-600'} w-1/2 h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      maxlength="24"
      placeholder="Name"
      bind:value={Name}
    />
    <div class="flex flex-row justify-between w-1/2 h-full">
      <input
        on:focus={() => {
          streetIsValid = true;
        }}
        on:blur={() => {
          if (!RegExp("[a-z]{2,20}").test(Street)) {
            streetIsValid = false;
          }
        }}
        id="streetInput"
        class="{streetIsValid
          ? ''
          : 'ring-1 ring-red-600'} w-[80%] h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        maxlength="24"
        placeholder="Street"
        bind:value={Street}
      />
      <input
        on:focus={() => {
          streetNrIsValid = true;
        }}
        on:blur={() => {
          if (!RegExp("[0-9]{1,4}").test(StreetNr)) {
            streetNrIsValid = false;
          }
        }}
        id="streetNrInput"
        class="
        {streetNrIsValid
          ? ''
          : 'ring-1 ring-red-600'} w-[18%] h-full rounded-lg p-2 duration-300 text-[100%] text-textWhite text-center
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        maxlength="3"
        placeholder="Nr"
        bind:value={StreetNr}
      />
    </div>
    <input
      on:focus={() => {
        cityIsValid = true;
      }}
      on:blur={() => {
        if (!RegExp("[a-z]{2,20}").test(City)) {
          cityIsValid = false;
        }
      }}
      id="cityInput"
      class="{cityIsValid
        ? ''
        : 'ring-1 ring-red-600'} w-1/2 h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      maxlength="24"
      placeholder="City"
      bind:value={City}
    />
    <input
      on:focus={() => {
        zipcodeIsValid = true;
      }}
      on:blur={() => {
        if (!RegExp("^[0-9]{3,6}$").test(Zipcode)) {
          zipcodeIsValid = false;
        }
      }}
      id="zipcodeInput"
      class="{zipcodeIsValid
        ? ''
        : 'ring-1 ring-red-600'} w-1/2 h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      maxlength="24"
      placeholder="Post code"
      title="Please enter 3-6 digits"
      bind:value={Zipcode}
    />
    <input
      on:focus={() => {
        countryIsValid = true;
      }}
      on:blur={() => {
        if (!RegExp("^[a-zA-Z]{2,20}$").test(Country)) {
          countryIsValid = false;
        }
      }}
      id="countryInput"
      class="{countryIsValid
        ? ''
        : 'ring-1 ring-red-600'} w-1/2 h-full rounded-lg p-2 pl-3 duration-300 text-[100%] text-textWhite
           border border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
      type="text"
      maxlength="24"
      placeholder="Country"
      bind:value={Country}
    />
  </div>
</div>
