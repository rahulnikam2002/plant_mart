import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { adminVerification } from "@/utils/helper/authentication/admin/admin.verification";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});
// import Chart       from "react-apexcharts";

const ProductsPage = () => {

  return (
    <div>
      <p>Hello products!</p>
      {/* <Chart
        options={options}
        series={series}
        type="area"
        width="90%"
      /> */}
      
    </div>
  );
};

export default ProductsPage;

export const getServerSideProps = async (ctx) => {
  try {
    const myCookie = ctx.req?.cookies || "";
    const res = await adminVerification(myCookie.token);
    if (res.code === 0) {
      return {
        redirect: {
          destination: `/login?redirectTo=/products`,
          permanent: false
        }
      };
    }
    return{
      props: {
        isLogin: true
      }
    }
  } catch (err) {
    // console.log(err)
    return {
      redirect: {
        destination: `/login?redirectTo=/products`,
        permanent: false
      }
    };
  }
};
