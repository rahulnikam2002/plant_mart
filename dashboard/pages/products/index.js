import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from '@/styles/allProducts.module.css'
import { adminVerification } from "@/utils/helper/authentication/admin/admin.verification";
import { Button, IconButton } from "@/components/buttons/buttons";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});
// import Chart       from "react-apexcharts";

const ProductsPage = () => {

  return (
    <div className={styles.main}>
      <div className={styles.pageTitle}>
        <div className={styles.headerGrp}>
          <IconButton
            bgColor={"#f5f7f9"}
            padding={"0px 10px"}
            leftIcon={
              <i
                style={{ color: "#000" }}
                class="fi fi-rr-arrow-small-left"></i>
            }
            width={"fit-content"}
          />
          <div className={styles.textGrp}>
            <div className={styles.topTxt}>
              <p>Back to dashboard</p>
            </div>
            <div className={styles.bottomTxt}>
              <p>All Products</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.productCta}>
        <div className={styles.filter}>
          <div className={styles.filterBy}>
            <p>Filter By</p>
          </div>
          <div className={styles.prodFilter}>
            <IconButton width={"fit-content"} rightIcon={<i style={{ color: "var(--primary)" }} class="fi fi-ss-angle-small-down"></i>} sx={{ color: "var(--primary)" }} bgColor={"#f5f7f9"} title={"All products"} />
          </div>
          <div className={styles.prodType}>
            <IconButton width={"fit-content"} rightIcon={<i style={{ color: "var(--primary)" }} class="fi fi-ss-angle-small-down"></i>} sx={{ color: "var(--primary)" }} bgColor={"#f5f7f9"} title={"All type"} />

          </div>
        </div>
        <div className={styles.addProduct}>
        <IconButton leftIcon={<i style={{color:"var(--white)"}} class="fi fi-rr-add"></i>} title={"Add Product"} width={"fit-content"} padding={"10px"}/>
        </div>
      </div>
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
    return {
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
