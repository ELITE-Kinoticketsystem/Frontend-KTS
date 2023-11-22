<script lang="ts">
    import { onMount } from "svelte";

    let isOpen = false;
    export let type = "item";
    let selectedItem = `Select a ${type}`;
    export let items = ["Item 1", "Item 2"];
    export let color = "bg-white";
    export let hoverColor = "hover:bg-slate-300";
</script>



<div class="relative flex-col min-w-fit">
    

    <button
        class="flex-start relative rounded-t-md font-thin text-left w-56 bg-white {hoverColor} pl-2 pr-14 py-1 ring-1 ring-inset ring-slate-300"
        on:click={() => {isOpen = !isOpen;}}>

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
        
    </button>

    {#if isOpen}
    <div class="absolute top-0 translate-y-8 w-full">
        {#each items as item, i}
            <button
                class="flex-end {(i === (items.length-1)) ? "rounded-b-md" : ""} w-full font-thin text-left {color} {hoverColor} pl-2 pr-13 py-1 ring-1 ring-inset ring-slate-300"
                on:click={() => {
                    selectedItem = item;
                    isOpen = !isOpen;
                }}
            >
                {item}
            </button>
        {/each}
    </div>
    {/if}
    
</div>
