<script lang="ts">
  import { Line } from "svelte-chartjs";
  export let data: any;

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from "chart.js";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );
</script>

<Line
  {data}
  options={{
    responsive: true,
    color: "white",
    locale: "de-DE",
    indexAxis: "x",
  }}
/>
