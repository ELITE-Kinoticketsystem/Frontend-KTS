export function genreOptions(data: any, genres: any){
    return {
        series: [{
          name: 'Visited',
        data: data
      }],
        chart: {
          type: 'radar',
          height: 500,
          foreColor: "#FAFAFA",
          toolbar: {
            show: false,
            offsetX: 0,
            offsetY: 0,
            tools: {
            download: false,
            selection: false,
            zoom: true,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: true,
            },
            autoSelected: "zoom",
          },
        },
        colors: ["#2f7cde"],
        dataLabels: {
          enabled: true
        },
        fill: {
          type: "gradient",
          gradient: {
              shadeIntensity: 0.5,
              opacityFrom: 0.7,
              opacityTo: 0.8,
              stops: [0, 100],
          },
          },
          title: {
          text: "Your visited genres (total)",
          align: "left",
          },
      xaxis: {
        categories: genres
      }
      };
}