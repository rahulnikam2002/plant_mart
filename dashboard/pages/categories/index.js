import CategoryVerticalListing from "@/components/Listing/Product/Category/vertical";
import { IconButton } from "@/components/buttons/buttons";
import styles from "@/styles/allCategories.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CategoryListingPage = () => {
    const router = useRouter();

    return (
        <div className={styles.main}>
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
            </div>
            <div className={styles.catHeader}>
                <p>Category</p>
                <p>Products</p>
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
