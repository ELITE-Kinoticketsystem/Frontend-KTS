<script>
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
  import Swal from "sweetalert2";
  let steps = [
    { desc: "Actorname", status: "Todo", toggled: false, value: "" },
    { desc: "Actor birthdate", status: "Next", toggled: false, value: "" },
    { desc: "Actor description", status: "Next", toggled: false, value: "" },
    { desc: "Actor photos", status: "Next", toggled: false, value: "" },
    { desc: "Actor review", status: "Next", toggled: false, value: "" },
  ];

  let doneClass =
    "w-full p-4 border border-2 bg-tileBlue border-green-800 text-green-400";
  let nextClass =
    "w-full p-4 bg-tileBlue border-2 border-blue-500 text-darkTextWhite opacity-50";

  let todoClass =
    "w-full p-4 bg-tileBlue border-2 border-blue-500 text-buttonBlue";
  let currentClass =
    "w-full p-4 border border-2 bg-tileBlue border-green-600 text-green-500";

  $: imgs = [];
  $: actorData = {
    Name: steps[0].value,
    Birthdate: steps[1].value,
    Description: steps[2].value,
  };

  function addImg() {
    Swal.fire({
      title: "You are about to add a <b>picture</b>",
      input: "url",
      inputValue: "https://",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#888888",
      cancelButtonColor: "#cccccc",
      color: "#FAFAFA",
      customClass: {
        input: "rounded-md bg-backgroundBlue text-textWhite",
        title: "text-textWhite bg-backgroundBlue",
        popup: "bg-backgroundBlue",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        imgs = [...imgs, result.value];
        imgs = imgs;
      }
    });
  }
</script>

<div class="flex w-screen h-full">
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-row flex-grow w-full h-full space-x-10">
    <ol class="space-y-4 w-72 duration-50 h-full">
      <div class="text-textWhite text-2xl break-words font-semibold w-full">
        Create your actor
      </div>
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      {#each steps as step, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          class="hover:scale-105 duration-500 {step.status === 'Todo' ||
          step.status === 'Done' ||
          step.status === 'Current'
            ? 'cursor-pointer'
            : 'cursor-not-allowed'}"
          on:click={() => {
            if (step.status !== "Next") {
              steps[index].status = "Current";
              if (index !== steps.length - 1) {
                steps[index + 1].status = "Todo";
              }
              if (index > 0) {
                steps[index - 1].status = "Done";
              }
              steps[index].toggled = !steps[index].toggled;
              for (let i = 0; i < steps.length; i++) {
                if (i !== index) {
                  steps[i].toggled = false;
                }
              }
            }
          }}
        >
          <div
            class="{step.status === 'Todo'
              ? todoClass
              : step.status === 'Done'
                ? doneClass
                : step.status === 'Current'
                  ? currentClass
                  : nextClass} {!step.toggled ? 'rounded-lg' : 'rounded-t-lg'}"
            role="alert"
          >
            <div class="flex items-center justify-between">
              <span class="sr-only">{step.desc}</span>
              <h3 class="font-medium">{index + 1}. {step.desc}</h3>
              {#if step.status === "Done"}
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              {:else if step.status === "Todo"}
                <svg
                  class="rtl:rotate-180 w-4 h-4 animate-pulse"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
                <!-- svelte-ignore empty-block -->
              {:else if step.status === "Current"}
                <svg
                  version="1.1"
                  id="L4"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  enable-background="new 0 0 0 0"
                  xml:space="preserve"
                  class="w-6 h-6 animate-pulse"
                >
                  <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                    <animate
                      attributeName="opacity"
                      dur="1s"
                      values="0;1;0"
                      repeatCount="indefinite"
                      begin="0.1"
                    />
                  </circle>
                  <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
                    <animate
                      attributeName="opacity"
                      dur="1s"
                      values="0;1;0"
                      repeatCount="indefinite"
                      begin="0.2"
                    />
                  </circle>
                  <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
                    <animate
                      attributeName="opacity"
                      dur="1s"
                      values="0;1;0"
                      repeatCount="indefinite"
                      begin="0.3"
                    />
                  </circle>
                </svg>
              {/if}
            </div>
          </div>
          <div
            class:hidden={!step.toggled}
            class="bg-tileBlue mx-auto rounded-b-lg text-textWhite"
          >
            {#if step.desc !== "Actor review"}
              <div class="py-5">
                {#if step.desc === "Actor birthdate"}
                  <input
                    on:click|stopPropagation
                    type="date"
                    class="block w-[88%] mx-auto duration-300 text-sm text-textWhite border rounded-lg border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    bind:value={step.value}
                    placeholder={step.desc}
                  />
                {:else if step.desc === "Actor photos"}
                  <div class="break-words max-w-max w-full">
                    {#each imgs as img}
                      {img}
                    {/each}
                  </div>
                  <button
                    on:click|stopPropagation={() => {
                      addImg();
                    }}
                    class=""
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                {:else}
                  <input
                    on:click|stopPropagation
                    type="text"
                    class="block w-[88%] mx-auto duration-300 text-sm text-textWhite border rounded-lg border-gray-300 bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    bind:value={step.value}
                    placeholder={step.desc}
                  />
                {/if}
              </div>
            {:else}
              <button
                class="px-4 py-2 mx-auto text-textWhite bg-buttonBlue hover:bg-green-500 duration-300 rounded-lg"
                >Create</button
              >
            {/if}
          </div>
        </li>
      {/each}
    </ol>
    <div class="w-full ring-2">
      <div class="mt-3 mx-auto">
        <div class="flex flex-col overflow-hidden">
          <div class="flex-start">
            <div class="flex flex-row mb-8 overflow-hidden">
              <div class="basis-1/3">
                {#key imgs}
                  <Splide
                    options={{ autoplay: true, rewind: true }}
                    hasTrack={false}
                    class="relative w-full group"
                  >
                    <SplideTrack class="rounded-xl group">
                      {#each imgs as img}
                        <SplideSlide>
                          <img src={img} alt={actorData.Name} />
                        </SplideSlide>
                      {/each}
                    </SplideTrack>
                  </Splide>
                {/key}
              </div>
              <div class="flex-end basis-2/3 my-auto">
                <div class=" flex flex-col">
                  <div>
                    <h1
                      class=" text-center font-bold mb-12 text-5xl text-textWhite font-sns"
                    >
                      {actorData.Name}
                    </h1>
                  </div>
                  <div class=" ">
                    <p class="text-textWhite p-8">{actorData.Description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
