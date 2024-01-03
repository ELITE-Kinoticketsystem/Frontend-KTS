<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { apiUrl } from "$lib/_services/authService";
  import { createEventDispatcher } from "svelte";

  export let cinema: any;
  export let movie: any;

  const dispatcher = createEventDispatcher();

  async function reOrganizeShowings() {
    return new Promise(async (resolve, reject) => {
      await getShowings()
        .then((data: any) => {
          console.warn(data);
          if (data === null || data === undefined)
            reject("There are currently no showings");
          let showings = new Map();
          data.forEach((showing: any) => {
            let date = getDate(showing.Start);
            if (showings.has(date)) {
              showings.get(date).push(showing);
            } else {
              showings.set(date, [showing]);
            }
          });
          resolve(showings);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function getTime(dateTime: string) {
    let date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  async function getShowings() {
    let tId = await new Promise((resolve, reject) => {
      if (browser) {
        if (localStorage.getItem("cinemaId") === null) {
          dispatcher("changeCinema");
          reject("No cinema selected");
        } else resolve(localStorage.getItem("cinemaId"));
      } else {
        dispatcher("changeCinema");
        reject("No cinema selected");
      }
    });
    return new Promise(async (resolve, reject) => {
      await fetch(apiUrl + "/movies/" + movie.ID + "/events/" + tId).then(
        (res) => {
          if (res.ok) {
            resolve(res.json());
          } else {
            reject(res);
          }
        }
      );
    }).catch((err) => {
      return err;
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
  {#await reOrganizeShowings() then showings}
    <div class="grid grid-cols-4 gap-x-4 gap-y-10">
      {#each [...showings] as [key, value]}
        <div class="flex flex-col bg-tileBlue text-textWhite rounded-md py-2">
          <div
            class="flex flex-row text-lg font-semibold mx-3 items-center justify-between"
          >
            {key}
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
          {#each value as showing}
            <div
              class="grid grid-cols-1 gap-x-4 bg-[#1a1f26] rounded-md mt-2 mx-2"
            >
              <div class="grid grid-cols-2 gap-y-2 px-2 py-1">
                <div class="grid">
                  {getTime(showing.Start)} ({showing.Is3d ? "3D" : "2D"})
                </div>
                <div class="grid">
                  <button
                    class="hover:scale-110 duration-300"
                    on:click={() => {
                      goto("/seatselection/" + showing.ID);
                    }}>Book</button
                  >
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {:catch error}
    <div class="text-textWhite text-2xl font-bold mb-6">
      {error}
    </div>
  {/await}
</div>
