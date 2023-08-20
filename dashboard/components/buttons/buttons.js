const { default: Link } = require("next/link");
import styles from '@/styles/buttons.module.css'
import ClipLoader from 'react-spinners/ClipLoader'
import FadeLoader from 'react-spinners/FadeLoader'

export const LinkButton = ({ href, title }) => <Link className={styles.linkButton} href={href}>{title}</Link>

export const Button = ({ clickFunction, title, isLoading }) =>
    <button className={[styles.button, isLoading ? styles.active : null].join(" ")} onClick={() => clickFunction()}>
        {isLoading ? <ClipLoader size={22} color='rgb(193, 199, 198)'/> : "Sign in"}
    </button>