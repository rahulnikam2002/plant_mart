import OrderVerticalListing from "@/components/Listing/Product/Orders/vertical";
import { IconButton } from "@/components/buttons/buttons";
import styles from "@/styles/allOrders.module.css";
import { errorToast } from "@/utils/helper/toasts/toasts.messages";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = useCallback(async () => {
        try {
            const allOrders = await axios.get("/api/orders/all");
            const response = allOrders.data;
            setOrders(response);
        } catch (error) {
            console.log("Err at Orders page:14");
            errorToast("Server Issue, try to refresh!");
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchProductByStatus = (status) => {
        if (status === "Delivered") {
            return orders.filter((item) => item.deliveryStatus === "Delivered").length;
        }
        return orders.filter((item) => item.deliveryStatus !== "Delivered").length;
    };

    return (
        orders && (
            <div className={styles.main}>
                <div className={styles.pageTitle}>
                    <div className={styles.headerGrp}>
                        <IconButton
                            clickFunction={() => router.back()}
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
                                <p>All Orders</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.orderHeader}>
                    <p>
                        All <span style={{ background: "var(--lowLightBlue)", color: "var(--primary)" }}>{orders.length}</span>
                    </p>
                    <p>
                        Pending <span style={{ background: "var(--lowLightRed)", color: "var(--red)" }}>{fetchProductByStatus()}</span>
                    </p>
                    <p>
                        Delivered{" "}
                        <span style={{ background: "var(--lowLightGreen)", color: "var(--green)" }}>{fetchProductByStatus("Delivered")}</span>
                    </p>
                </div>

                {orders &&
                    orders.map((item, index) => (
                        <OrderVerticalListing
                            key={item._id}
                            orderId={item._id}
                            totalAmount={item.totalAmount}
                            userId={item.userId._id}
                            deliveryStatus={item.deliveryStatus}
                            orderedProducts={item.products}
                        />
                    ))}
            </div>
        )
    );
};

export default AllOrders;
