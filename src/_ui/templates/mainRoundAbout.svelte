<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    import DemoUnderrated from '$lib/assets/demoUnderrated.jpeg';

    let movies: string[] = [];

    movies.push(DemoUnderrated);
    movies.push(DemoUnderrated);
    movies.push(DemoUnderrated);

    let activeIndex = 0;
    let showCount = 3;

    onMount(() => {
        const interval = setInterval(() => {
            activeIndex = (activeIndex + 1) % movies.length;
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<p class="text-textWhite font-bold ml-48" >FOR YOU</p>
<div class="flex justify-center overflow-hidden">
    {#each movies as movie, i}
        {#if i >= activeIndex && i < activeIndex + showCount}
        <img src={movie} alt="" class="relative rounded-2xl mt-3 mb-5 ml-12 max-w-full max-h-64" in:fade={{duration: 500}}>
        {/if}
    {/each}
</div>