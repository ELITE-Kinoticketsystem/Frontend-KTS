<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let isChatOpen = false;
  let messageInput = "";

  let waitingForResponse = false;

  let allMovieTitles: string[] = [];

  onMount(async () => {
    await fetch(apiUrl + "/movies")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((movie: any) => {
          allMovieTitles.push(movie.Title);
        });
      })
      .catch((err) => {
        allMovieTitles = ["Godfather", "Fight Club", "Movie 3"];
      });
  });

  $: messages = [
    {
      sender: "server",
      text: "Currently, I can just correct movie titles for you.",
    },
    {
      sender: "server",
      text: "Just give me the title and I will try to find it for you.",
    },
  ];

  $: openChat = () => {
    isChatOpen = true;
  };

  $: closeChat = () => {
    isChatOpen = false;
  };

  const sendMessage = () => {
    if (messageInput === "") {
      document.getElementById("default-search")!.focus();
      document.getElementById("default-search")!.placeholder =
        "Please enter a message";
      return;
    } else if (waitingForResponse) {
      messageInput = "";
      document.getElementById("default-search")!.blur();
      document.getElementById("default-search")!.placeholder =
        "Please wait for the server to respond";
      return;
    }
    if (messageInput === "clear") {
      messageInput = "";
      messages = [
        {
          sender: "server",
          text: "Currently, I can just correct movie titles for you.",
        },
      ];
      return;
    } else if (messageInput === "goat") {
      messageInput = "";
      messages = [
        {
          sender: "server",
          text: "CURRY IS THE GOAT",
        },
      ];
      return;
    }
    messages = [...messages, { sender: "user", text: messageInput }];
    waitingForResponse = true;
    let copiedInput = JSON.parse(JSON.stringify(messageInput));
    messageInput = "";
    setTimeout(() => {
      waitingForResponse = false;
      if (copiedInput === "help") {
        messages = [
          ...messages,
          {
            sender: "server",
            text: "Currently, I can just correct movie titles for you.",
          },
        ];
      } else {
        let response =
          autocorrectMovie(copiedInput) === "ERROR"
            ? "Unabled to find a movie"
            : "Here is the movie: " + autocorrectMovie(copiedInput);
        messages = [
          ...messages,
          {
            sender: "server",
            text: response,
          },
        ];
      }
    }, 1000);
  };

  const calculateMatchingScore = (input: any, movie: any) => {
    let score = 0;
    const lowercasedInput = input.toLowerCase();
    const lowercasedMovie = movie.toLowerCase();

    for (let i = 0; i < lowercasedInput.length; i++) {
      for (let j = 0; j < lowercasedMovie.length; j++) {
        if (lowercasedInput[i] === " ") continue;
        if (lowercasedInput[i] === lowercasedMovie[j]) {
          score++;
        }
      }
    }

    return score;
  };

  const autocorrectMovie = (input: any) => {
    let bestMatch = "";
    let bestScore = 0;

    for (const movie of allMovieTitles) {
      const score = calculateMatchingScore(input, movie);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = movie;
      }
    }

    return bestMatch || "ERROR";
  };
</script>

<button
  on:click={openChat}
  class="rounded-full bg-buttonBlue text-white p-3 cursor-pointer fixed bottom-6 right-6 z-50 transition-all duration-300"
>
  <svg
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
      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
    />
  </svg>
</button>

{#if isChatOpen}
  <div class="fixed inset-0 overflow-hidden z-50" transition:fade>
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-tileBlue bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div class="w-screen max-w-md">
          <div
            class="h-full flex flex-col py-6 bg-tileBlue shadow-xl overflow-y-scroll"
          >
            <div class="p-4">
              <button on:click={closeChat} class="text-white">
                <span class="sr-only">Close panel</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="flex mb-12">
              <div class="mx-auto text-2xl text-textWhite font-semibold">
                CineMikaPal
              </div>
            </div>
            <div class="space-y-4">
              {#each messages as { sender, text }}
                {#if sender === "server"}
                  <div class="flex justify-start">
                    <div
                      class="my-auto mx-1 bg-buttonBlue rounded-full px-1 py-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8 text-textWhite"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
                        />
                      </svg>
                    </div>
                    <div
                      class="bg-buttonBlue text-white flex p-2 rounded-md max-w-2/3"
                    >
                      {text}
                    </div>
                  </div>
                {:else}
                  <div class="flex justify-end">
                    <div
                      class="bg-blue-500 text-white flex p-2 rounded-md max-w-2/3"
                    >
                      {text}
                    </div>
                    <div
                      class="my-auto mx-1 bg-textWhite rounded-full px-1 py-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                {/if}
              {/each}
              {#if waitingForResponse}
                <div class="flex justify-start">
                  <div
                    class="my-auto mx-1 bg-buttonBlue rounded-full px-1 py-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-8 h-8 text-textWhite"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
                      />
                    </svg>
                  </div>
                  <div
                    class="bg-buttonBlue text-white flex p-2 rounded-md max-w-2/3 animate-pulse loading"
                  ></div>
                </div>
              {/if}
            </div>
            <input
              type="search"
              id="default-search"
              autocomplete="off"
              bind:value={messageInput}
              placeholder="Please enter a message"
              on:keydown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              class="mx-4 block py-2 px-4 mt-4 duration-300 text-sm text-textWhite border border-gray-300 rounded-lg bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              on:click={sendMessage}
              class="mx-4 bg-blue-500 text-white p-2 rounded-md mt-4"
              >Send</button
            >
          </div>
        </div>
      </section>
    </div>
  </div>
{/if}

<style>
  @keyframes loading {
    0%,
    20% {
      content: ".";
    }
    40% {
      content: "..";
    }
    60% {
      content: "...";
    }
    80% {
      content: "";
    }
  }

  .loading::after {
    content: ".";
    animation: loading 1s infinite steps(3);
  }
</style>
