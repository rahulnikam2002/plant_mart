import style from "@/styles/verticalOrdersListing.module.css";
import { useState } from "react";
import VerticalOrderProduct from "./verticalOrderProduct";
import { Button, IconButton, LinkButton } from "@/components/buttons/buttons";
import axios from "axios";
import { motion } from "framer-motion";

const OrderVerticalListing = ({ orderId, totalAmount, address, userId, deliveryStatus, orderedProducts, orders, orderedOn }) => {
    const [isChecked, setChecked] = useState(false);
    const [viewDetails, setViewDeatils] = useState(false);

    console.log({ orders });

    const handleCheckboxChange = (e) => {
        setChecked(!isChecked);
        console.log(e.target.checked);
    };

    return (
        <div className={style.singleOrderList}>
            <div className={style.orderDetail}>
                <div className={style.orderNoDetail}>
                    {/* <input
                        type="checkbox"
                        onChange={handleCheckboxChange}
                    /> */}

                    <p style={{ fontWeight: "var(--w600)", fontSize: "var(--font18)" }}>
                        Order <span style={{ color: "black", fontWeight: "var(--w700)" }}>#{orderId.substring(orderId.length - 5)}</span>
                    </p>
                    <div style={{ display: "flex", marginLeft: "5px", gap: "5px" }}>
                        <p
                            style={{
                                background: "var(--lowLightGreen)",
                                color: "var(--green)",
                                padding: "2px 10px",
                                borderRadius: "10px",
                                fontWeight: "500"
                            }}>
                            Cash On Delivery
                        </p>
                        <p
                            style={{
                                background:
                                    (deliveryStatus === "Delivered" && "var(--lowLightGreen)") ||
                                    (deliveryStatus === "Processing" && "var(--lowLightBlue)") ||
                                    (deliveryStatus === "Cancelled" && "var(--lowLightRed)"),
                                color:
                                    (deliveryStatus === "Delivered" && "var(--green)") ||
                                    (deliveryStatus === "Processing" && "var(--primary)") ||
                                    (deliveryStatus === "Cancelled" && "var(--red)"),
                                padding: "2px 10px",
                                borderRadius: "10px",
                                fontWeight: "500"
                            }}>
                            {deliveryStatus === "Delivered" ? "Delivered" : deliveryStatus}
                        </p>
                    </div>
                </div>
                <div className={style.orderPriceDetail}>
                    <p style={{ fontSize: "var(--font13)", color: "var(--textLight)" }}>
                        ₹ <span style={{ fontSize: "var(--font16)", color: "var(--black)" }}>{totalAmount}</span>
                    </p>
                </div>
            </div>
            <div className={style.timeShippingDetail}>
                <i class="fi fi-rr-calendar-clock"></i>
                <p>
                    14 Sep ,2023 at 8:27 PM | Shipping No: <span style={{ color: "var(--primary)" }}>{orderId.substring(orderId.length - 10)}</span>
                </p>
            </div>
            <div className={style.orderUpdateDetails}>
                <IconButton
                    onClick={() => setViewDeatils(!viewDetails)}
                    width={"fit-content"}
                    rightIcon={
                        <i
                            style={{ color: "var(--primary)" }}
                            class="fi fi-ss-angle-small-down"></i>
                    }
                    sx={{ color: "var(--primary)" }}
                    bgColor={"#f5f7f9"}
                    title={"View Details"}
                />

                {viewDetails && (
                    <div className={style.mainDropDown}>
                        <div className={style.innerdiv}>
                            <div className={style.innerBoxBorder}>
                                <p>
                                    <span>Customer name: </span> {userId.name}
                                </p>
                            </div>
                            <div className={style.innerBoxBorder}>
                                <p>
                                    <span>User Id: </span> {userId._id.substring(userId._id.length - 10)}
                                </p>
                            </div>
                        </div>

                        <div className={style.innerdiv}>
                            <div className={style.innerBoxBorder}>
                                <p>
                                    <span>Payment Method: </span> Cash On Delivery
                                </p>
                            </div>
                            <div className={style.innerBoxBorder}>
                                <p>
                                    <span>Total Amount: </span>₹ {totalAmount}
                                </p>
                            </div>
                        </div>
                        <div className={style.innerdiv}>
                            <div className={style.innerBoxBorder}>
                                <p>
                                    <span>Total Proucts Ordered: </span> {orderedProducts.length}
                                </p>
                            </div>
                            <div className={style.innerBoxBorder}>
                                <p>
                                    <span>Ordered On: </span> {formatDate(orderedOn && orderedOn)}
                                </p>
                            </div>
                        </div>

                        <div className={style.innerBoxBorder}>
                            <p>
                                <span>Address: </span> {`${address.street}, ${address.area}, ${address.landMark} Pune, Maharashtra`}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div className={style.orderProductInfo}>
                {orderedProducts &&
                    orderedProducts.map((item) => (
                        <VerticalOrderProduct
                            key={item._id}
                            image={item.product.featuredImages[0]}
                            quantity={item.quantity}
                            sku={item.product.productSKU}
                            productName={item.product.productName}
                            orderId={orderId}
                            productId={item._id}
                            orderStatus={item.deliveryStatus}
                        />
                    ))}
            </div>
        </div>
    );
};

export default OrderVerticalListing;

const formatDate = (dateObj) => {
    const timestamp = dateObj;
    const date = new Date(timestamp);

    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
};
