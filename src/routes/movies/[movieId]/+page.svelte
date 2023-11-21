<script lang="ts">
    import { page } from "$app/stores";
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
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
                <div class="">
                    <select >
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                        <option value="5">Option 5</option>
                    </select>
                        
                </div>
            </div>
        </div>
    </div>
   
</div>