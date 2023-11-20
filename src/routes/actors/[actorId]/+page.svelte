<script lang="ts">
    import MovieRow from "../../../_ui/templates/movieRow.svelte";

    let movieIdsToDisplay: string[] = ["3", "3", "3", "3"];
</script>

<div>
    <div>
        
    </div>
    <div class="">
        <MovieRow {movieIdsToDisplay}/>
    </div>
</div>

