<script>
    import { browser } from "$app/environment";

    $: showButton = true;
    if (browser) {
        document.addEventListener("scroll", () => {
            const scrollableHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            if (window.scrollY >= scrollableHeight) {
                showButton = false;
            } else {
                showButton = true;
            }
        });
    } else {
        showButton = false;
    }
    let nextPosition = 0.6;
    function moveDown() {
        window.scrollTo({
            top: window.innerHeight * nextPosition,
            behavior: "smooth",
        });
        nextPosition += 0.6;
    }
</script>

{#if showButton}
    <button on:click={moveDown}>
        <style>
            .fixed-bottom {
                position: fixed;
                left: 50%;
                transform: translateX(-50%);
                bottom: 5%;
                z-index: 10;
            }
        </style>

        <div class="fixed-bottom py-5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8 animate-bounce z-50 text-textWhite bg-inputBlue rounded-full duration-300 px-1 py-1"
            >
                <path
                    fill-rule="evenodd"
                    d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
    </button>
{/if}
