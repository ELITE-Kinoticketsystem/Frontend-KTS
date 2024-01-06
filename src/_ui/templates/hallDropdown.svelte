<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { fire } from "$lib/swalTemplate";

  export let selectedTheatre: any;
  export let selectedHall: any;
  let eligibleHallsAreVisible = 1;
  let halls: any[] = [];
  const maxNrOfChar = 11;

  $: if (selectedTheatre.ID !== null && selectedTheatre.ID !== "") {
    getHalls();
  }

  async function getHalls() {
    fetch(`${apiUrl}/theatres/${selectedTheatre.ID}/cinema-halls`, {
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          fire("A database error occured", 3000);
          return;
        }

        return response.json();
      })
      .then((fetchedHalls) => {
        halls = fetchedHalls;
      });
  }
</script>

<button
  disabled={halls.length === 0}
  on:click={() => {
    ++eligibleHallsAreVisible;
  }}
  class="disabled:bg-slate-500 disabled:opacity-60 disabled:cursor-not-allowed relative w-full h-full p-1 bg-buttonBlue ring-slate-500 ring-1 rounded-md hover:bg-blue-300"
>
  <p class="text-center text-textWhite text-[100%] font-semibold">
    {selectedHall !== null && selectedHall.ID != ""
      ? selectedHall.Name.length > maxNrOfChar
        ? selectedHall.Name.substr(0, maxNrOfChar - 2) + ".."
        : selectedHall.Name
      : "Select hall"}
  </p>
  <div
    class="absolute flex flex-col bottom-0 translate-y-[100.7%] z-10 left-0 w-[100%] min-h-[100%] max-h-[420%]
      overflow-y-hidden hover:overflow-y-auto ring-1 ring-slate-500 rounded-md
      {eligibleHallsAreVisible % 2 === 0 ? 'flex' : 'hidden'}"
  >
    {#each halls as curHall}
      <button
        class="h-full w-full text-textWhite text-[100%] p-1 bg-buttonBlue ring-1 ring-slate-500 hover:bg-blue-300"
        on:mousedown={() => {
          selectedHall = curHall;
          ++eligibleHallsAreVisible;
        }}
      >
        {curHall.Name.length > maxNrOfChar
          ? curHall.Name.substr(0, maxNrOfChar - 2) + ".."
          : curHall.Name}
      </button>
    {/each}
  </div>
</button>
