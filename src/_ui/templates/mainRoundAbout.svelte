<script lang="ts">
    import "../../app.css";
    import DemoUnderrated from '$lib/assets/demoUnderrated.jpeg';
    //import DemoOppenheimer from '$lib/assets/demoOppenheimer.jpeg';
    //import DemoSpiderVerse from '$lib/assets/demoSpiderVerse.jpeg';

    let picturesToDisplay = 3;

    let movies: string[] = [];

    movies.push(DemoUnderrated);
    movies.push(DemoUnderrated);
    movies.push(DemoUnderrated);

    $: displayedMovies = movies.slice(0, picturesToDisplay);

</script>

<p class="text-textWhite font-bold ml-48" >FOR YOU</p>
<div class="flex justify-center overflow-hidden">
    {#each displayedMovies as movie}
        <img src={movie} alt="" class="relative rounded-2xl mt-3 mb-5 ml-12 max-w-full max-h-64">
    {/each}
</div>