import styles from "@/styles/verticalCustomerListing.module.css";
import Link from "next/link";
const CustomerVerticalListing = (props) => {
    return (
        <div className={styles.singleCustomerList}>
            <div className={styles.name}>
                <p style={{ fontWeight: 600 }}>{props.cutomerName}</p>
            </div>
            <div className={styles.email}>
                <Link href={`mailto:${props.customerEmail}`}>
                    <p>{props.customerEmail}</p>
                </Link>
            </div>
            <div className={styles.phnNumber}>
                <p>{props.customerNumber}</p>
            </div>
        </div>
    );
};
export default CustomerVerticalListing;
