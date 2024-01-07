<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { fire } from "$lib/swalTemplate";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  const maxNrOfChar = 14;

  export let selectedTheatre = {
    ID: "",
    Name: "Select Theatre",
    LogoURL: null,
    AddressID: "",
  };
  let eligibleTheatresAreVisible = 1;
  let theatres: any[] = [];

  $: {
    if (theatres.length === 0) {
      theatres = [
        { ID: "", Name: "No theatres found", LogoURL: null, AddressID: "" },
      ];
    } else {
      theatres = theatres;
    }
    eligibleTheatresAreVisible = eligibleTheatresAreVisible;
  }
  onMount(() => {
    getEligibleTheatres();
  });

  async function getEligibleTheatres() {
    fetch(`${apiUrl}/theatres`, {
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          fire("A database error occured when trying to get theatres", 3000);
          return;
        }

        return response.json();
      })
      .then((fetchedTheatres) => {
        theatres = fetchedTheatres;
      });
  }
</script>

<button
  on:click|stopPropagation={() => {
    ++eligibleTheatresAreVisible;
  }}
  class="relative w-full h-full p-1 bg-buttonBlue ring-slate-500 ring-1 rounded-md hover:bg-blue-300"
>
  <p class="text-center text-textWhite text-[100%] font-semibold">
    {selectedTheatre !== null && selectedTheatre.ID != ""
      ? selectedTheatre.Name.length > maxNrOfChar
        ? selectedTheatre.Name.substr(0, maxNrOfChar - 2) + ".."
        : selectedTheatre.Name
      : "Select Theatre"}
  </p>
  {#key eligibleTheatresAreVisible}
    <div
      class="absolute flex flex-col bottom-0 translate-y-[100.7%] z-10 left-0 w-[100%] min-h-[100%] max-h-[420%]
      overflow-y-hidden hover:overflow-y-auto ring-1 ring-slate-500 rounded-md
      {eligibleTheatresAreVisible % 2 === 0 ? 'flex' : 'hidden'}"
    >
      {#each theatres as curTheatre}
        <button
          class="h-full w-full text-textWhite text-[100%] p-1 bg-buttonBlue ring-1 ring-slate-500 hover:bg-blue-300"
          on:click|stopPropagation={() => {
            selectedTheatre = curTheatre;
            ++eligibleTheatresAreVisible;
            dispatch("theatreWasSelected");
          }}
        >
          {curTheatre.Name.length > maxNrOfChar
            ? curTheatre.Name.substr(0, maxNrOfChar - 2) + ".."
            : curTheatre.Name}
        </button>
      {/each}
    </div>
  {/key}
</button>
