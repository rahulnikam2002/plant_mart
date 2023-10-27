import CustomerVerticalListing from '@/components/Listing/Product/Customer/vertical';
import PageTitle from '@/components/pageTitle/title';
import styles from '@/styles/allcustomers.module.css'

const AllCustomers = () => {
    return (
        <div className={styles.main}>
        <PageTitle title={"Customers"}/>
            <div className={styles.customer_header}>
                <p>Name</p>
                <p>Email</p>
                <p>Phone number</p>
                <p>Gender</p>
            </div>
            <div className={styles.allCutomerList}>
            {dummyCustomers.map((value) => {
          return (
            <CustomerVerticalListing
                cutomerName={value.name}
                customerEmail={value.email}
                customerNumber={value.phoneNumber}
                customerGender={value.gender}
            />)})}
            </div>
           
            
        </div>
    )
}


export default AllCustomers;



const dummyCustomers = [{
    name: "John",
    email:"john321@gmail.com",
    phoneNumber:"8956688194",
    gender:"Male"
  
  },
  {
    name: "Samiksha",
    email:"samiksha234@gmail.com",
    phoneNumber:"8956688194",
    gender:"Female"
  },
  
  {
    name: "Neha",
    email:"neha21@gmail.com",
    phoneNumber:"9236688194",
    gender:"Female"
  }
  ] 

