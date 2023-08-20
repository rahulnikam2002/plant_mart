import Head from "next/head"
import styles from '@/styles/login.module.css'
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/buttons/buttons"
import { PasswordInput, TextInput } from "@/components/Inputs/Inputs"
import validator from 'validator';
import { errorToast, successToast } from "@/utils/helper/toasts/toasts.messages"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({})

    const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const handleSignIn = () => {
        if(validator.isEmail(inputs.userName) && validator.isStrongPassword(inputs.password)){
            successToast("Done")
        }
        else{
            errorToast("Invalid inputs")
        }
    }

    return (
        <>
            <Head>
                <title>Login to Plant Mart Dashboard</title>
            </Head>
            <main>
                <ToastContainer />
                <div className={styles.main}>
                    {/* <div className={[styles.innerMain, styles.banner].join(" ")}></div> */}
                    <div className={[styles.innerMain, styles.contactForm].join(" ")}>
                        <p className={styles.pageHeading}>Sign in to <span className={styles.primaryColor}> Plant Mart</span></p>
                        <p className={styles.subHeading}>Manage your products, orders and get their analysis</p>
                        <div className={styles.loginInputs}>
                            <div className={styles.input}>
                                <TextInput setText={handleChange} name="userName" placeholder="Email or phone number" label="Email or phone" />
                            </div>
                            <div className={styles.input} >
                                <PasswordInput setText={handleChange} name="password" placeholder={"password"} label="Password" />
                            </div>
                            <div className={styles.redirectLink}>
                                <Link className={styles.link} href={'/password/reset'}>Forget Password</Link>
                            </div>
                            <div className={styles.buttonPlace}>
                                <Button title={"Sign in"} clickFunction={handleSignIn} isLoading={loading} />
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}

export default LoginPage;