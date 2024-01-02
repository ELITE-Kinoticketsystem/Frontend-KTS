<script lang="ts">
  export let hallname = "Select a hall";
  let eligibleHallsAreVisible = 1;
  let hallnames: string[] = [
    "Cineplex",
    "Cinestar",
    "Elias",
    "NAme1",
    "NAme1",
    "NAme1",
  ];

  $: {
    if (hallnames.length === 0) {
      hallnames = ["No halls found"];
    } else {
      hallnames = hallnames;
    }
  }

  async function showEligibleHalls() {
    // hallnamedata = await fetch("url");
    // hallnames = await hallnamedata.json();
  }
</script>

<button
  on:click={() => {
    showEligibleHalls();
    ++eligibleHallsAreVisible;
  }}
  class="relative w-full h-full p-1 bg-buttonBlue ring-slate-500 ring-1 rounded-md hover:bg-blue-300"
>
  <p class="text-center text-textWhite text-[100%] font-semibold">
    {hallname}
  </p>
  <div
    class="absolute flex flex-col bottom-0 translate-y-[100.7%] z-10 left-0 w-[100%] min-h-[100%] max-h-[420%]
      overflow-y-hidden hover:overflow-y-auto ring-1 ring-slate-500 rounded-md
      {eligibleHallsAreVisible % 2 === 0 ? 'flex' : 'hidden'}"
  >
    {#each hallnames as curHallname}
      <button
        class="h-full w-full text-textWhite text-[100%] p-1 bg-buttonBlue ring-1 ring-slate-500 hover:bg-blue-300"
        on:mousedown={() => {
          hallname = curHallname;
          ++eligibleHallsAreVisible;
        }}
      >
        {curHallname}
      </button>
    {/each}
  </div>
</button>
