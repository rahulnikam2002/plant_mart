import OrderVerticalListing from '@/components/Listing/Product/Orders/vertical';
import { IconButton } from '@/components/buttons/buttons';
import styles from '@/styles/allOrders.module.css'


const AllOrders = () => {
    return (
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
                <p>All  <span style={{ background: "var(--lowLightBlue)", color: "var(--primary)" }}>143</span></p>
                <p>Pending <span style={{ background: "var(--lowLightRed)", color: "var(--red)" }}>50</span></p>
                <p>Delivered <span style={{ background: "var(--lowLightGreen)", color: "var(--green)" }}>100</span></p>
            </div>

            <OrderVerticalListing />
            <OrderVerticalListing />
            <OrderVerticalListing />
            <OrderVerticalListing />
            <OrderVerticalListing />

        </div>
    )
}

export default AllOrders;