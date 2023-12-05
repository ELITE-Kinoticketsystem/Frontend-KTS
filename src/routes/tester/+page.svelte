<script>
  import MainPageMovieRow from "../../_ui/layout/_mainpage/mainPageMovieRow.svelte";
import CinemaTile from "../../_ui/templates/cinemaTile.svelte";
import Cinemahall from "../../_ui/templates/cinemahall.svelte";
  import SelSeatOverview from "../../_ui/templates/selSeatOverview.svelte";
  import Timer from "../../_ui/templates/timer.svelte";

  let moviesToDisplay = [
    {
    src: 'https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=',
    movieName: 'Steph Curry: Underrated',
    movieId: '1',
    genre: [ 'great', 'spectacular', 'awesome' ],
    movieDescription: 'The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion',
    fsk: '0',
    rating: '4.7'
  },
  {
    src: 'https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=',
    movieName: 'Steph Curry: Underrated',
    movieId: '1',
    genre: [ 'great', 'spectacular', 'awesome' ],
    movieDescription: 'The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion',
    fsk: '0',
    rating: '4.7'
  },
  {
    src: 'https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=',
    movieName: 'Steph Curry: Underrated',
    movieId: '1',
    genre: [ 'great', 'spectacular', 'awesome' ],
    movieDescription: 'The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion',
    fsk: '0',
    rating: '4.7'
  },
  {
    src: 'https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=',
    movieName: 'Steph Curry: Underrated',
    movieId: '1',
    genre: [ 'great', 'spectacular', 'awesome' ],
    movieDescription: 'The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion',
    fsk: '0',
    rating: '4.7'
  },{
    src: 'https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=',
    movieName: 'Steph Curry: Underrated',
    movieId: '1',
    genre: [ 'great', 'spectacular', 'awesome' ],
    movieDescription: 'The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion',
    fsk: '0',
    rating: '4.7'
  }
  ,{
    src: 'https://resizing.flixster.com/P5ZdS6yYcgAsXniyJV6xMfCP1CM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhmMGUwMzg0LTg4OWYtNDNlNy05OWExLTBhNTMwZTJiMTBmZC5wbmc=',
    movieName: 'Steph Curry: Underrated',
    movieId: '1',
    genre: [ 'great', 'spectacular', 'awesome' ],
    movieDescription: 'The story of Wardell Stephen Curry from average high-schooler to 4x NBA-Champion',
    fsk: '0',
    rating: '4.7'
  }
  ];

</script>

<div class="w-1/5 h-96 mx-auto bg-blue-400">

    <MainPageMovieRow textData={{refs: ["/yourwatchlist", "/likedbyother"], txt: ["Your watchlist", "Liked by others"]}} {moviesToDisplay}/>

</div>
