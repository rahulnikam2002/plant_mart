import styles from '@/styles/verticalCustomerListing.module.css'
const CustomerVerticalListing = (props) => {
    return (
        <div className={styles.singleCustomerList}>
            <div className={styles.name}>
                <p>{props.cutomerName}</p>
            </div>
            <div className={styles.email}>
                <p>{props.customerEmail}</p>
            </div>
            <div className={styles.phnNumber}>
                <p>{props.customerNumber}</p>
            </div>
            <div className={styles.gender}>
            <p className={props.customerGender ==  "Male"  ? styles.genmColor : styles.genfColor}>{props.customerGender}</p>
            </div>
        </div>
    )
}
export default CustomerVerticalListing;