<script lang="ts">
  import { AuthService, apiUrl } from "$lib/_services/authService";
  import { Rating } from "flowbite-svelte";
  import Swal from "sweetalert2";
  import { fly } from "svelte/transition";
  import { browser } from "$app/environment";
  import Showings from "../../../_ui/layout/_movies/showings.svelte";
  import Cinemas from "../../../_ui/layout/_movies/cinemas.svelte";
  import { onMount } from "svelte";
  import { invalidateAll } from "$app/navigation";

  let isUserLoggedIn = false;
  let userID = "";

  $: forNow = 0;
  forNow = forNow;
  onMount(async () => {
    await AuthService.isUserLoggedIn().then((res) => {
      isUserLoggedIn = res;
      userID = JSON.parse(sessionStorage.getItem("user")!).ID;
    });
  });
  export let data;

  let movie: any = data.movie;
  console.log(movie);

  let reviewAmount = 0;
  if (movie.Reviews != undefined) reviewAmount = movie.Reviews.length;

  let reviews = data.movie.Reviews || [];
  $: reviews = reviews;

  if (movie.Genres == null) movie.Genres = [];

  let cinema = "";
  if (browser) {
    cinema = window.localStorage.getItem("cinema") || "Not selected";
  }

  let direction = 1;

  let rating: number = 0;

  $: textAreaValue = "";

  function submitReview(hasSpoiler: boolean) {
    if (isUserLoggedIn && textAreaValue.length > 0) {
      fetch(apiUrl + "/reviews", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          comment: textAreaValue,
          movieId: movie.ID,
          datetime: new Date().toISOString(),
          rating: rating,
          isSpoiler: hasSpoiler ? true : false,
        }),
      }).then(async (res) => {
        if (res.status === 201) {
          await res.json().then((data) => {
            const date = new Date(data.review.Datetime);
            data.review.Datetime = date.toLocaleString();
            data.review.Datetime = data.review.Datetime.split(" ")[0].slice(
              0,
              -1
            );
            reviews = [data.review, ...reviews];
            reviewAmount++;
            forNow = forNow;
          });
          textAreaValue = "";
          rating = 0;
          if (hasSpoiler) {
            Swal.fire({
              title: "Your review has been posted!",
              icon: "success",
              footer:
                "Your review was marked with containing spoilers, thank you for your honesty!",
            });
          } else {
            Swal.fire({
              title: "Your review has been posted!",
              icon: "success",
            });
          }
        } else {
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
          });
        }
      });
    } else {
      if (!isUserLoggedIn) {
        Swal.fire({
          title: "You have to be logged in or the value  to post a review!",
          icon: "error",
          footer:
            '<a href="/auth/login" class="hover:text-green-500 duration-300">Login here</a>',
        });
      } else {
        Swal.fire({
          title: "You have to write something to post a review!",
          icon: "error",
        });
      }
    }
  }
  function convert() {
    reviews.sort((a: any, b: any) => {
      return (
        new Date(b.Review.Datetime).getTime() -
        new Date(a.Review.Datetime).getTime()
      );
    });
    reviews.forEach((review: any) => {
      const date = new Date(review.Review.Datetime);
      review.Review.Datetime = date.toLocaleString();
      review.Review.Datetime = review.Review.Datetime.split(" ")[0].slice(
        0,
        -1
      );
    });
    reviews = reviews;
  }

  onMount(async () => {
    invalidateAll();
    convert();
  });

  function getYear(dateTime: string): string {
    const date = new Date(dateTime);
    return date.getFullYear().toString();
  }

  function deleteReview(reviewID: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "rounded-md bg-green-500 text-textWhite py-2 px-4 hover:bg-green-600 duration-300 mr-2",
        cancelButton:
          "rounded-md bg-red-500 text-textWhite py-2 px-4 hover:bg-red-600 duration-300",
        popup: "rounded-lg bg-backgroundBlue text-textWhite text-[100%]",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your review has been deleted.",
            icon: "success",
          });
          fetch(apiUrl + "/reviews/" + reviewID, {
            method: "DELETE",
            credentials: "include",
          }).then((res) => {
            if (res.status === 200) {
              reviews = reviews.filter((review: any) => review.ID !== reviewID);
              invalidateAll();
              reviewAmount--;
            } else {
              Swal.fire({
                title: "Something went wrong!",
                icon: "error",
              });
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your review is safe :)",
            icon: "error",
          });
        }
      });
  }
