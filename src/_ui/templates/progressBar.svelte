<script lang="ts">
    export let progress: number = 0;

    $: bgColor =
        progress == 100
            ? "green-500"
            : progress < 51
            ? "red-500"
            : "yellow-500";
</script>

<div class="w-1/3 bg-inputBlue rounded-full h-2.5 mb-4">
    <div
        class="bg-green-500 h-2.5 rounded-full duration-300"
        style="width: {progress}%"
    />
</div>
