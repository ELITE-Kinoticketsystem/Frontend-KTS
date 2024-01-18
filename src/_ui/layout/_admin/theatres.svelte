<script lang="ts">
  import { apiUrl } from "$lib/_services/authService";
  import { onMount } from "svelte";
  import { theatreOptions } from "./charts/theatreOptions";
  import { goto } from "$app/navigation";

  let theatres: any;

  const allTimeMultiplier = 10;

  const filterTypes = [
    "Last 7 days",
    "Last 30 days",
    "Last year",
    "Next 30 days",
    "Next year",
    "All time",
  ];

  const sortRanges = new Map();
  sortRanges.set("Last 7 days", "DAY");
  sortRanges.set("Last 30 days", "DAY");
  sortRanges.set("Next 30 days", "DAY");
  sortRanges.set("Last year", "MONTH");
  sortRanges.set("Next year", "MONTH");
  sortRanges.set("All time", "YEAR");

  let chartRange: any[] = [];

  let totalVisits: number[] = [];
  let totalRevenue: number[] = [];
  let charFilterType: any[] = [];
  let apexcharts: any[] = [];
  let showDropdowns: boolean[] = [];
  let ApexCharts: any;

  $: {
    charFilterType = charFilterType;
    apexcharts = apexcharts;
    totalRevenue = totalRevenue;
    totalVisits = totalVisits;
    apexcharts = apexcharts.sort((a, b) => {
      let eLA = a.el.id.substring(0, a.el.id.indexOf("-"));
      let eLB = b.el.id.substring(0, b.el.id.indexOf("-"));
      return eLA - eLB;
    });
  }

  async function getTheatres() {
    const res = await fetch(apiUrl + "/theatres");
    const data = await res.json();
    theatres = data;
    return data;
  }

  function getMultiplierFromType(type: string) {
    switch (type) {
      case "Last 7 days":
        return 7;
      case "Last 30 days":
        return 30;
      case "Last year":
        return 365;
      case "Next 30 days":
        return -30;
      case "Next year":
        return -365;
      case "All time":
        return 0;
      default:
        return 1;
    }
  }

  async function fetchData(start: Date, end: Date, sortType: string) {
    let fetchUrl = apiUrl + "/stats/visits/";
    fetchUrl += sortType;
    fetchUrl +=
      "/" +
      start.toISOString().split("T")[0] +
      "/" +
      end.toISOString().split("T")[0];
    return new Promise((resolve) => {
      fetch(fetchUrl, {
        credentials: "include",
      }).then((response) => {
        response.json().then((data) => {
          resolve(data);
        });
      });
    });
  }
  function getPreviousDateWithMultiplier(multiplier: number) {
    let currentDate = new Date();
    let startDate = new Date(
      currentDate.getTime() - multiplier * 24 * 60 * 60 * 1000
    );
    return startDate;
  }

  function updateChart(index: number) {
    let localChart = apexcharts[index];
    let start = chartRange[index].start;
    let end = chartRange[index].end;
    fetchData(start, end, sortRanges.get(charFilterType[index])).then(
      (data: any) => {
        for (let i = 0; i < data.Date.length; i++) {
          data.Date[i] = new Date(data.Date[i]).toLocaleDateString();
        }
        let tC = 0;
        for (let i = 0; i < data.Count.length; i++) {
          tC += data.Count[i];
        }
        let tR = 0;
        for (let i = 0; i < data.Revenue.length; i++) {
          tR += data.Revenue[i];
          data.Revenue[i] = (data.Revenue[i] / 100).toFixed(2);
        }
        totalRevenue[index] = tR;
        totalVisits[index] = tC;
        localChart.updateOptions({
          xaxis: {
            categories: data.Date,
          },
          series: [
            {
              name: "Revenue",
              data: data.Revenue,
            },
            {
              name: "Visits",
              data: data.Count,
            },
          ],
        });
      }
    );
  }

  $: onload = (el: any) => {
    let currentDate = new Date();
    let startDate = new Date(
      currentDate.getTime() -
        getMultiplierFromType(filterTypes[0]) * 24 * 60 * 60 * 1000
    );
    chartRange = [...chartRange, { start: startDate, end: currentDate }];

    fetchData(startDate, currentDate, sortRanges.get(filterTypes[0])).then(
      (data: any) => {
        for (let i = 0; i < data.Date.length; i++) {
          data.Date[i] = new Date(data.Date[i]).toLocaleDateString();
        }
        let tC = 0;
        for (let i = 0; i < data.Count.length; i++) {
          tC += data.Count[i];
        }
        let tR = 0;
        for (let i = 0; i < data.Revenue.length; i++) {
          tR += data.Revenue[i];
          data.Revenue[i] = (data.Revenue[i] / 100).toFixed(2);
        }

        totalVisits = [...totalVisits, tC];
        totalRevenue = [...totalRevenue, tR];
        var theatreChart = new ApexCharts(el, theatreOptions(data, data.Date));
        theatreChart.render();
        apexcharts = [...apexcharts, theatreChart];
        charFilterType = [...charFilterType, filterTypes[0]];
        showDropdowns[showDropdowns.length] = false;
      }
    );
  };

  let showTotalDropdown = false;
  let totalFilterType = filterTypes[0];
  let totalRange = {
    start: getPreviousDateWithMultiplier(
      getMultiplierFromType(totalFilterType)
    ),
    end: new Date(),
  };

  let totalChart: any;
  let totalChartVisits: number = 0;
  let totalChartRevenue: number = 0;
  $: totalChartVisits = totalChartVisits;
  onMount(async () => {
    ApexCharts = (await import("apexcharts")).default;
    fetchData(
      totalRange.start,
      totalRange.end,
      sortRanges.get(filterTypes[0])
    ).then((data: any) => {
      for (let i = 0; i < data.Date.length; i++) {
        data.Date[i] = new Date(data.Date[i]).toLocaleDateString();
      }
      let tC = 0;
      for (let i = 0; i < data.Count.length; i++) {
        tC += data.Count[i];
      }
      let tR = 0;
      for (let i = 0; i < data.Revenue.length; i++) {
        tR += data.Revenue[i];
        data.Revenue[i] = (data.Revenue[i] / 100).toFixed(2);
      }
      totalChartRevenue = tR;
      totalChartVisits = tC;
      totalChart = new ApexCharts(
        document.querySelector("#total-Chart"),
        theatreOptions(data, data.Date)
      );
      totalChart.render();
    });
  });

  function updateTotalChart() {
    fetchData(
      totalRange.start,
      totalRange.end,
      sortRanges.get(totalFilterType)
    ).then((data: any) => {
      for (let i = 0; i < data.Date.length; i++) {
        data.Date[i] = new Date(data.Date[i]).toLocaleDateString();
      }
      let tC = 0;
      for (let i = 0; i < data.Count.length; i++) {
        tC += data.Count[i];
      }

      let tR = 0;
      for (let i = 0; i < data.Revenue.length; i++) {
        tR += data.Revenue[i];
        data.Revenue[i] = (data.Revenue[i] / 100).toFixed(2);
      }
      totalChartRevenue = tR;
      totalChartVisits = tC;
      totalChart.updateOptions({
        xaxis: {
          categories: data.Date,
        },
        series: [
          {
            name: "Revenue",
            data: data.Revenue,
          },
          {
            name: "Visits",
            data: data.Count,
          },
        ],
      });
    });
  }
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</svelte:head>
<div class="flex flex-col text-textWhite rounded-md shadow-md px-2 py-2">
  <div class="my-4">
    <div
      class="mb-10 rounded-md px-5 py-5 hover:scale-[1.03] duration-300 bg-tileBlue"
    >
      <div class="text-textWhite font-semibold text-2xl">All theatres</div>
      <hr />
      <div class="flex w-full h-full">
        <div class="w-full bg-headerBlue rounded-lg shadow p-4 md:p-6 mt-3">
          <div class="flex justify-between mb-5">
            <div class="grid gap-4 grid-cols-2">
              <div>
                <h5
                  class="inline-flex items-center text-textWhite leading-none font-normal mb-2"
                >
                  Visits
                </h5>
                <p class="text-darkTextWhite text-2xl leading-none font-bold">
                  {totalChartVisits}
                </p>
              </div>
              <div>
                <h5
                  class="inline-flex items-center text-textWhite leading-none font-normal mb-2"
                >
                  Revenue
                </h5>
                <p class="text-darkTextWhite text-2xl leading-none font-bold">
                  {(totalChartRevenue / 100).toFixed(2)}€
                </p>
              </div>
            </div>
            <div>
              <button
                id="totalChart-dropdownButton"
                on:click={() => {
                  showTotalDropdown = !showTotalDropdown;
                  for (let i = 0; i < showDropdowns.length; i++) {
                    showDropdowns[i] = false;
                  }
                }}
                type="button"
                class="px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-buttonBlue rounded-lg border border-gray-200 hover:bg-tileBlue hover:text-darkTextWhite focus:z-10 focus:ring-4 duration-300"
                >{totalFilterType}
                <svg
                  class="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg></button
              >
              <div
                id="lastDaysdropdown"
                class:hidden={!showTotalDropdown}
                class="z-10 hidden bg-buttonBlue mt-2 divide-y divide-gray-100 rounded-lg shadow w-44 absolute"
              >
                <ul
                  class="py-2 text-sm text-textWhite"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {#each filterTypes as type}
                    <button
                      on:click={() => {
                        if (type == totalFilterType) {
                          return;
                        }
                        totalFilterType = type;
                        if (getMultiplierFromType(type) > 0) {
                          totalRange.start = getPreviousDateWithMultiplier(
                            getMultiplierFromType(type)
                          );
                          totalRange.end = new Date();
                        } else if (getMultiplierFromType(type) < 0) {
                          totalRange.start = new Date();
                          totalRange.end = getPreviousDateWithMultiplier(
                            getMultiplierFromType(type)
                          );
                        } else {
                          let currentDate = new Date();
                          let startDate = new Date(
                            currentDate.getTime() -
                              allTimeMultiplier * 356 * 24 * 60 * 60 * 1000
                          );
                          let endDate = new Date(
                            currentDate.getTime() -
                              (-allTimeMultiplier / 2) *
                                356 *
                                24 *
                                60 *
                                60 *
                                1000
                          );
                          totalRange.start = startDate;
                          totalRange.end = endDate;
                        }

                        updateTotalChart();
                        showTotalDropdown = false;
                      }}
                      class="block w-full px-4 py-2 hover:bg-tileBlue duration-300 text-left {type ==
                      totalFilterType
                        ? 'bg-tileBlue opacity-80 cursor-not-allowed'
                        : ''}"
                    >
                      <li>{type}</li></button
                    >
                  {/each}
                </ul>
              </div>
            </div>
          </div>
          <div id="total-Chart"></div>
        </div>
      </div>
    </div>
  </div>
  <hr class="w-1/3 h-1 bg-textWhite border-0 rounded mx-auto" />
  <div class="mt-10">
    <button
      class="flex mb-10 rounded-md px-5 py-5 w-full hover:scale-[1.03] duration-300 bg-tileBlue"
      on:click={() => {
        goto("/admin/mylocations/add");
      }}
    >
      <div class="flex mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mr-2 hover:animate-spin duration-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Create new theatre
      </div>
    </button>
  </div>
  <hr class="w-1/3 h-1 bg-textWhite border-0 rounded mx-auto mb-10" />
  {#await getTheatres() then theatres}
    {#each theatres as theatre, index}
      <div
        class="mb-10 rounded-md px-5 py-5 hover:scale-[1.03] duration-300 bg-tileBlue"
      >
        <div class="text-textWhite font-semibold text-2xl">
          {theatre.Name}: {theatre.Address.City +
            ", " +
            theatre.Address.Street +
            " " +
            theatre.Address.StreetNr}
        </div>
        <hr />
        <div class="flex w-full h-full">
          <div class="w-full bg-headerBlue rounded-lg shadow p-4 md:p-6 mt-3">
            <div class="flex justify-between mb-5">
              <div class="grid gap-4 grid-cols-2">
                <div>
                  <h5
                    class="inline-flex items-center text-textWhite leading-none font-normal mb-2"
                  >
                    Visits
                  </h5>
                  <p class="text-darkTextWhite text-2xl leading-none font-bold">
                    {totalVisits[index]}
                  </p>
                </div>
                <div>
                  <h5
                    class="inline-flex items-center text-textWhite leading-none font-normal mb-2"
                  >
                    Revenue
                  </h5>
                  <p class="text-darkTextWhite text-2xl leading-none font-bold">
                    {(totalRevenue[index] / 100).toFixed(2)}€
                  </p>
                </div>
              </div>
              <div>
                <button
                  id="{index}-{theatre.Name}-dropdownButton"
                  on:click={() => {
                    showDropdowns[index] = !showDropdowns[index];
                    for (let i = 0; i < showDropdowns.length; i++) {
                      if (i != index) {
                        showDropdowns[i] = false;
                      }
                    }
                  }}
                  type="button"
                  class="px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-buttonBlue rounded-lg border border-gray-200 hover:bg-tileBlue hover:text-darkTextWhite focus:z-10 focus:ring-4 duration-300"
                  >{charFilterType[index]}
                  <svg
                    class="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg></button
                >
                <div
                  id="lastDaysdropdown"
                  class:hidden={!showDropdowns[index]}
                  class="z-10 hidden bg-buttonBlue mt-2 divide-y divide-gray-100 rounded-lg shadow w-44 absolute"
                >
                  <ul
                    class="py-2 text-sm text-textWhite"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {#each filterTypes as type}
                      <button
                        on:click={() => {
                          if (type == charFilterType[index]) {
                            return;
                          }
                          charFilterType[index] = type;
                          if (getMultiplierFromType(type) > 0) {
                            chartRange[index].start =
                              getPreviousDateWithMultiplier(
                                getMultiplierFromType(type)
                              );
                            chartRange[index].end = new Date();
                          } else if (getMultiplierFromType(type) < 0) {
                            chartRange[index].start = new Date();
                            chartRange[index].end =
                              getPreviousDateWithMultiplier(
                                getMultiplierFromType(type)
                              );
                          } else {
                            let currentDate = new Date();
                            let startDate = new Date(
                              currentDate.getTime() -
                                allTimeMultiplier * 356 * 24 * 60 * 60 * 1000
                            );
                            let endDate = new Date(
                              currentDate.getTime() -
                                (-allTimeMultiplier / 2) *
                                  356 *
                                  24 *
                                  60 *
                                  60 *
                                  1000
                            );
                            chartRange[index].start = startDate;
                            chartRange[index].end = endDate;
                          }
                          updateChart(index);
                          showDropdowns[index] = false;
                        }}
                        class="block w-full px-4 py-2 hover:bg-tileBlue duration-300 text-left {type ==
                        charFilterType[index]
                          ? 'bg-tileBlue opacity-80 cursor-not-allowed'
                          : ''}"
                      >
                        <li>{type}</li></button
                      >
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
            <div id="{index}-chart" use:onload></div>
          </div>
        </div>
      </div>
    {/each}
  {/await}
</div>
