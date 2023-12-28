<script lang="ts">
  import MainPageMovieRow from "../../_ui/layout/_mainpage/mainPageMovieRow.svelte";
  import CinemaTile from "../../_ui/templates/cinemaTile.svelte";
  import Cinemahall from "../../_ui/templates/cinemahall.svelte";
  import SelSeatOverview from "../../_ui/templates/selSeatOverview.svelte";
  import Timer from "../../_ui/templates/timer.svelte";

  let moviesToDisplay = [
    {
      src: "https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=",
      movieName: "Steph Curry: Underrated",
      movieId: "1",
      genre: ["great", "spectacular", "awesome"],
      movieDescription:
        "The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion",
      fsk: "0",
      rating: "4.7",
    },
    {
      src: "https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=",
      movieName: "Steph Curry: Underrated",
      movieId: "1",
      genre: ["great", "spectacular", "awesome"],
      movieDescription:
        "The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion",
      fsk: "0",
      rating: "4.7",
    },
    {
      src: "https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=",
      movieName: "Steph Curry: Underrated",
      movieId: "1",
      genre: ["great", "spectacular", "awesome"],
      movieDescription:
        "The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion",
      fsk: "0",
      rating: "4.7",
    },
    {
      src: "https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=",
      movieName: "Steph Curry: Underrated",
      movieId: "1",
      genre: ["great", "spectacular", "awesome"],
      movieDescription:
        "The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion",
      fsk: "0",
      rating: "4.7",
    },
    {
      src: "https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=",
      movieName: "Steph Curry: Underrated",
      movieId: "1",
      genre: ["great", "spectacular", "awesome"],
      movieDescription:
        "The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion",
      fsk: "0",
      rating: "4.7",
    },
    {
      src: "https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=",
      movieName: "Steph Curry: Underrated",
      movieId: "1",
      genre: ["great", "spectacular", "awesome"],
      movieDescription:
        "The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion",
      fsk: "0",
      rating: "4.7",
    },
  ];
  let xN = 4;
  let yN = 15;

  let ds: any[] = [];
  let xRow = [];
  for (let i = 0; i < yN; ++i) {
    for (let j = 0; j < xN; ++j) {
      xRow.push({ x: j, y: i });
    }
    ds.push(xRow);
    xRow = [];
  }
</script>

<div class="w-1/5 h-[60vh] mx-auto bg-blue-400">
  <div class="grid grid-rows-{yN} grid-cols-{xN} h-full">
    {#each ds as row}
      {#each row as s}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          class="object-cover h-full max-w-full"
        >
          <rect
            height="100"
            width="100"
            y="0"
            x="0"
            stroke-width="0"
          />
        </svg>
      {/each}
    {/each}
  </div>
</div>
