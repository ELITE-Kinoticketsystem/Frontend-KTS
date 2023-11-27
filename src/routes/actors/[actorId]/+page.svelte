<script lang="ts">
    import MovieRow from "../../../_ui/templates/movieRow.svelte";
    import MainRoundAbout from "../../../_ui/layout/mainRoundAbout.svelte";
    import ImageCarousel from "../../../_ui/templates/imageCarousel.svelte";

    const maxNrOfAwards = 8;

    export let data;
    
    const actorData = data.actorData[0];

</script>

<div class="max-w-6xl mt-3 mx-auto">
    <div class="flex flex-col overflow-hidden">
        <div class="flex-start">
            <div class="flex flex-row mb-8 overflow-hidden">
                <!--<div class="flex-start basis-1/2 mx-auto"> <MainRoundAbout moviesToDisplay={hisMovies} /></div>-->
                <div class="basis-1/3">
                    <ImageCarousel srcs={actorData.imgSrcs}/>
                </div>
                <div class="flex-end basis-2/3 my-auto">
                    <div class=" flex flex-col">
                        <div>
                            <h1
                                class=" text-center font-bold mb-12 text-5xl text-textWhite font-sns"
                            >
                                {actorData.name}
                            </h1>
                        </div>
                        <div class="flex flex-col mx-auto">
                            {#if actorData.awards.length != 0}
                                <h2
                                    class="font-bold flex-start text-lg text-center text-textWhite mx-auto"
                                >
                                    {actorData.name} has won:
                                </h2>
                                <div class="flex flex-col">
                                    {#each actorData.awards.slice(0, maxNrOfAwards) as award}
                                        <p
                                            class=" text-base text-center text-textWhite mx-auto"
                                        >
                                            {award.count}x {award.name}
                                        </p>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                        <div class=" ">
                            <p class="text-textWhite p-8">{actorData.about}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-end">
            <p class="text-textWhite mb-4 text-2xl">Movies with him</p>
            <MovieRow moviesToDisplay={actorData.hisMovies} />
        </div>
    </div>
</div>
