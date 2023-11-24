<script>
    export let color = "bg-red-500";
    export let type = "Regular";
</script>

{#if type == "Regular"}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style="width: 100%; height: auto;"
    >
        <rect
            x="10"
            y="50"
            width="80"
            height="30"
            rx="5"
            ry="5"
            fill="#CCCCCC"
        />
        <path d="M20,50 A15,15 0 0,1 80,50" fill="#CCCCCC" />
    </svg>
{/if}
