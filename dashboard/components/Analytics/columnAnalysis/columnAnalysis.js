import styles from "@/styles/columnAnalysis.module.css";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

export const ColumnAnalysis = ({ option, series, type }) => {
  return (
    <div className={styles.main}>
      {option && series && (
        <Chart
          options={option}
          series={series}
          type={type ? type : "bar"}
          width="500px"
          height="300px"
        />
      )}
    </div>
  );
};