</script>

<head:svelte>
  <title>Cinemika - {movie.Title}</title>
</head:svelte>

<div class="flex w-screen h-max">
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
  <div class="flex flex-col mx-auto">
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/{movie.TrailerURL}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
      allowfullscreen
      class="rounded-lg w-full 2xl:h-[22rem] xl:h-[22rem] sm:h-max md:h-[18rem] h-max"
    />
    <div class="flex flex-row mt-14">
      <div class="relative basis-1/3 flex-shrink-0 h-max">
        <img
          src={movie.CoverPicURL}
          alt={movie.Title}
          class="min-w-full h-auto aspect-auto overflow-hidden rounded-md"
        />
      </div>
      <div class="flex flex-col flex-grow px-5">
        <div
          class="flex flex-col sm:flex-row md:flex-row text-textWhite mx-auto sm:text-md md:text-xl xl:text-2xl 2xl:text-4xl font-bold"
        >
          <p class="break-words">{movie.Title}</p>

          <a class="mx-auto xl:ml-5 xl:mt-1" href="#review">
            <Rating id="ratingLab" total={5} rating={movie.Rating} />
          </a>
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
              {#each movie.Genres as genre, index}
                {genre.GenreName}{#if index != movie.Genres.length - 1},{/if}
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
            <span class="ml-1">FSK {movie.Fsk}</span>
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
            <span class="ml-1">{movie.TimeInMin}min</span>
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

            <span class="ml-1">{getYear(movie.ReleaseDate)}</span>
          </p>
        </div>
        <div
          class=" text-textWhite my-5 mx-5 sm:text-sm md:text-md xl:text-xl 2xl:text-2xl break-words text-justify"
        >
          <span class="break-words">{movie.Description}</span>
        </div>
      </div>
    </div>
    <section id="cinemas" class="py-8 antialiased mt-2">
      {#key cinema}
        <div
          in:fly={{ x: 100 * direction, duration: 400, delay: 401 }}
          out:fly={{ x: -100 * direction, duration: 400 }}
        >
          {#if cinema == "Not selected"}
            <Cinemas
              on:dataLoaded={(e) => {
                cinema = e.detail.cinema;
                direction = 1;
              }}
            />
          {:else}
            <Showings
              {cinema}
              {movie}
              on:changeCinema={(e) => {
                cinema = "Not selected";
                direction = -1;
              }}
            />
          {/if}
        </div>
      {/key}
    </section>
    <section id="ratings" class=" py-8 antialiased mt-5 rounded-md">
      <div class="max-w-2xl mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg lg:text-2xl font-bold text-textWhite">
            Reviews ({reviewAmount})
          </h2>
        </div>
        <form class="mb-6">
          <div
            class="py-2 px-4 mb-4 bg-headerBlue rounded-lg rounded-t-lg border border-gray-200"
          >
            <label for="comment" class="sr-only">Your review</label>
            <textarea
              id="review"
              rows="6"
              bind:value={textAreaValue}
              disabled={!isUserLoggedIn}
              class="px-0 w-full text-sm bg-headerBlue text-textWhite placeholder:text-textWhite border-0 focus:ring-0 focus:outline-none disabled:cursor-not-allowed"
              placeholder={isUserLoggedIn
                ? "Write your review here..."
                : "To write a review you have to be logged in"}
              required
            />
          </div>
          <div class="flex justify-between">
            <button
              type="button"
              on:click={async () => {
                const { value: accept } = await Swal.fire({
                  title: "Spoiler information",
                  text: "Spoilers are allowed in reviews, but please be sure to mark them as spoilers.",
                  input: "checkbox",
                  icon: "info",
                  inputValue: 1,
                  inputPlaceholder: `
                    My review contains spoilers
                  `,
                  confirmButtonText: `
                    Continue&nbsp;<i class="fa fa-arrow-right"></i>
                  `,
                });
                submitReview(accept);
              }}
              disabled={textAreaValue.length === 0 ||
                !isUserLoggedIn ||
                rating === 0}
              class="inline-flex items-center disabled:cursor-not-allowed py-2.5 px-4 text-xs font-medium text-center text-white bg-buttonBlue rounded-lg focus:ring-4 focus:ring-primary-200 hover:disabled:bg-red-500 hover:enabled:bg-green-500 duration-300 justify-start"
            >
              Post review
            </button>
            <div class="flex mb-2 justify-end">
              {#each { length: 5 } as _, i}
                <button on:click={() => (rating = i + 1)} type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={rating > i ? "#F5C914" : "none"}
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-[#F5C914] duration-300"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>
              {/each}
            </div>
          </div>
        </form>
        {#key forNow}
          {#each reviews as review, index}
            <article class="relative p-6 text-base bg-inputBlue rounded-lg">
              {#if review.Review.UserID === userID}
                <div class="absolute top-0 right-0">
                  <button
                    class="rounded-full"
                    on:click={() => {
                      deleteReview(review.Review.ID);
                    }}
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 hover:text-red-700 duration-300"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
              {/if}
              <footer class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                  <p
                    class="inline-flex items-center mr-3 text-sm text-textWhite font-bold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 text-darkTextWhite mr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    {review.Username}
                    <Rating
                      id="ratingLab"
                      total={5}
                      rating={review.Review.Rating}
                    />
                  </p>
                </div>
                <p class="inline-flex ml-0 text-sm text-textWhite font-bold">
                  {review.Review.Datetime}
                </p>
              </footer>
              <div class="relative">
                <p
                  class="text-textWhite {!review.Review.showSpoiler &&
                  review.Review.IsSpoiler
                    ? 'blur-sm select-none'
                    : ''} duration-300"
                >
                  {review.Review.Comment}
                </p>
                <button
                  on:click={() => {
                    Swal.fire({
                      title: "Spoiler warning",
                      background: "#2A313A",
                      color: "#FFFFFF",
                      text: "Our system has detected that this review may contains spoilers. Please be sure to read this review at your own risk.",
                      footer:
                        "You can see the review by clicking the button below.",
                      icon: "warning",
                    });
                  }}
                  class="{review.Review.IsSpoiler
                    ? !review.Review.showSpoiler
                      ? ''
                      : 'hidden'
                    : 'hidden'} flex absolute font-semibold text-black duration-500 bg-white rounded-lg px-4 py-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg> This review contains spoilers
                </button>
              </div>
              <div
                class="flex items-center mt-4 space-x-4 {!review.Review
                  .IsSpoiler
                  ? 'hidden'
                  : ''} "
              >
                <button
                  type="button"
                  class="flex items-center text-sm text-textWhite px-4 py-2 rounded-lg font-medium {review
                    .Review.showSpoiler
                    ? 'hover:bg-green-500'
                    : 'hover:bg-red-500'} duration-300"
                  on:click={() =>
                    (review.Review.showSpoiler = !review.Review.showSpoiler)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  {!review.Review.showSpoiler ? "Show spoiler" : "Hide spoiler"}
                </button>
              </div>
            </article>
            {#if index !== reviews.length - 1}
              <hr class="h-px my-8 bg-textWhite border-0" />
            {/if}
          {/each}
        {/key}
      </div>
    </section>
  </div>
  <div class="sm:w-0 md:w-0 lg:w-1/6 xl:1/4 2xl:1/3 flex-shrink-0" />
</div>
