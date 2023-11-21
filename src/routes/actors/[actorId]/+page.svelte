<script lang="ts">
    import MovieRow from "../../../_ui/templates/movieRow.svelte";

    let movieIdsToDisplay = ["","","","","",""]

    let src = "";

    export let data;
    let localdata = data.data[0];
    src = localdata.src;

</script>

<div class="mx-52">
    <div class="flex flex-col overflow-hidden">
        <div class="flex-start">
                <div class="flex flex-row mb-12">
                    <div class="flex-start">
                        <img class="w-80" {src} alt="Actor" />
                    </div>
                    <div class="flex-end">
                        <div class="flex flex-col">
                            <div class="mt-12 mb-8">
                                <p>{localdata.about}</p>
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
