<script lang="ts">
    let isOpen = false;
    export let type = "item";
    let selectedItem = `Select a ${type}`;
    export let items = [
        { name: "Item 1", href: "x" },
        { name: "Item 2", href: "x" },
    ];
    export let color = "bg-slate-400";
    export let hoverColor = "hover:bg-slate-300";
</script>

<div class="flex flex-col">
    <button
        class="relative flex-start text-left {color} {hoverColor} px-3 py-2 rounded-md"
        on:click={() => {
            isOpen = !isOpen;
        }}
    >
        {selectedItem}
    </button>
    {#each items as item}
        <button
            class="{isOpen
                ? 'block'
                : 'hidden'} flex-end absolute-bottom w-full text-left {color} {hoverColor} px-3 py-2 rounded-md"
            on:click={() => {
                selectedItem = item.name;
                isOpen = !isOpen;
            }}
        >
            {item.name}
        </button>
    {/each}
</div>
