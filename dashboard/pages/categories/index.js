import CategoryVerticalListing from "@/components/Listing/Product/Category/vertical";
import { IconButton } from "@/components/buttons/buttons";
import styles from "@/styles/allCategories.module.css";

const CategoryListingPage = () => {
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
              <p>All Categories</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.catCta}>
        <div className={styles.filter}>
          <div className={styles.filterBy}>
            <p>Filter By</p>
          </div>
          <div className={styles.catFilter}>
            <IconButton
              width={"fit-content"}
              rightIcon={
                <i
                  style={{ color: "var(--primary)" }}
                  class="fi fi-ss-angle-small-down"></i>
              }
              sx={{ color: "var(--primary)" }}
              bgColor={"#f5f7f9"}
              title={"All Categories"}
            />
          </div>
        </div>
        <div className={styles.addCategory}>
          <IconButton
            onClick={() => {
              router.push("/products/new");
            }}
            leftIcon={
              <i
                style={{ color: "var(--white)" }}
                class="fi fi-rr-add"></i>
            }
            title={"Add Category"}
            width={"fit-content"}
            padding={"10px"}
          />
        </div>
      </div>
      <div className={styles.catHeader}>
        <p>Category</p>
        <p>Products</p>
        <p>Status</p>
        <p>Active</p>
      </div>
      <div className={styles.allCategoryList}>
        {dummyCategories.map((value) => {
          return (
            <CategoryVerticalListing
              categoryName={value.name}
              product={value.product}
              status={value.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryListingPage;

const dummyCategories = [
  {
    name: "Fertilizers",
    product: 3,
    status: "Active"
  },
  {
    name: "Fruit Plants",
    product: 3,
    status: "Active"
  },
  {
    name: "Plant",
    product: 10,
    status: "Inactive"
  },
  {
    name: "vegetable plant",
    product: 10,
    status: "Active"
  },
  {
    name: "Plant",
    product: 10,
    status: "Inactive"
  },
  {
    name: "Fruit Plants",
    product: 3,
    status: "Active"
  }
];
