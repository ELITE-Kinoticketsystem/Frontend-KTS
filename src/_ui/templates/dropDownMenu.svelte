<script lang="ts">
    let isOpen = false;
    export let type = "item";
    export let selectedItem = `Select a ${type}`;
    export let items = ["Item 1", "Item 2"];
    export let color = "bg-slate-400";
    export let hoverColor = "hover:bg-slate-300";
</script>

<div class="flex flex-col">
    <div class="relative">
        <button
            class="relative flex-start text-left {color} {hoverColor} pl-3 pr-14 py-2 rounded-md"
            on:click={() => {
                isOpen = !isOpen;
            }}
        >
            {selectedItem}
            {#if isOpen}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
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
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="absolute right-0 mx-1 mb-2 top-1/4 w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                </svg>
            {/if}
        </button>
    </div>
    {#each items as item}
        <button
            class="{isOpen
                ? 'block'
                : 'hidden'} flex-end absolute-bottom w-full text-left {color} {hoverColor} px-3 py-2 rounded-md"
            on:click={() => {
                selectedItem = item;
                isOpen = !isOpen;
            }}
        >
            {item}
        </button>
    {/each}
</div>
