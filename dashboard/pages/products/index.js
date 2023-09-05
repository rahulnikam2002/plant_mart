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
<<<<<<< HEAD
      {/* <Chart
        options={options}
        series={series}
        type="area"
        width="90%"
      /> */}
=======
      
>>>>>>> a82c114b311899439b38b13d9df4980c99881c43
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
