<script lang="ts">
  import { goto } from "$app/navigation";
  import { apiUrl } from "$lib/_services/authService";
  import { Rating } from "flowbite-svelte";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  let movieTitle = "Not set";
  let description = "Not set";
  let durationInMin = 0;
  let releaseYear = new Date().getFullYear();
  let wallPaperPicUrl = "";
  let fsk = 0;
  let trailerId = "";
  let coverPicURL = "";
  let genres: string[] = [];
  let actors: any[] = [];

  function fireHelp() {
    Swal.fire({
      title: "Movie",
      icon: "info",
      html: `Here you can see the movie you are creating. <br> <br> You can change the <b>title</b>, <b>description</b> and much more by clicking on the <span class='text-green-500 font-semibold'> green pencil</span> next to it.
        <br> <br> Every single "not set" or empty field will <b>not</b> be send for creation
      `,
      showConfirmButton: true,
      confirmButtonColor: "#888888",
      color: "#FAFAFA",
      customClass: {
        input: "rounded-md text-backgroundBlue",
        title: "text-textWhite bg-backgroundBlue",
        popup: "bg-backgroundBlue",
      },
    });
  }
  function create() {
    if (
      movieTitle === "Not set" ||
      movieTitle === "" ||
      description === "Not set" ||
      description === "" ||
      durationInMin === 0 ||
      releaseYear === 0 ||
      fsk === 0 ||
      trailerId === "" ||
      coverPicURL === ""
    ) {
      Swal.fire({
        title: "Error",
        icon: "error",
        html: `You current have fields wich are not set or empty. <br> <br> Please set a value to those fields.`,
        showConfirmButton: true,
        confirmButtonColor: "#888888",
        color: "#FAFAFA",
        customClass: {
          input: "rounded-md text-backgroundBlue",
          title: "text-textWhite bg-backgroundBlue",
          popup: "bg-backgroundBlue",
        },
      }).then(() => {
        return;
      });
    } else {
      Swal.fire({
        title: "Final step",
        html: `Please enter a wallpaper for your movie. This is mandatory`,
        input: "url",
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
      }).then((answer) => {
        if (answer.isConfirmed) {
          wallPaperPicUrl = answer.value;
          createMovieViaBackend();
        }
        return;
      });
    }
  }
  function createMovieViaBackend() {
    const body = JSON.stringify({
      Title: movieTitle,
      Description: description,
      Fsk: parseInt(fsk.toString()),
      TrailerURL: trailerId,
      TimeInMin: parseInt(durationInMin.toString()),
      BannerPicURL: wallPaperPicUrl,
      CoverPicURL: coverPicURL,
      ReleaseDate: new Date(releaseYear).toISOString(),
      Rating: 0.0,
    });
    fetch(apiUrl + "/movie", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      body: body,
    }).then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          icon: "success",
          html: `Your movie has been created. <br> <br> You will be redirected to the movie page in a few seconds`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          confirmButtonColor: "#888888",
          color: "#FAFAFA",
          customClass: {
            input: "rounded-md text-backgroundBlue",
            title: "text-textWhite bg-backgroundBlue",
            popup: "bg-backgroundBlue",
          },
        }).then(async () => {
          let json = await response.json();
          console.log(json);
          goto("/movies/" + json);
        });
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          html: `Your movie could not be created. <br> <br> Please try again later`,
          showConfirmButton: true,
          confirmButtonColor: "#888888",
          color: "#FAFAFA",
          customClass: {
            input: "rounded-md text-backgroundBlue",
            title: "text-textWhite bg-backgroundBlue",
            popup: "bg-backgroundBlue",
          },
        });
      }
    });
  }
  onMount(async () => {
    fireHelp();
  });
  function change(type: string) {
    let inputType: string = "text";
    if (
      type.toLowerCase() === "fsk" ||
      type.toLowerCase() === "duration in min" ||
      type.toLowerCase() === "release year"
    ) {
      inputType = "number";
    } else if (type.toLowerCase() === "description") {
      inputType = "textarea";
    } else {
      inputType = "text";
    }
    Swal.fire({
      title: "You are about to change: <br>" + type,
      input: inputType,
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
    }).then((answer) => {
      if (answer.isConfirmed) {
        if (type.toLowerCase() === "movie title") {
          movieTitle = answer.value;
        } else if (type.toLowerCase() === "fsk") {
          fsk = answer.value;
        } else if (type.toLowerCase() === "duration in min") {
          durationInMin = answer.value;
        } else if (type.toLowerCase() === "release year") {
          releaseYear = answer.value;
        } else if (type.toLowerCase() === "description") {
          description = answer.value;
        } else if (type.toLowerCase() === "youtube trailer") {
          ("https://www.youtube.com/watch?v=KMhl5N4n18o&ab_channel=KuchenTV");
          trailerId = answer.value;
          trailerId = trailerId.replace("https://www.youtube.com/watch?v=", "");
          if (trailerId.indexOf("&") != -1) {
            trailerId = trailerId.substring(0, trailerId.indexOf("&"));
          }
        } else if (type.toLowerCase() === "cover picture") {
          coverPicURL = answer.value;
        }
      }
    });
  }
