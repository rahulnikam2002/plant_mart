import styles from "@/styles/verticalProductListing.module.css";
import { errorToast, successToast } from "@/utils/helper/toasts/toasts.messages";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const ProductVerticalListing = (props) => {
    const [isPopupVisible, setisPopupVisible] = useState(false);
    const router = useRouter();

    const handlePopUpClose = () => {
        setisPopupVisible(false);
    };

    const handlePopUpOpen = () => {
        setisPopupVisible(true);
    };

    const handleDeleteProduct = useCallback(
        async (id) => {
            try {
                props.setProducts((prev) => prev.filter((product) => product._id !== id));
                const deleteProduct = await axios.post("/api/products/delete", { id }, { withCredentials: true });
                const response = deleteProduct.data;
                successToast("Product Deleted");
                console.log({ response });
            } catch (error) {
                props.setProducts((prev) => [...prev, prev.find((product) => product._id === id)]);
                errorToast("Server issue, please try again");
                console.log(error);
            }
        },
        [props]
    );

    return (
        <div className={styles.singleProductList}>
            <div className={styles.productInfo}>
                <div className={styles.img}>
                    <Image
                        src={props.img}
                        width={500}
                        height={500}
                    />
                </div>
                <div className={styles.productMeta}>
                    <p>{props.productName}</p>
                    <p>plant</p>
                    <p>#{props.sku}</p>
                </div>
            </div>
            <div className={styles.productPrice}>
                <p>Rs {props.price}</p>
            </div>
            <div className={styles.productInventory}>
                <p>{props.stock}</p>
            </div>
            <div className={styles.productWeight}>
                <p>{props.weight} kg</p>
            </div>
            <div className={styles.productDate}>
                <p>{props.date}</p>
            </div>
            <div className={styles.productStatus}>
                <div className={[styles.productStockStatusInner, props.status != "Published" && styles.lowStock].join(" ")}>
                    <p>{props.status}</p>
                </div>

                <div
                    className={styles.moreoptions}
                    onClick={handlePopUpOpen}>
                    <i class="fi fi-bs-menu-dots"></i>
                </div>

                {isPopupVisible == true && (
                    <div className={styles.popUp}>
                        {/* <p>Unpublished</p> */}
                        {/* <p onClick={() => router.push(`/products/edit/${props.productId}`)}>Edit</p> */}
                        <p onClick={() => handleDeleteProduct(props.productId)}>Delete</p>

                        <div
                            className={styles.icon}
                            onClick={handlePopUpClose}
                            style={{ position: "absolute", top: "8px", right: "5px", cursor: "pointer" }}>
                            <i class="fi fi-rr-cross-small"></i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductVerticalListing;
