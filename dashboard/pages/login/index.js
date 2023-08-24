import Head from "next/head"
import styles from '@/styles/login.module.css'
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/buttons/buttons"
import { PasswordInput, TextInput } from "@/components/Inputs/Inputs"
import validator from 'validator';
import { errorToast, successToast, warningToast } from "@/utils/helper/toasts/toasts.messages"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { useRouter } from "next/router"

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({ userName: "", password: "" })
    const router = useRouter();
    const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const handleSignIn = async () => {
        setLoading(true)
        if (
            (validator.isEmail(inputs?.userName)
                || (validator.isMobilePhone(inputs?.userName)
                    && inputs?.userName.length === 10))
            && validator.isStrongPassword(inputs?.password) && inputs.password !== null && inputs.userName !== null) {
            try {

                const loginUser = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/login`, inputs, { withCredentials: true })
                const status = await loginUser.status
                if (status === 200) {
                    successToast("Login success")
                    router.push("/")
                }
                setLoading(false)
            }
            catch (err) {
                setLoading(false)
                const { status } = err.response
                if (status === 401) {
                    errorToast("Credentials incorrect")
                }
                else if (status === 404) {
                    warningToast("Admin not found")
                }
                else {
                    errorToast("Check your credentials")
                }
            }
        }
        else {
            setLoading(false)
            errorToast("Invalid credentials")
        }
    }


    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleSignIn()
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('keydown', handleKeyPress);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Login to Plant Mart Dashboard</title>
            </Head>
            <main>
                <ToastContainer />
                <div className={styles.main}>
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
                    <div className={[styles.innerMain, styles.banner].join(" ")}></div>

                </div>
            </main>
        </>
    )
}


/**
 .pr-3{
    padding-right: 18px;
 }
 * 
 */

export default LoginPage;

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";
    if (myCookie.token === process.env.NEXT_PUBLIC_TOKEN) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          isLogin: true,
        },
      };
    }
  };