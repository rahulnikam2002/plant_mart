const { default: Link } = require("next/link");
import styles from '@/styles/buttons.module.css'
import ClipLoader from 'react-spinners/ClipLoader'
import FadeLoader from 'react-spinners/FadeLoader'

export const LinkButton = ({ href, title }) => <Link className={styles.linkButton} href={href}>{title}</Link>

export const Button = ({ clickFunction, title, isLoading }) =>
    <button className={[styles.button, isLoading ? styles.active : null].join(" ")} onClick={() => clickFunction()}>
        {isLoading ? <ClipLoader size={22} color='rgb(193, 199, 198)' /> : "Sign in"}
    </button>

export const IconButton = ({ title, leftIcon, rightIcon, onClick, isLoading, width,bgColor,padding,border,shadow}) =>
    <button
        style={{ width: width ? width : "100%" ,background:bgColor?bgColor:"var(--primary)",padding : padding ? padding : "8px" , border : border ? border: "none" ,shadow : shadow ? shadow :"none"}}
        className={[styles.button, styles.leftIconButton, isLoading ? styles.active : null].join(" ")}
        onClick={onClick}>
        {isLoading ? <ClipLoader size={22} color='rgb(193, 199, 198)' /> : <span>{leftIcon && <span>{leftIcon}</span>}
            {title}{rightIcon && <span style={{marginLeft: "5px"}}>{rightIcon}</span>}</span>}
    </button>