import style from "@/styles/verticalOrderProduct.module.css";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const VerticalOrderProduct = ({ image, quantity, sku, productName, orderId, productId, orderStatus }) => {
    const [selectedOption, setSelectedOption] = useState(orderStatus);

    const handleSelectChange = async (event) => {
        const newSelectedOption = event.target.value;
        setSelectedOption(newSelectedOption);
        await handleUpdateStatus(newSelectedOption);
    };

    const handleUpdateStatus = async (newSelectedOption) => {
        try {
            console.log({ newSelectedOption });
            console.log("sending req");
            const updateStatus = await axios.put(
                `/api/orders/update/status`,
                { orderId, productId, updateStatusTo: newSelectedOption },
                { withCredentials: true }
            );
            const res = updateStatus.data;
            console.log({ res });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className={style.productName}>
            <div className={style.img}>
                <Image
                    src={image}
                    width={75}
                    height={75}
                />
            </div>
            <div className={style.productDetails}>
                <p style={{ fontWeight: "var(--w700)", cursor: "pointer" }}>{productName}</p>
                <p style={{ fontSize: "var(--font14)" }}>
                    SKU: <span style={{ color: "var(--primary" }}>{sku}</span>
                </p>
                <p style={{ fontSize: "var(--font14)" }}>
                    Qauntity: <span>{quantity}</span>
                </p>
                <div className={style.dropDown}>
                    <select
                        className={style.options}
                        value={selectedOption}
                        onChange={handleSelectChange}>
                        <option
                            value=""
                            disabled
                            hidden>
                            Update status
                        </option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        {/* {orderStatus !== "Delivered" && <option value="Cancelled">Cancelled</option>} */}
                        <option
                            disabled={selectedOption === "Delivered"}
                            value="Cancelled">
                            Cancelled
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default VerticalOrderProduct;
