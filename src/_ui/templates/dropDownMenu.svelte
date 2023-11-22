<script lang="ts">
    import { onMount } from "svelte";

    let isOpen = false;
    export let type = "item";
    let selectedItem = `Select a ${type}`;
    export let items = ["Item 1", "Item 2"];
    export let color = "bg-white";
    export let hoverColor = "hover:bg-slate-300";
</script>

<div class="flex flex-col min-w-fit">
    <div class="relative flex-shrink-0 flex flex-row flex-grow-0">
        <button
            class="relative flex-start flex-shrink-0 font-thin text-left w-44 {color} {hoverColor} pl-2 pr-14 py-1 ring-1 ring-inset ring-slate-300"
            on:click={() => {
                isOpen = !isOpen;
            }}
        >
            <div class="flex flex-row flex-shrink-0">
                {selectedItem}
                {#if isOpen}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        class="absolute right-0 mx-1 top-1/2 -translate-y-1/2 w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                    </svg>
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        class="absolute right-0 mx-1 mb-2 top-0 translate-y-1/4 w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                {/if}
            </div>
        </button>
    </div>
    {#each items as item}
        <button
            class="{isOpen
                ? 'block'
                : 'hidden'} flex-end absolute-bottom w-full font-thin text-left {color} {hoverColor} pl-2 pr-13 py-1 ring-1 ring-inset ring-slate-300"
            on:click={() => {
                selectedItem = item;
                isOpen = !isOpen;
            }}
        >
            {item}
        </button>
    {/each}
</div>
