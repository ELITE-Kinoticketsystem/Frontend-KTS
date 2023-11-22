<script lang="ts">
    import ImageCarousel from "../../../_ui/templates/imageCarousel.svelte";
    import MovieRow from "../../../_ui/templates/movieRow.svelte";
    let movieIdsToDisplay = ["", "", "", "", "", ""];
    let maxNrOfAwards = 8;

    export let data;
    let actorData = data.data[0];
</script>

<div class="max-w-6xl mt-3 mx-auto">
    <div class="flex flex-col overflow-hidden">
        <div class="flex-start">
            <div class="flex flex-row mb-8">
                <ImageCarousel srcs={actorData.imageSrcs} />
                <div class="flex-end basis-1/2 my-auto">
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

            <MovieRow {movieIdsToDisplay} />
        </div>
    </div>
</div>
