<script>
  import { apiUrl } from "$lib/_services/authService";
  import GenreCreate from "../../templates/genreCreate.svelte";
  import GenreEdit from "../../templates/genreEdit.svelte";

  let total = 0;

  async function loadGenres() {
    return new Promise(async (resolve, reject) => {
      const res = await fetch(`${apiUrl}/genres`);
      const data = await res.json();
      total = data.length;
      resolve(data);
    });
  }
  $: total = total;

  let reBuild = 0;
</script>

{#key reBuild}
  {#await loadGenres() then genres}
    <section class="p-3 sm:p-5">
      <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div
          class="bg-headerBlue relative shadow-md sm:rounded-lg overflow-hidden"
        >
          <div
            class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
          >
            <div class="w-full md:w-1/2">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-textWhite"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    class="block p-2 ps-10 w-full duration-300 text-sm text-textWhite border border-gray-300 rounded-lg bg-buttonBlue placeholder:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search"
                    on:input={(e) => {
                      let input = e.target.value.toLowerCase();
                      let rows = document.querySelectorAll("tbody tr");
                      let newTotal = 0;
                      rows.forEach((row) => {
                        let name = row.children[0].textContent.toLowerCase();
                        if (name.indexOf(input) > -1) {
                          row.style.display = "";
                          newTotal++;
                        } else {
                          row.style.display = "none";
                        }
                      });
                      total = newTotal;
                    }}
                  />
                </div>
              </form>
            </div>
            <div class="">
              <GenreCreate
                on:create={() => {
                  reBuild++;
                }}
              />
            </div>
          </div>
          <div class="overflow-x-auto">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-textWhite font-semibold uppercase bg-buttonBlue"
              >
                <tr>
                  <th scope="col" class="px-4 py-3">Name</th>
                  <th scope="col" class="px-4 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {#each genres as genre}
                  <tr class="border-b text-textWhite">
                    <th
                      scope="row"
                      class="px-4 py-3 font-medium text-textWhite whitespace-nowrap"
                      >{genre.GenreName}</th
                    >
                    <td class="px-4 py-3 flex items-center justify-end">
                      <GenreEdit
                        {genre}
                        on:update={() => {
                          reBuild++;
                        }}
                      />
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          <nav
            class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-darkTextWhite">
              Total
              <span class="font-semibold text-textWhite">{total}</span>
            </span>
          </nav>
        </div>
      </div>
    </section>
  {/await}
{/key}
