import CategoryVerticalListing from "@/components/Listing/Product/Category/vertical";
import { IconButton } from "@/components/buttons/buttons";
import styles from "@/styles/allCategories.module.css";
import { errorToast } from "@/utils/helper/toasts/toasts.messages";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const CategoryListingPage = () => {
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    const fetchCategories = useCallback(async () => {
        try {
            const allCategories = await axios.get("/api/category/all");
            const response = allCategories.data;
            setCategories(response);
        } catch (error) {
            console.log("Error at categories page:16");
            errorToast("Server Issue, try to refresh");
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, []);

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
                <p>Type</p>
            </div>
            <div className={styles.allCategoryList}>
                {categories &&
                    categories.map((value) => {
                        return <CategoryVerticalListing categoryName={value} />;
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
