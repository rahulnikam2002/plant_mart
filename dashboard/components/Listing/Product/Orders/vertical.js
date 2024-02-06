import style from '@/styles/verticalOrdersListing.module.css'
import { useState } from 'react';
import VerticalOrderProduct from './verticalOrderProduct';
import { Button, IconButton, LinkButton } from '@/components/buttons/buttons';

const OrderVerticalListing = () => {

    const [isChecked, setChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setChecked(!isChecked);
        console.log(e.target.checked);
    };

    return (
        <div className={style.singleOrderList}>
            <div className={style.orderDetail}>
                <div className={style.orderNoDetail}>
                    <input
                        type="checkbox"
                        onChange={handleCheckboxChange}
                    />

                    <p style={{ fontWeight: "var(--w600)", fontSize: "var(--font18)" }}>Order <span style={{ color: "black", fontWeight: "var(--w700)" }}>#2745</span></p>
                    <p style={{ background: "var(--lowLightGreen)", color: "var(--green)" }}>Paid</p>
                </div>
                <div className={style.orderPriceDetail}>
                    <p style={{ fontSize: "var(--font13)", color: 'var(--textLight)' }}>₹ <span style={{ fontSize: "var(--font16)", color: 'var(--black)' }}>450</span></p>
                </div>

            </div>
            <div className={style.timeShippingDetail}>
                <i class="fi fi-rr-calendar-clock"></i>
                <p>14 Sep ,2023 at 8:27 PM | Shipping No: <span style={{ color: "var(--primary)" }}>65749387927</span></p>
            </div>
            <div className={style.orderUpdateDetails}>
                <div className={style.dropDown}>

                    <select className={style.options}>
                        <option value="" disabled selected hidden>Update status</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Undelivered">Undelivered</option>

                    </select>
                </div>
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
                    title={"View Details"} />
            </div>
            <div className={style.orderProductInfo}>
                <VerticalOrderProduct />
            </div>
        </div >
    )
}

export default OrderVerticalListing;