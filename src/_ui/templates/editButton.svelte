<script lang="ts">
  import { goto } from "$app/navigation";

  export let routeWhenClicked = "";
  export let name = "";
  export let isDisabled = false;
</script>

<button
  disabled={isDisabled}
  class="flex flex-row w-full h-full items-center place-content-center bg-buttonBlue rounded-md hover:bg-blue-300
  duration-300 text-textWhite disabled:bg-slate-500 disabled:opacity-60 disabled:cursor-not-allowed"
  on:click={() => {
    goto(routeWhenClicked);
  }}
>
  {#if name === "Theatres"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-[20%] h-[50%]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
      />
    </svg>
  {:else if name === "Halls"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      stroke="null"
      class="w-[20%] h-[50%]"
    >
      <g id="Layer_1" stroke="null">
        <rect
          stroke="#ffffff"
          stroke-width="10"
          rx="4"
          id="svg_2"
          height="83.24564"
          width="80"
          y="6.84214"
          x="10"
          fill="none"
        />
        <g stroke="null" id="svg_17">
          <g stroke="null" id="svg_6">
            <rect
              stroke="#ffffff"
              id="svg_3"
              height="9.14929"
              width="15.93237"
              y="78.47354"
              x="41.67688"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.20867"
              rx="7.96618"
              id="svg_4"
              cy="78.29055"
              cx="49.64306"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.17207"
              rx="3.84334"
              id="svg_5"
              cy="65.84752"
              cx="49.64306"
              fill="#ffffff"
            />
          </g>
          <g stroke="null" id="svg_10">
            <rect
              stroke="#ffffff"
              id="svg_7"
              height="9.14929"
              width="15.93237"
              y="78.47354"
              x="69.03256"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.20867"
              rx="7.96618"
              id="svg_8"
              cy="78.29055"
              cx="76.99874"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.17207"
              rx="3.84334"
              id="svg_9"
              cy="65.84752"
              cx="76.99874"
              fill="#ffffff"
            />
          </g>
          <g stroke="null" id="svg_14">
            <rect
              stroke="#ffffff"
              id="svg_11"
              height="9.14929"
              width="15.93237"
              y="78.47354"
              x="14.85963"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.20867"
              rx="7.96618"
              id="svg_12"
              cy="78.29055"
              cx="22.82581"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.17207"
              rx="3.84334"
              id="svg_13"
              cy="65.84752"
              cx="22.82581"
              fill="#ffffff"
            />
          </g>
        </g>
        <g stroke="null" id="svg_43">
          <g stroke="null" id="svg_34">
            <rect
              stroke="#ffffff"
              id="svg_31"
              height="9.14929"
              width="15.93237"
              y="47.24545"
              x="41.7646"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.20867"
              rx="7.96618"
              id="svg_32"
              cy="47.06246"
              cx="49.73078"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.17207"
              rx="3.84334"
              id="svg_33"
              cy="34.61943"
              cx="49.73078"
              fill="#ffffff"
            />
          </g>
          <g stroke="null" id="svg_38">
            <rect
              stroke="#ffffff"
              id="svg_35"
              height="9.14929"
              width="15.93237"
              y="47.24545"
              x="69.12028"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.20867"
              rx="7.96618"
              id="svg_36"
              cy="47.06246"
              cx="77.08647"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.17207"
              rx="3.84334"
              id="svg_37"
              cy="34.61943"
              cx="77.08647"
              fill="#ffffff"
            />
          </g>
          <g stroke="null" id="svg_42">
            <rect
              stroke="#ffffff"
              id="svg_39"
              height="9.14929"
              width="15.93237"
              y="47.24545"
              x="14.94735"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.20867"
              rx="7.96618"
              id="svg_40"
              cy="47.06247"
              cx="22.91353"
              fill="#ffffff"
            />
            <ellipse
              stroke="#ffffff"
              ry="4.17207"
              rx="3.84334"
              id="svg_41"
              cy="34.61944"
              cx="22.91353"
              fill="#ffffff"
            />
          </g>
        </g>
      </g>
    </svg>
  {:else if name === "Movies"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-[20%] h-[50%]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
      />
    </svg>
  {:else if name === "Events"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-[20%] h-[50%]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
      />
    </svg>
  {:else if name === "Genres"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-[20%] h-[50%]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    </svg>
  {/if}
  <p class="text-textWhite text-[1.6cqw] font-semibold">Edit {name}</p>
</button>
