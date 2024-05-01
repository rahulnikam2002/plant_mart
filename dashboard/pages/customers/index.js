import CustomerVerticalListing from "@/components/Listing/Product/Customer/vertical";
import PageTitle from "@/components/pageTitle/title";
import styles from "@/styles/allcustomers.module.css";
import { errorToast } from "@/utils/helper/toasts/toasts.messages";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const AllCustomers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = useCallback(async () => {
        try {
            const allUsers = await axios.get("/api/user/get/all", { withCredentials: true });
            const res = allUsers.data;
            setUsers(res);
        } catch (error) {
            errorToast("Something went wrong!");
        }
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={styles.main}>
            <PageTitle title={"Customers"} />
            <div className={styles.customer_header}>
                <p>Name</p>
                <p>Email</p>
                <p>Phone number</p>
            </div>
            <div className={styles.allCutomerList}>
                {users &&
                    users.map((value) => {
                        return (
                            <CustomerVerticalListing
                                cutomerName={value.name}
                                customerEmail={value.email}
                                customerNumber={value.phoneNumber}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default AllCustomers;

const dummyCustomers = [
    {
        name: "John",
        email: "john321@gmail.com",
        phoneNumber: "8956688194",
        gender: "Male"
    },
    {
        name: "Samiksha",
        email: "samiksha234@gmail.com",
        phoneNumber: "8956688194",
        gender: "Female"
    },

    {
        name: "Neha",
        email: "neha21@gmail.com",
        phoneNumber: "9236688194",
        gender: "Female"
    }
];
