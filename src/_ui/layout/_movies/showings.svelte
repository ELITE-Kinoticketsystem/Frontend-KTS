<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { createEventDispatcher } from "svelte";

  export let cinema: any;
  export let movie: any;

  const dispatcher = createEventDispatcher();

  async function getShowings() {
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: 1,
          day: "2023-11-30",
          times: [
            { time: "14:00", type: "2D" },
            { time: "15:00", type: "3D" },
            { time: "16:00", type: "2D" },
          ],
        },
        {
          id: 2,
          day: "2023-12-01",
          times: [
            { time: "14:00", type: "2D" },
            { time: "15:00", type: "3D" },
            { time: "16:00", type: "2D" },
          ],
        },
        {
          id: 3,
          day: "2023-12-02",
          times: [
            { time: "14:00", type: "2D" },
            { time: "15:00", type: "3D" },
            { time: "16:00", type: "2D" },
          ],
        },
        {
          id: 4,
          day: "2023-12-03",
          times: [
            { time: "14:00", type: "2D" },
            { time: "15:00", type: "3D" },
            { time: "16:00", type: "2D" },
          ],
        },
        {
          id: 5,
          day: "2023-12-09",
          times: [
            { time: "14:00", type: "2D" },
            { time: "15:00", type: "3D" },
            { time: "16:00", type: "2D" },
          ],
        },
        {
          id: 6,
          day: "2023-12-10",
          times: [
            { time: "14:00", type: "2D" },
            { time: "15:00", type: "3D" },
            { time: "16:00", type: "2D" },
          ],
        },
        {
          id: 7,
          day: "2023-12-12",
          times: [
            { time: "14:00", type: "2D" },
            { time: "15:00", type: "3D" },
            { time: "16:00", type: "2D" },
          ],
        },
        {
          id: 8,
          day: "2023-12-30",
          times: [
            { time: "14:00", type: "2D" },
            { time: "15:00", type: "3D" },
            { time: "16:00", type: "2D" },
          ],
        },
      ]);
    });
  }

  function getDate(datetime: string): string {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let currentDate = new Date(Date.now());
    let showingDate = new Date(datetime);
    if (new Date(datetime).getDate() === currentDate.getDate())
      return "Today, " + showingDate.toLocaleDateString();
    else {
      return (
        weekday[showingDate.getDay()] + ", " + showingDate.toLocaleDateString()
      );
    }
  }
</script>

<div class="flex flex-col bg-123-500">
  <div
    class="flex flex-row text-textWhite text-2xl font-bold mb-6 justify-between"
  >
    Cinema: {cinema}
    <button
      on:click={() => {
        dispatcher("changeCinema");
      }}
      class="text-textWhite bg-buttonBlue rounded-md text-[1.23rem] px-2 py-px hover:bg-green-500 duration-300"
      >Change cinema</button
    >
  </div>
  {#await getShowings() then showings}
    <div class="grid grid-cols-4 gap-x-4 gap-y-10">
      {#each showings as showing}
        <div class="flex flex-col bg-tileBlue text-textWhite rounded-md py-2">
          <div
            class="flex flex-row text-lg font-semibold mx-3 items-center justify-between"
          >
            {getDate(showing.day)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
              />
              <path
                fill-rule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          {#each showing.times as time}
            <div
              class="grid grid-cols-1 gap-x-4 bg-[#1a1f26] rounded-md mt-2 mx-2"
            >
              <div class="grid grid-cols-2 gap-y-2 px-2 py-1">
                <div class="grid">{time.time} ({time.type})</div>
                <div class="grid">
                  <button
                    class="hover:scale-110 duration-300"
                    on:click={() => {
                      goto("/seatselection");
                    }}>Book</button
                  >
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/await}
</div>
