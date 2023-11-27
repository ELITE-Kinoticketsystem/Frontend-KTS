<script lang="ts">
    import { registrationStep } from "$lib/stores";
    import { onMount } from "svelte";

    let colorForSvg1: string;
    let colorForSvg2: string;
    let colorForSvg3: string;

    onMount(async () => {
        const promise = await new Promise((resolve) => {
            registrationStep.subscribe((value) => {
                resolve(value);
            });
        });
        Promise.resolve(promise).then((value) => {
            if (value === 0) {
                colorForSvg1 = "yellow-500";
                colorForSvg2 = "headerBlue";
                colorForSvg3 = "headerBlue";
            }
            if (value === 1) {
                colorForSvg1 = "green-500";
                colorForSvg2 = "yellow-500";
                colorForSvg3 = "headerBlue";
            }
            if (value === 2) {
                colorForSvg1 = "green-500";
                colorForSvg2 = "green-500";
                colorForSvg3 = "yellow-500";
            }
            if (value === 3) {
                colorForSvg1 = "green-500";
                colorForSvg2 = "green-500";
                colorForSvg3 = "green-500";
            }

        });
    });
</script>

<ol class="flex items-center w-full mb-4 ml-16 mt-2">
    <li
        class="flex w-full items-center text-{colorForSvg1} after:content-[''] after:w-full after:h-1 after:border-b after:border-{colorForSvg1} after:border-4 after:inline-block"
    >
        <div
            class="flex items-center justify-center w-10 h-10 bg-{colorForSvg1} rounded-full shrink-0"
        >
            <svg
                class="w-4 h-4 text-textWhite lg:w-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
            >
                <path
                    d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"
                />
            </svg>
        </div>
    </li>
    <li
        class="flex w-full items-center text-{colorForSvg2} after:content-[''] after:w-full after:h-1 after:border-b after:border-{colorForSvg2} after:border-4 after:inline-block"
    >
        <div
            class="flex items-center justify-center w-10 h-10 bg-{colorForSvg2} rounded-full shrink-0"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-textWhite"
            >
                <path
                    d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"
                />
                <path
                    d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"
                />
            </svg>
        </div>
    </li>
    <li class="flex items-center w-full">
        <div
            class="flex items-center justify-center w-10 h-10 bg-{colorForSvg3} rounded-full shrink-0"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-textWhite"
            >
                <path
                    fill-rule="evenodd"
                    d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5zm6.61 10.936a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clip-rule="evenodd"
                />
                <path
                    d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z"
                />
            </svg>
        </div>
    </li>
</ol>
