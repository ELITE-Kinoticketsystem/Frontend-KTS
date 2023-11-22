<script lang="ts">
    import { page } from "$app/stores";
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton'; 
    import DropDownMenu from "../../../_ui/templates/dropDownMenu.svelte";
    export let data;
    let regions: string[] = ["Rheinlandpfalz", "Baden-Württemberg", "Berlin", "Sachsen"];
    let types: string[] = ["2D", "3D", "4D", "5D"];

    let frstDropDownItemType = "Region";
    let sndDropDownItemType = "Typ"

    function onFocus(){searchBarOpen = true;}
    function onBlur(){searchBarOpen = false;}
    let searchBarOpen = false;
    let dropdownCol = "";

</script>


<div class="">
    <div class="flex flex-col mx-auto max-w-6xl bg-red-500">
        <div class="mx-auto">
            <iframe class="rounded-lg" width="560" height="315" src="https://www.youtube.com/embed/NHhTMh0nURA?si=bxOxwt_o6PWZ-5Nb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

        <div class="flex flex-row w-full mx-auto bg-green-400">
            <div class="bg-green-200 mx-auto basis-1/2">
                <p>Movie Pic</p>
            </div>
            <div class="bg-green-300 mx-auto basis-1/2">
                <p>Movie description</p>
            </div>
        </div>
        <div class="flex flex-col bg-yellow-900">
            <div class="bg-yellow-800">
                <p class="mx-auto text-center text-textWhite">Please select a cinema to get the showings of the movie</p>
            </div>
            <div class="bg-yellow-200">
                <p>THEATRES</p>
            </div>
            <div class="flex flex-row w-full bg-orange-600">
                <div class="flex-start bg-green-200"> 
                    <DropDownMenu color={dropdownCol} items={regions} type={frstDropDownItemType}/>
                </div>
                <div class="flex bg-green-300">    
                    <DropDownMenu items={types} type={sndDropDownItemType} />
                </div>
                <div class="flex-end">
                    <div class="relative">
                        <div
                          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                        >
                          <svg
                            class="w-4 h-4 text-textWhite"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          type="search"
                          id="default-search"
                          on:focus={onFocus}
                          on:blur={onBlur}
                          class="block p-2 ps-10 {searchBarOpen
                            ? `w-96`
                            : 'w-40'} duration-300 text-sm text-textWhite border border-gray-300 rounded-lg bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={searchBarOpen
                            ? "longSearchBarText"
                            : "shortSearchBarText"}
                        />
                      </div>
            </div>
            </div>
        </div>
    </div>
   
</div>