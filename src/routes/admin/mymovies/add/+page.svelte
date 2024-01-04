<script lang="ts">
  import { browser, dev } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { apiUrl } from "$lib/_services/authService";
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  let title: string = "";
  let description: string = "";
  let fsk: number = 50;
  let trailerId: string = "";
  let durationInMinutes: string = "";
  let wallpaperUrl: string = "";
  let coverUrl: string = "";
  let newGenre: string = "";
  let releaseYear: number;
  let genres: string[] = ["Action", "Adventure", "Comedy", "Drama", "Fantasy"];

  let draftSaved = false;

  let fskMap = new Map();
  fskMap.set(0, 0);
  fskMap.set(25, 6);
  fskMap.set(50, 12);
  fskMap.set(75, 16);
  fskMap.set(100, 18);
  let fskMapReversed = new Map();
  fskMapReversed.set(0, 0);
  fskMapReversed.set(6, 25);
  fskMapReversed.set(12, 50);
  fskMapReversed.set(16, 75);
  fskMapReversed.set(18, 100);

  let uniqueReviewId = uuidv4();

  if ($page.url.searchParams.has("fromUUID")) {
    const uuid = $page.url.searchParams.get("fromUUID")!;

    uniqueReviewId = uuid;
    if (browser) {
      const draftString = window.localStorage
        .getItem("draft-" + uuid)!
        .replaceAll("Not set", "")
        .split(",");
      title = draftString[0];
      description = draftString[2];
      fsk = fskMapReversed.get(parseInt(draftString[1]));
      trailerId = draftString[3];
      durationInMinutes = draftString[4];
      coverUrl = draftString[4];
      genres = draftString[7].split(".");
      releaseYear = parseInt(draftString[8]);
    }
  }

  async function fireAddImg(type: string) {
    let data: any;
    let toCheck;
    if (type === "wallpaper") toCheck = wallpaperUrl;
    else toCheck = coverUrl;
    if (toCheck === "") {
      data = {
        title: "Enter the " + type + " url",
        input: "text",
        showCancelButton: true,
        inputValidator: (value: any) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      };
    } else {
      data = {
        title: "Enter the " + type + " url",
        input: "text",
        showDenyButton: true,
        denyButtonText: "Remove " + type,
        showCancelButton: true,
        inputValidator: (value: any) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      };
    }
    await Swal.fire(data).then((result) => {
      if (result.isConfirmed) {
        if (type === "wallpaper") wallpaperUrl = result.value;
        else coverUrl = result.value;
      } else if (result.isDenied) {
        if (type === "wallpaper") wallpaperUrl = "";
        else coverUrl = "";
      }
    });
  }

  function saveDraft() {
    if (browser) {
      let titleToSave = title === "" ? "Not set" : title;
      let fskToSave = fskMap.get(fsk);
      let descriptionToSave = description === "" ? "Not set" : description;
      let trailerIdToSave = trailerId === "" ? "Not set" : trailerId;
      let durationInMinutesToSave =
        durationInMinutes === "" ? "Not set" : durationInMinutes;
      let wallpaperUrlToSave = wallpaperUrl === "" ? "Not set" : wallpaperUrl;
      let coverUrlToSave = coverUrl === "" ? "Not set" : coverUrl;
      if (genres.length == 0) genres = ["Not set"];
      let releaseYearToSave = releaseYear === 0 ? -1 : releaseYear;
      let draftString =
        titleToSave +
        "," +
        fskToSave +
        "," +
        descriptionToSave +
        "," +
        trailerIdToSave +
        "," +
        durationInMinutesToSave +
        "," +
        wallpaperUrlToSave +
        "," +
        coverUrlToSave +
        "," +
        genres.toString().replaceAll(",", ".") +
        "," +
        releaseYearToSave;
      window.localStorage.setItem("draft-" + uniqueReviewId, draftString);
      draftSaved = true;
    }
  }

  function previewSite() {
    if (browser) {
      if (draftSaved) {
        goto("/admin/mymovies/preview/" + uniqueReviewId);
      } else {
        Swal.fire({
          icon: "info",
          title: "Drafts",
          text: "You need to change a value to convert the movie to a draft",
        });
      }
    }
  }

  function create() {
    if (browser) {
      /*      console.log(
        JSON.stringify({
          title: title,
          description: description,
          fsk: fskMap.get(fsk),
          trailerURL: trailerId,
          timeInMin: durationInMinutes,
          bannerPicURL: wallpaperUrl,
          coverPicURL: coverUrl,
          genres: null,
          releaseYear: releaseYear,
          rating: 0,
        })
      );*/

      fetch(apiUrl + "/movies", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          Title: title,
          Description: description,
          Fsk: fskMap.get(fsk),
          TrailerURL: trailerId,
          TimeInMin: durationInMinutes,
          BannerPicURL: wallpaperUrl,
          CoverPicURL: coverUrl,
          ReleaseDate: new Date(releaseYear).toISOString(),
          Rating: 0,
        }),
      }).then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Movie created successfully",
          });
          if (browser) {
            window.localStorage.removeItem("draft-" + uniqueReviewId);
            goto("/admin/mymovies");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong, please try again later",
          });
        }
      });
    }
  }

  async function getAllDrafts() {
    return new Promise((resolve, reject) => {
      let inputOptions: any[] = [];
      let draftIds = new Map();
      let amount = 0;
      if (browser) {
        for (let i = 0; i < window.localStorage.length; i++) {
          const item = window.localStorage.key(i);
          if (item?.includes("draft")) {
            amount++;
            const draftItem = window.localStorage.getItem(item);
            const title = draftItem?.split(",")[0];
            inputOptions.push(title);
            item.substring(6, item.length);
            draftIds.set(title, item.substring(6, item.length));
          }
        }
        if (amount > 0) resolve([inputOptions, draftIds]);
        else reject();
      }
    })
      .then(async (items: any | unknown[]) => {
        const inputOptions = items[0];
        const draftIds = items[1];
        const { value: option } = await Swal.fire({
          title: "You have unsaved drafts, pick one or ignore this message",
          input: "radio",
          inputOptions: inputOptions,
          showCancelButton: true,
        });
        if (option) {
          goto(
            "/admin/mymovies/add?fromUUID=" + draftIds.get(inputOptions[option])
          );
        }
      })
      .catch(() => {});
  }

  function deleteDraft() {
    if (browser) {
      window.localStorage.removeItem("draft-" + uniqueReviewId);
      goto("/admin/mymovies/add");
    }
  }
  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  onMount(async () => {
    if (!$page.url.searchParams.get("fromUUID")!) {
      await getAllDrafts();
    }
  });

  $: showDeleteDraftButton = () => {
    if (!browser) return false;
    return window.localStorage.getItem("draft-" + uniqueReviewId) != null;
  };
