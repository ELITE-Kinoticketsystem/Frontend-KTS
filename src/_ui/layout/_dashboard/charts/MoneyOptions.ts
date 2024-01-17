export function moneyOptions(data: any, categories: any) {
    return {
    series: [
        {
            name: "Money spent",
            data: data,
        },
        ],
        chart: {
        height: 350,
        type: "area",
        foreColor: "#FAFAFA",
        toolbar: {
            show: true,
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
        enabled: true,
        },
        stroke: {
        curve: "smooth",
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
        text: "Total money spent over the past year in months",
        align: "left",
        },
        grid: {
        show: true,
        borderColor: "#fff",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
            lines: {
            show: true,
            },
        },
        yaxis: {
            lines: {
            show: true,
            },
        },
        row: {
            colors: undefined,
            opacity: 0.5,
        },
        column: {
            colors: undefined,
            opacity: 0.5,
        },
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        },
        xaxis: {
        categories: categories,
        },
    };
};