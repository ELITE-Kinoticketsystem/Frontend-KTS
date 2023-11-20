<script lang="ts">
    export let movieIds: string[] = [];
    export let title = "";
    import { createEventDispatcher } from "svelte";
    import MainCard from "./mainCard.svelte";

    const dispatch = createEventDispatcher();

    function close() {
        dispatch("close");
    }
</script>

<div
    class="relative z-10"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
>
    <!--
      Background backdrop, show/hide based on slide-over state.
  
      Entering: "ease-in-out duration-500"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in-out duration-500"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class="inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

    <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
            <div
                class="pointer-events-none mt-14 fixed inset-y-0 right-0 flex max-w-full pl-10"
            >
                <!--
            Slide-over panel, show/hide based on slide-over state.
  
            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-full"
              To: "translate-x-0"
            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-0"
              To: "translate-x-full"
          -->
                <div class="pointer-events-auto relative w-screen max-w-md">
                    <!--
              Close button, show/hide based on slide-over state.
  
              Entering: "ease-in-out duration-500"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in-out duration-500"
                From: "opacity-100"
                To: "opacity-0"
            -->
                    <div
                        class="absolute duration-500 left-0 top-0 -ml-8 flex pr-2 pt-4"
                    >
                        <button
                            type="button"
                            class="relative rounded-md text-textWhite hover:text-headerBlue duration-300 focus:outline-none focus:ring-2 focus:ring-black"
                            on:click={close}
                        >
                            <span class="absolute -inset-2.5" />
                            <span class="sr-only">Close panel</span>
                            <svg
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div
                        class="flex h-full flex-col w-fit overflow-x-scroll overscroll-y-none bg-[#40577d] py-6 shadow-xl rounded-lg"
                    >
                        <div class="px-4 sm:px-6">
                            <h2
                                class="text-base font-semibold leading-6 text-textWhite"
                                id="slide-over-title"
                            >
                                {title}
                            </h2>
                        </div>
                        <div class="flex mt-6 mr-5 ml-5">
                            {#each movieIds as movieId}
                                <div class="mx-2">
                                    <MainCard isLast={false} {movieId} />
                                    <br />
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
