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
      },
      dataLabels: {
        enabled: false
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
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      }
    });
    setSeries([
      {
        name: "Sales",
        data: [30, 40, 45, 50, 49, 60, 70]
      }
    ]);
  }, []);

  return (
    <div>
      <p>Hello products!</p>
      <Chart
        options={options}
        series={series}
        type="area"
        width="90%"
      />
    </div>
  );
};

export default ProductsPage;
