import styles from "@/styles/AnalyticsBox.module.css";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

export const AnalysisBox = ({
  title,
  percentage,
  number,
  data,
  currency,
  chartType,
  reportTooltip,
  toolTipColor
}) => {
  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <p className={styles.title}>
          {title} <span style={{color: toolTipColor, background: toolTipColor+"30"}} className={styles.tooltip}>{reportTooltip}</span>
        </p>
        <div className={styles.percentage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            // className={styles.}
            style={{
              color: percentage > 0 ? `var(--green)` : "var(--red)",
              transform: percentage <= 0 && "rotate(180deg)"
            }}
            aria-hidden="true"
            role="img"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24">
            <g fill="currentColor">
              <path
                d="M5 17.75a.75.75 0 0 1-.488-1.32l7-6a.75.75 0 0 1 .976 0l7 6A.75.75 0 0 1 19 17.75H5Z"
                opacity="0.5"></path>
              <path
                fill-rule="evenodd"
                d="M4.43 13.488a.75.75 0 0 0 1.058.081L12 7.988l6.512 5.581a.75.75 0 1 0 .976-1.138l-7-6a.75.75 0 0 0-.976 0l-7 6a.75.75 0 0 0-.081 1.057Z"
                clip-rule="evenodd"></path>
            </g>
          </svg>
          <p>{percentage}%</p>
        </div>
        <p className={styles.number}>
          {currency}
          {number}
        </p>
      </div>
      <div className={styles.right}>
        {data && (
          <Chart
            options={data.options}
            series={data.series}
            type={chartType ? chartType : "bar"}
            width="100%"
            height="150px"
          />
        )}
      </div>
    </div>
  );
};
