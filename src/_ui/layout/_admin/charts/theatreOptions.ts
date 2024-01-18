export function theatreOptions(data: any, categories: any){
    return{
        chart: {
          height: "100%",
          maxWidth: "100%",
          type: "line",
          fontFamily: "Inter, sans-serif",
          dropShadow: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 6,
        },
        grid: {
          show: true,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -26
          },
        },
        series: [
          {
            name: "Revenue",
            data: data.Revenue,
            color: "#7E3AF2",
          },
          {
            name: "Visits",
            data: data.Count,
            color: "#1A56DB",
          },
        ],
        legend: {
          show: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: categories,
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: 'text-xs font-normal fill-textWhite'
            }
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
      }
}