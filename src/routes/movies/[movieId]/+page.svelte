<script lang="ts">
    import { page } from "$app/stores";
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import DropDownMenu from "../../../_ui/templates/dropDownMenu.svelte";
    export let data;
    export let items: string[] = ["ace", "pace", "collin", "aceee"];

</script>


<div class="">
    <div class="flex flex-col mx-auto max-w-6xl bg-red-500">
        <div class=" bg-green-400">

        </div>
        <div class="flex flex-col bg-yellow-400">
            <div class="bg-yellow-100">
                <p class="mx-auto text-center text-textWhite">Please select a cinema to get the showings of the movie</p>
            </div>
            <div class="bg-yellow-200">
                <p>THEATRES</p>
            </div>
            <div class="flex flex-row bg-yellow-600">
                <DropDownMenu>

                </DropDownMenu>
            </div>
        </div>
    </div>
   
</div>