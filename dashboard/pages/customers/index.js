import PageTitle from '@/components/pageTitle/title';
import styles from '@/styles/allcustomers.module.css'

const AllCustomers = () => {
    return (
        <div className={styles.main}>
        <PageTitle title={"Customers"}/>
            {/* <div className={styles.cutomer_header}>
                <p>Name</p>
                <p>Email</p>
                <p>Phone number</p>
                <p>Gender</p>
            </div>
            <div className={styles.allCustomerlist}>
                <div className={styles.name}>
                    <img src="" alt="" />
                    <p>John Doe</p>
                </div>
                <div className={styles.email}>
                    <p>johndoe211@gmail.com</p>
                </div>
                <div className={styles.phnNumber}>
                    <p>6968938555</p>
                </div>
                <div className={styles.gender}>
                    <p>Male</p>
                </div>
            </div> */}
        </div>
    )
}
export default AllCustomers;