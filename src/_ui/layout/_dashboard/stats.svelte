<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { onMount } from "svelte";
  import { timeOptions } from "./charts/TimeOptions";
  import { moneyOptions } from "./charts/MoneyOptions";
  import { genreOptions } from "./charts/GenreOptions";
  import Podium from "./podium.svelte";

  //Total time spend over the years (months, years)
  //Total money spend over the years (months, years)
  //Total watched movies over the years (months, years)
  //Most watched genres
  //Most watched actors

  let orders: any[] = [];

  let totalTotalTime = 0;
  let totalMoneySpend = 0;

  function getDataForMoneySpend() {
    let totalMoneyMap = new Map();

    orders.forEach((order) => {
      let price = order.Order.Totalprice / 100;
      let date = new Date(order.Event.Start);

      if (date.getTime() <= new Date().getTime()) {
        let month = date.getMonth();

        if (totalMoneyMap.has(month)) {
          totalMoneyMap.set(month, totalMoneyMap.get(month) + price);
        } else {
          totalMoneyMap.set(month, price);
        }
        totalMoneySpend += order.Order.Totalprice;
      }
    });
    let totalMoneyArray = Array.from(
      { length: 12 },
      (_, month) => totalMoneyMap.get(month) || 0
    );
    return totalMoneyArray.reverse();
  }

  function getDataForTimeSpend() {
    let totalTimeMap = new Map();

    orders.forEach((order) => {
      let allMovies = order.Movies;
      allMovies.forEach((movie) => {
        let timeInMin = movie.TimeInMin;
        let date = new Date(order.Event.Start);

        if (date.getTime() <= new Date().getTime()) {
          let month = date.getMonth();

          if (totalTimeMap.has(month)) {
            totalTimeMap.set(month, totalTimeMap.get(month) + timeInMin);
          } else {
            totalTimeMap.set(month, timeInMin);
          }
          totalTotalTime += timeInMin;
        }
      });
    });
    let totalTimeArray = Array.from(
      { length: 12 },
      (_, month) => totalTimeMap.get(month) || 0
    );
    return totalTimeArray.reverse();
  }

  let uniqueGenres: any[] = [];
  let visitedGenres = new Map();

  function getCategories() {
    let categories: string[] = [];
    let currentDate = new Date();
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (let i = 11; i >= 0; i--) {
      let month = currentDate.getMonth() - i;
      let year = currentDate.getFullYear();
      if (month < 0) {
        month += 12;
        year--;
      }

      categories.push(monthNames[month]);
    }

    return categories;
  }

  async function getWatchedGenresForCategories() {
    return new Promise(async (resolve, reject) => {
      let genres: string[] = [];
      const fetchPromises: any[] = [];
      orders.forEach((order) => {
        let allMovies = order.Movies;

        allMovies.forEach((movie: any) => {
          const fetchPromise = fetch(apiUrl + "/movies/" + movie.ID)
            .then(async (response) => {
              const movieData = await response.json();

              if (movieData.Genres !== null) {
                movieData.Genres.forEach((genre: any) => {
                  if (!genres.includes(genre.GenreName)) {
                    genres.push(genre.GenreName);
                  }
                  if (visitedGenres.has(genre.GenreName)) {
                    visitedGenres.set(
                      genre.GenreName,
                      visitedGenres.get(genre.GenreName) + 1
                    );
                  } else {
                    visitedGenres.set(genre.GenreName, 1);
                  }
                });
              }
            })
            .catch((error) => {
              reject(error);
            });

          fetchPromises.push(fetchPromise);
        });
      });

      try {
        await Promise.all(fetchPromises);
        resolve(genres);
      } catch (error) {
        reject(error);
      }
    });
  }

  async function getAllOrders() {
    const orderResponse = await fetch(apiUrl + "/orders", {
      credentials: "include",
      method: "GET",
      mode: "cors",
    });
    const orderJson = await orderResponse.json();
    return orderJson;
  }

  onMount(async () => {
    orders = await getAllOrders();
    const ApexCharts = (await import("apexcharts")).default;

    var totalTimeChart = new ApexCharts(
      document.querySelector("#totalTimeChart"),
      timeOptions(getDataForTimeSpend(), getCategories())
    );
    totalTimeChart.render();

    var totalMoneyChart = new ApexCharts(
      document.querySelector("#totalMoneyChart"),
      moneyOptions(getDataForMoneySpend(), getCategories())
    );
    totalMoneyChart.render();

    await getWatchedGenresForCategories().then((genres) => {
      uniqueGenres = genres;
      let data = [];
      for (let [key, value] of visitedGenres) {
        data.push(Number(value));
      }
      var totalGenresChart = new ApexCharts(
        document.querySelector("#totalGenresChart"),
        genreOptions(data, uniqueGenres)
      );
      totalGenresChart.render();
    });
  });
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</svelte:head>
<!-- Total time Stats-->
<div class="text-textWhite bg-tileBlue mt-5 rounded-md shadow-md px-2 py-2">
  <h5 class="leading-none text-3xl font-bold text-textWhite pb-2">
    {totalTotalTime} min
  </h5>
  <div id="totalTimeChart" class="px-2" />
</div>
<!-- Total money spend Stats-->
<div class="text-textWhite bg-tileBlue mt-5 rounded-md shadow-md px-2 py-2">
  <h5 class="leading-none text-3xl font-bold text-textWhite pb-2">
    {(totalMoneySpend / 100).toFixed(2)} €
  </h5>
  <div id="totalMoneyChart" class="px-2" />
</div>

<!--Most watched genres-->
<div class="text-textWhite bg-tileBlue mt-5 rounded-md shadow-md px-2 py-2">
  <h5 class="leading-none text-3xl font-bold text-textWhite pb-2">
    {uniqueGenres.length} genres
  </h5>
  <div id="totalGenresChart" class="px-2" />
</div>

<!--Podim watched genres-->
<div class="text-textWhite bg-tileBlue mt-5 rounded-md shadow-md px-2 py-2">
  <h5 class="leading-none text-3xl font-bold text-textWhite pb-2">
    Your favorite actors
  </h5>
  <div class="py-10">
    <Podium />
  </div>
</div>