</script>

<head:svelte>
  <title>Cinemika - Add movie</title>
</head:svelte>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col w-full h-full flex-grow">
    <div class="flex justify-between text-textWhite mb-2">
      <div class="justify-start text-2xl">Enter movie details</div>
      <div class="justify-end space-x-2">
        {#if showDeleteDraftButton()}
          <button
            class="text-md py-2 px-4 bg-red-600 hover:bg-headerBlue rounded-md duration-300 -mt-1"
            on:click={deleteDraft}>Delete draft</button
          >
        {/if}
        <button
          class="text-md py-2 px-4 bg-buttonBlue hover:bg-headerBlue rounded-md duration-300 -mt-1"
          on:click={previewSite}>Preview site</button
        >
        <button
          class="text-md py-2 px-4 bg-buttonBlue hover:bg-headerBlue rounded-md duration-300 -mt-1"
          on:click={create}>Create now</button
        >
      </div>
    </div>
    <hr />
    <div class="mt-3">
      <div class="flex flex-col">
        <p class="font-semibold text-textWhite text-md mb-2">
          Add the movies wallpaper:
        </p>
        {#key wallpaperUrl}
          <button
            class="flex w-full sm:h-36 md:h-60 xl:h-96 2xl:h-[32rem] px-10 py-10 bg-buttonBlue rounded-md hover:bg-headerBlue duration-300 text-textWhite"
            on:click={() => {
              fireAddImg("wallpaper");

              saveDraft();
            }}
            class:hidden={wallpaperUrl !== ""}
          >
            <div class="flex mx-auto my-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 my-auto mr-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Add wallpaper
            </div>
          </button>
          <div class="relative" class:hidden={wallpaperUrl === ""}>
            <img
              src={wallpaperUrl}
              alt="Your wallpaper"
              class="w-full sm:h-36 md:h-60 xl:h-96 2xl:h-[32rem] object-cover group rounded-md"
            />
            <div class="absolute top-3 right-3">
              <button
                class="px-4 py-2 hover:bg-transparent duration-300 bg-buttonBlue text-textWhite rounded-md"
                on:click={() => {
                  fireAddImg("wallpaper");
                  saveDraft();
                }}>Edit</button
              >
            </div>
          </div>
        {/key}
      </div>
    </div>
    <div class="flex justify-between mt-10">
      <div class="flex-grow w-1/2">
        {#key coverUrl}
          <div class="mx-10">
            <button
              class="flex mx-auto w-full sm:h-36 md:h-60 xl:h-96 2xl:h-[32rem] px-10 py-10 bg-buttonBlue rounded-md hover:bg-headerBlue duration-300 text-textWhite"
              on:click={() => {
                fireAddImg("cover");
                saveDraft();
              }}
              class:hidden={coverUrl !== ""}
            >
              <div class="flex mx-auto my-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 my-auto mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Add cover
              </div>
            </button>
            <div class="relative" class:hidden={coverUrl === ""}>
              <div class="relative basis-1/3 flex-shrink-0 h-max">
                <img
                  src={coverUrl}
                  alt="Your cover"
                  class="min-w-full h-auto aspect-auto overflow-hidden rounded-md"
                />
              </div>
              <div class="absolute top-3 right-3">
                <button
                  class="px-4 py-2 hover:bg-transparent duration-300 bg-buttonBlue text-textWhite rounded-md"
                  on:click={() => {
                    fireAddImg("cover");
                    saveDraft();
                  }}>Edit</button
                >
              </div>
            </div>
          </div>
        {/key}
      </div>
      <div class="flex-grow w-1/2">
        <div class="flex flex-col space-y-10">
          <div class="flex flex-col w-full">
            <p class="my-auto text-xl text-textWhite">Title:</p>
            <input
              type="text"
              bind:value={title}
              name=""
              on:change={saveDraft}
              id=""
              placeholder="Enter a title for your movie"
              class="bg-inputBlue rounded-md px-4 py-2 w-full placeholder:text-darkTextWhite text-textWhite"
            />
          </div>
          <div class="flex flex-col w-full">
            <p class="my-auto text-xl text-textWhite">Release year:</p>
            <input
              type="date"
              bind:value={releaseYear}
              name=""
              on:change={saveDraft}
              id=""
              placeholder="Enter the realease year for your movie"
              class="bg-inputBlue rounded-md px-4 py-2 w-full placeholder:text-darkTextWhite text-textWhite"
            />
          </div>
          <div class="flex flex-col w-full">
            <p class="my-auto text-xl text-textWhite">Trailer YoutubeId:</p>
            <input
              type="url"
              name=""
              bind:value={trailerId}
              on:change={saveDraft}
              id=""
              placeholder="Enter a youtube id for your trailer"
              class="bg-inputBlue rounded-md px-4 py-2 w-full placeholder:text-darkTextWhite text-textWhite"
            />
          </div>
          <div class="flex flex-col w-full">
            <p class="my-auto text-xl text-textWhite">Duration in minutes:</p>
            <input
              type="number"
              name=""
              bind:value={durationInMinutes}
              on:change={saveDraft}
              id=""
              placeholder="Enter the movies duration in minutes"
              class="bg-inputBlue rounded-md px-4 py-2 w-full placeholder:text-darkTextWhite text-textWhite"
            />
          </div>
          <div class="flex flex-col w-full">
            <p class="my-auto text-xl text-textWhite">FSK:</p>
            <div class="w-full">
              <input
                type="range"
                min="0"
                bind:value={fsk}
                on:change={saveDraft}
                max="100"
                class="w-full h-2 rounded-lg cursor-pointer"
                step="25"
              />
              <div
                class="w-full flex justify-between text-xs px-2 text-textWhite"
              >
                <span>0</span>
                <span>6</span>
                <span>12</span>
                <span>16</span>
                <span>18</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full">
            <p class="my-auto text-xl text-textWhite">Genres:</p>
            <div class="grid grid-cols-3 gap-5 mt-2">
              {#each genres as genre}
                <div
                  class="flex text-textWhite justify-between bg-buttonBlue rounded-md px-2 py-1 my-auto"
                >
                  <p>{genre}</p>
                  <button
                    on:click={() => {
                      genres = genres.filter((g) => g !== genre);
                      saveDraft();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 text-right ml-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              {/each}
              <div class="relative">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Add"
                  maxlength="12"
                  bind:value={newGenre}
                  class="bg-inputBlue rounded-md text-textWhite h-full w-full placeholder:text-darkTextWhite"
                />
                <button
                  class="absolute top-1 right-0 rounded-md px-2 py-1 mt-px"
                  on:click={() => {
                    if (newGenre === "") return;
                    genres = [...genres, newGenre];
                    newGenre = "";
                    saveDraft();
                  }}
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 text-textWhite -mt-px"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full">
            <p class="my-auto text-xl text-textWhite">Description:</p>
            <textarea
              bind:value={description}
              cols="6"
              name=""
              on:change={saveDraft}
              id=""
              placeholder="Enter a description for your movie"
              class="bg-inputBlue rounded-md px-4 py-2 w-full placeholder:text-darkTextWhite text-textWhite"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sm:w-0 md:w-[5%] lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
