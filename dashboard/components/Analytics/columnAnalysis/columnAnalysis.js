import styles from "@/styles/columnAnalysis.module.css";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

export const ColumnAnalysis = ({ data }) => {
  return (
    <div className={styles.main}>
      {data && (
        <Chart
          options={data.analysisOption}
          series={data.analysisSeries}
          type={"bar"}
          width="500px"
          height="300px"
        />
      )}
    </div>
  );
};
