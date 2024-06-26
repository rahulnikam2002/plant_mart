import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/allProducts.module.css";
import { adminVerification } from "@/utils/helper/authentication/admin/admin.verification";
import { Button, IconButton } from "@/components/buttons/buttons";
import Image from "next/image";
import { useRouter } from "next/router";
import ProductVerticalListing from "@/components/Listing/Product/vertical";
import axios from "axios";

const ProductsPage = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const res = await axios.get("/api/products/search");
        const data = res.data;
        console.log(data);
        setProducts(data);
        setLoading(false);
    };

    const router = useRouter();
    return (
        <div className={styles.main}>
            <div className={styles.pageTitle}>
                <div className={styles.headerGrp}>
                    <IconButton
                        bgColor={"#f5f7f9"}
                        clickFunction={() => router.back()}
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
                        <IconButton
                            onClick={() => alert(true)}
                            width={"fit-content"}
                            rightIcon={
                                <i
                                    style={{ color: "var(--primary)" }}
                                    class="fi fi-ss-angle-small-down"></i>
                            }
                            sx={{ color: "var(--primary)" }}
                            bgColor={"#f5f7f9"}
                            title={"All products"}
                        />
                    </div>
                    <div className={styles.prodType}>
                        <IconButton
                            onClick={() => alert(true)}
                            width={"fit-content"}
                            rightIcon={
                                <i
                                    style={{ color: "var(--primary)" }}
                                    class="fi fi-ss-angle-small-down"></i>
                            }
                            sx={{ color: "var(--primary)" }}
                            bgColor={"#f5f7f9"}
                            title={"All type"}
                        />
                    </div>
                </div>
                <div className={styles.addProduct}>
                    <IconButton
                        onClick={() => {
                            router.push("/products/new");
                        }}
                        leftIcon={
                            <i
                                style={{ color: "var(--white)" }}
                                class="fi fi-rr-add"></i>
                        }
                        title={"Add Product"}
                        width={"fit-content"}
                        padding={"10px"}
                    />
                </div>
            </div>
            <div className={styles.productHeader}>
                <p>Product details</p>
                <p>Price</p>
                <p>Inventory</p>
                <p>Weight</p>
                <p>Date</p>
                <p>Status</p>
            </div>
            <div className={styles.allProductList}>
                {products.map((value) => {
                    return (
                        <ProductVerticalListing
                            productId={value._id}
                            productName={value.productName}
                            price={value.salePrice}
                            weight={value.productWeight}
                            stock={value.productQuantity}
                            img={value.featuredImages[0]}
                            status={"Published"}
                            sku={value.productSKU}
                            date={value.createdAt.split("T")[0]}
                            allProducts={products}
                            setProducts={setProducts}
                        />
                    );
                })}
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
        };
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

const dummyProducts = [
    {
        name: "Alphonso Mango Plant",
        price: 500,
        stock: 677,
        img: "https://images.unsplash.com/photo-1621872507418-e158640eee49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        weight: 3,
        sku: "12-67-87",
        date: "12/9/23",
        status: "Published"
    },
    {
        name: "Knockout Rose Plant",
        price: 200,
        stock: 899,
        img: "https://images.unsplash.com/photo-1528402288002-20c468eb8bcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9zZSUyMGJ1c2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        weight: 4,
        sku: "14-y7-87",
        date: "1/1/23",
        status: "Low stock"
    },

    {
        name: "Apple Tree Grafted-plant",
        price: 600,
        stock: 269,
        img: "https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjB0cmVlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        weight: 4,
        sku: "14-55-87",
        date: "1/10/23",
        status: "Low stock"
    }
];
