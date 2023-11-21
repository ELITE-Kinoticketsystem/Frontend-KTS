<script lang="ts">
    import MovieRow from "../../../_ui/templates/movieRow.svelte";

    let movieIdsToDisplay = ["","","","","",""]

    let src = "";

    export let data;
    let actorData = data.data[0];
    src = actorData.src;

</script>

<div class="max-w-6xl mt-3 mx-auto">
    <div class="flex flex-col overflow-hidden">
        <div class="flex-start">
                <div class="flex flex-row mb-8">
                    <div class="flex-start mx-auto basis-1/2">
                        <img class="w-96 mx-auto" {src} alt="Actor" />
                    </div>
                    <div class="flex-end basis-1/2  my-auto">
                        <div class=" flex flex-col">
                            <div>
                               <h1 class="text-center mb-12 text-4xl text-textWhite font-sns">{actorData.name}</h1> 
                            </div>
                            <div class="flex flex-row ">
                                <div class="mx-auto basis-1/2 rounded-sm px-auto bg-textWhite">
                                    <p class="text-center px-auto">{actorData.name} has won {actorData.awards.at(0)} {actorData.awards.at(1)}</p>
                                </div>
                            </div>
                            <div class="mt-12 mb-8 ">
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
