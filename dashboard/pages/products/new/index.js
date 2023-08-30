import { TextArea, TextInput } from "@/components/Inputs/Inputs";
import { IconButton, LinkButton } from "@/components/buttons/buttons";
import styles from "@/styles/newproduct.module.css";
import { adminVerification } from "@/utils/helper/authentication/admin/admin.verification";
import { useState } from "react";
const NewProductPage = () => {
  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [prodCat, setProdCat] = useState("");

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.headerbtn}>
          <LinkButton
            href="/"
            title="Dashboard"
          />
        </div>
      </div>

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
              <p>Back to product list</p>
            </div>
            <div className={styles.bottomTxt}>
              <p>Add New Product</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.addProduct}>
        <div className={styles.col1}>
          <div>
            <p className={styles.title}>Description</p>
            <div className={styles.prodDes}>
              <div className={styles.innerProdNameInput}>
                <TextInput
                  setText={(e) => setProductName(e.target.value)}
                  label={"Product name"}
                  placeholder={"Product name"}
                />
              </div>
              <div className={styles.innerProdDescInput}>
                <TextArea
                  setText={(e) => setDescription(e.target.value)}
                  label={"Description"}
                  placeholder={"Description"}
                />
              </div>
            </div>
          </div>
          <div className={styles.prodCatArea}>
            <p className={styles.title}>Category</p>
            <div className={styles.prodCat}>
              <div className={styles.innerProdInput}>
                <TextInput
                  setText={(e) => setProdCat(e.target.value)}
                  label={"Product Category"}
                  placeholder={"Health and Medicine"}
                />
              </div>
              <div className={styles.innerProdInput}>
                <TextInput
                  label={"Product Category"}
                  placeholder={"Beauty"}
                />
              </div>
            </div>
          </div>
          <div className={styles.inventory}>
            <p className={styles.title}>Inventory</p>
            <div className={styles.inventoryinfo}>
              <div className={styles.quantity}>
                <TextInput
                  label={"Quantity"}
                  placeholder={1020}
                />
              </div>
              <div className={styles.sku}>
                <TextInput
                  label={"SKU"}
                  placeholder={"uu-br-br-05"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.col2}>
          <p>oooottt</p>
        </div>
      </div>
    </div>
  );
};

export default NewProductPage;

export const getServerSideProps = async (ctx) => {
  try {
    const myCookie = ctx.req?.cookies || "";
    const res = await adminVerification(myCookie.token);
    console.log(res)
    if (res.code === 0) {
      return {
        redirect: {
          destination: "/login?redirectTo=/products/new",
          permanent: false
        }
      };
    }
    return {
      props: {
        isLogin: true
      }
    };
  } catch (err) {
    // console.log(err)
    return {
      redirect: {
        destination: "/login?redirectTo=/products/new",
        permanent: false
      }
    };
  }
};
