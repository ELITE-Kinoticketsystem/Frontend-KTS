<script lang="ts">
  import { AuthService } from "$lib/_services/authService";
  import { Rating } from "flowbite-svelte";
  import { FSK } from "$lib/fsks";
  import Swal from "sweetalert2";
  import { fly } from "svelte/transition";
  import { browser } from "$app/environment";
  import Showings from "../../../_ui/layout/_movies/showings.svelte";
  import Cinemas from "../../../_ui/layout/_movies/cinemas.svelte";

  const authService = new AuthService();

  const isUserLoggedIn = authService.isUserLoggedIn();

  export let data;

  let movie: any = data.movie;

  const reviewAmount = data.reviews.amount;

  const reviews = data.reviews.reviews;

  reviews.forEach((review) => {
    const date = new Date(review.datetime);
    review.datetime = date.toLocaleString();
    review.datetime = review.datetime.split(" ")[0].slice(0, -1);
  });

  movie = {
    src: "https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=",
    movieName: "Stephen Curry Underrated",
    movieId: "1",
    description:
      "The documentary shows the coming-of-age story of Stephen Curry, one of the most influential players in basketball history.\
       The focus is on his rise from barely mediocre college player to four-time NBA champion. \
       Today he is widely considered to be the greatest shooter to ever play the game of basketball \
       and this documentary shows what it took to get to that point. He is also the father to three children \
       and husband to his wife Ayesha Curry who likes to cook food for a living.",
    tags: "funny,goodlooking,beast",
    fsk: "1",
    rating: 4.2,
  };

  let cinema = "";
  if (browser) {
    cinema = window.localStorage.getItem("cinema") || "none";
  }

  let direction = 1;

  $: textAreaValue = "";
  $: disabledLength = true;
  function validateButton() {
    if (textAreaValue.length > 0) {
      disabledLength = false;
    } else {
      disabledLength = true;
    }
  }

  function submitReview() {
    if (isUserLoggedIn && textAreaValue.length > 0) {
      textAreaValue = "";
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
</script>

<head:svelte>
  <title>Cinemika - {movie.movieName}</title>
</head:svelte>

<div class="flex w-screen h-max">
  <div class="w-1/6 flex-shrink-0" />
  <div class="flex-grow">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex flex-col">
      <iframe
        class="rounded-lg w-full 2xl:h-[22rem] xl:h-[22rem] sm:h-max md:h-[18rem] h-max"
        src="https://www.youtube.com/embed/NHhTMh0nURA?si=bxOxwt_o6PWZ-5Nb"
        title="YouTube video player"
        frameborder="0"
        on:mouseenter={() => {}}
        on:mouseleave={() => {}}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
      <div class="flex flex-row mt-14">
        <div class="relative basis-1/3 flex-shrink-0 h-max">
          <img
            src={movie.src}
            alt={movie.movieName}
            class="min-w-full h-auto aspect-auto overflow-hidden rounded-md"
          />
          <button
            class="absolute bottom-0 h-1/5"
            on:click={() => {
              Swal.fire({
                title: "FSK information",
                background: "#2A313A",
                color: "#FFFFFF",
                text: "The German FSK system is a voluntary self-regulatory body that evaluates and rates films and other media in Germany based on their suitability for different age groups. The ratings, which range from FSK 0 (suitable for all ages) to FSK 18 (only for adults), serve as a guideline for parents, educators, and consumers.",
                icon: "info",
                footer:
                  '<a href="https://www.fsk.de/?seitid=2&tid=2" target="base" class="hover:text-green-500 duration-300">Learn more about the FSK system </a>',
              });
            }}
          >
            <img src={FSK.FSK12} alt={movie.fsk} class="h-full opacity-80" />
          </button>
        </div>
        <div class="flex flex-col flex-grow">
          <div
            class="flex text-textWhite mx-auto sm:text-md md:text-xl xl:text-2xl 2xl:text-4xl font-bold"
          >
            <p class="break-words">{movie.movieName}</p>

            <a class="ml-5 mt-1" href="#review">
              <Rating id="ratingLab" total={5} rating={movie.rating} />
            </a>
          </div>
          <div
            class="text-center text-textWhite mt-5 mx-5 sm:text-sm md:text-md xl:text-xl 2xl:text-2xl"
          >
            {movie.description}
          </div>
        </div>
      </div>
      <section id="cinemas" class="py-8 antialiased mt-5">
        {#key cinema}
          <div
            in:fly={{ x: 100 * direction, duration: 400, delay: 401 }}
            out:fly={{ x: -100 * direction, duration: 400 }}
          >
            {#if cinema == "none"}
              <Cinemas
                {data}
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
                  cinema = "none";
                  direction = -1;
                }}
              />
            {/if}
          </div>
        {/key}
      </section>
      <section
        id="ratings"
        class="bg-tileBlue py-8 antialiased mt-5 rounded-md"
      >
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
                on:input={validateButton}
                bind:value={textAreaValue}
                disabled={!isUserLoggedIn}
                class="px-0 w-full text-sm bg-headerBlue text-textWhite placeholder:text-textWhite border-0 focus:ring-0 focus:outline-none disabled:cursor-not-allowed"
                placeholder={isUserLoggedIn
                  ? "Write your review here..."
                  : "To write a review you have to be logged in"}
                required
              />
            </div>
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
                if (accept) {
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
                submitReview();
              }}
              disabled={textAreaValue.length === 0 || !isUserLoggedIn}
              class="inline-flex items-center disabled:cursor-not-allowed py-2.5 px-4 text-xs font-medium text-center text-white bg-buttonBlue rounded-lg focus:ring-4 focus:ring-primary-200 hover:disabled:bg-red-500 hover:enabled:bg-green-500 duration-300"
            >
              Post review
            </button>
          </form>
          {#each reviews as review, index}
            <article class="p-6 text-base bg-inputBlue rounded-lg">
              <footer class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                  <p
                    class="inline-flex items-center mr-3 text-sm text-textWhite font-bold"
                  >
                    <img
                      class="mr-2 w-6 h-6 rounded-full"
                      src={review.userPic}
                      alt={review.username}
                    />{review.username}
                    <Rating id="ratingLab" total={5} rating={review.rating} />
                  </p>
                </div>
                <p class="inline-flex ml-0 text-sm text-textWhite font-bold">
                  {review.datetime}
                </p>
              </footer>
              <div class="relative">
                <p
                  class="text-textWhite {!review.showSpoiler && review.isSpoiler
                    ? 'blur-sm select-none'
                    : ''} duration-300"
                >
                  {review.comment}
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
                  class="{review.isSpoiler
                    ? !review.showSpoiler
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
                class="flex items-center mt-4 space-x-4 {!review.isSpoiler
                  ? 'hidden'
                  : ''} "
              >
                <button
                  type="button"
                  class="flex items-center text-sm text-textWhite px-4 py-2 rounded-lg font-medium {review.showSpoiler
                    ? 'hover:bg-green-500'
                    : 'hover:bg-red-500'} duration-300"
                  on:click={() => (review.showSpoiler = !review.showSpoiler)}
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
                  {!review.showSpoiler ? "Show spoiler" : "Hide spoiler"}
                </button>
              </div>
            </article>
            {#if index !== reviews.length - 1}
              <hr class="h-px my-8 bg-textWhite border-0" />
            {/if}
          {/each}
        </div>
      </section>
    </div>
  </div>
  <div class="w-1/6 flex-shrink-0" />
</div>
