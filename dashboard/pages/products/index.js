import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});
// import Chart from "react-apexcharts";

const ProductsPage = () => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setOptions({
      chart: {
        id: "basic-bar",
        background: "transparent",
        foreColor: "transparent",
        sparkline: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      theme: {
        mode: "dark",
        palette: "palette2",
        monochrome: {
          enabled: true,
          color: "#255aee",
          shadeTo: "dark",
          shadeIntensity: 0.65
        }
      },
      grid: {
        show: false, // you can either change hear to disable all grids
        xaxis: {
          lines: {
            show: false //or just here to disable only x axis grids
          }
        },
        yaxis: {
          lines: {
            show: false //or just here to disable only y axis
          }
        }
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      stroke: {
        curve: "smooth"
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["var(--primary)"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      }
    });
    setSeries([
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]);
  }, []);

  return (
    <div>
      <p>Hello products!</p>
      <Chart
        options={options}
        series={series}
        type="line"
        width="500"
      />
    </div>
  );
};

export default ProductsPage;
