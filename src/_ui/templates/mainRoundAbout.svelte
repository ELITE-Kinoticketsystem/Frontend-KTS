<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import DemoUnderrated from '$lib/assets/demoUnderrated.jpeg';
    import DemoMilesMores from '$lib/assets/demoSpiderVerse.jpeg'

    let movies: string[] = [];

    for(let i = 0; i < 5; i++){
        movies.push(DemoUnderrated);   
        movies.push(DemoMilesMores);   
    }

    let previousIndex = 0;
    let middleIndex = 1;
    let nextIndex = 2; 

    onMount(() => {
        const interval = setInterval(() => {
            previousIndex = (previousIndex + 1) % movies.length;
            middleIndex = (middleIndex + 1) % movies.length;
            nextIndex = (nextIndex + 1) % movies.length;
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    });

    $: previousImage = movies[previousIndex];
    $: middleImage = movies[middleIndex];
    $: nextImage = movies[nextIndex];
</script>


<p class="text-textWhite font-bold ml-48" >FOR YOU</p>
<div class="flex justify-center overflow-hidden">
    {#key previousImage}
        <img src={previousImage} alt="" class="relative rounded-2xl mt-3 mb-5 ml-12 max-w-full max-h-64" in:fade={{duration: 1000}}>
    {/key}
    {#key middleImage}
        <img src={middleImage} alt="" class="relative rounded-2xl mt-3 mb-5 ml-12 max-w-full max-h-64" in:fade={{duration: 1000}}>
    {/key}
    {#key nextImage}
        <img src={nextImage} alt="" class="relative rounded-2xl mt-3 mb-5 ml-12 max-w-full max-h-64" in:fade={{duration: 1000}}>
    {/key}
</div>