</script>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col w-full h-full flex-grow mx-auto">
    <div class="flex justify-between text-textWhite mb-2">
      <div class="justify-start text-2xl">Enter movie details</div>
      <div class="justify-end space-x-2">
        <button
          class="text-md py-2 px-4 bg-buttonBlue hover:bg-headerBlue rounded-md duration-300 -mt-1"
          on:click={() => {
            fireHelp();
          }}
        >
          Help
        </button>
        <button
          class="text-md py-2 px-4 bg-buttonBlue hover:bg-headerBlue rounded-md duration-300 -mt-1"
          on:click={create}>Create now</button
        >
      </div>
    </div>
    <hr />
    <div class="mt-3 border-1 border-white">
      <div class="relative">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/{trailerId}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
          allowfullscreen
          class="rounded-lg w-full 2xl:h-[22rem] xl:h-[22rem] sm:h-max md:h-[18rem] h-max"
        />
        <button
          on:click={() => {
            change("Youtube Trailer");
          }}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8 my-auto ml-2 text-green-500 absolute top-0 right-0 border-white border-2 rounded"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
      <div class="flex flex-row mt-14">
        <div class="relative basis-1/3 flex-shrink-0 h-max">
          <img
            src={coverPicURL}
            alt={movieTitle}
            class="min-w-full h-auto aspect-auto overflow-hidden rounded-md"
          />
          <button
            on:click={() => {
              change("Cover Picture");
            }}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 my-auto ml-2 text-green-500 absolute top-0 right-0 border-white border-2 rounded"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </div>
        <div class="flex flex-col flex-grow px-5">
          <div
            class="flex flex-col sm:flex-row md:flex-row text-textWhite mx-auto sm:text-md md:text-xl xl:text-2xl 2xl:text-4xl font-bold"
          >
            <p class="break-words">
              {movieTitle}
              <button
                on:click={() => {
                  change("Movie Title");
                }}
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 my-auto ml-1 text-green-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </p>

            <div class="mx-auto xl:ml-5 xl:mt-1">
              <Rating id="ratingLab" total={5} rating={5} />
            </div>
          </div>
          <div
            class="flex flex-col sm:flex-row md:flex-row gap-2 text-textWhite mt-5 mx-5 gap-x-5 justify-center"
          >
            <p class="flex text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                />
              </svg>

              <span class="ml-1">
                {#each genres as genre, index}
                  {genre}{#if index != genres.length - 1},{/if}
                {/each}</span
              >
            </p>
            <p class="flex text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              <span class="ml-1">FSK {fsk} </span>
              <button
                on:click={() => {
                  change("FSK");
                }}
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 my-auto ml-2 text-green-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </p>
            <p class="flex text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="ml-1">{durationInMin}min</span>
              <button
                on:click={() => {
                  change("Duration in min");
                }}
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 my-auto ml-2 text-green-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </p>
            <p class="flex text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                />
              </svg>

              <span class="ml-1">{releaseYear}</span>
              <button
                on:click={() => {
                  change("Release Year");
                }}
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 my-auto ml-2 text-green-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </p>
          </div>
          <div
            class=" text-textWhite my-5 {description.length > 100
              ? 'mx-5'
              : 'mx-auto'} sm:text-sm md:text-md xl:text-xl 2xl:text-2xl break-words text-justify"
          >
            <span class="break-words">{description}</span>
            <button
              on:click={() => {
                change("Description");
              }}
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 my-auto ml-2 text-green-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
