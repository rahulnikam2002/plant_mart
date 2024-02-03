const { default: Link } = require("next/link");
import styles from "@/styles/buttons.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import FadeLoader from "react-spinners/FadeLoader";

export const LinkButton = ({ href, title, bg, color, padding, width, sx }) => (
    <Link
        style={{
            ...sx,
            background: bg ? bg : "#f2f5fa",
            color: color ? color : "var(--primary)",
            padding: padding ? padding : "8px",
            width: width ? width : "100%"
        }}
        className={styles.linkButton}
        href={href}>
        {title}
    </Link>
);

export const Button = ({ onClick, title, isLoading, bg, color, padding, width, sx }) => (
    <button
        style={{
            ...sx,
            border: "none",
            cursor: "pointer",
            background: bg ? bg : "#f2f5fa",
            color: color ? color : "var(--primary)",
            padding: padding ? padding : "8px",
            width: width ? width : "100%"
        }}
        className={[styles.button, isLoading ? styles.active : null].join(" ")}
        onClick={() => onClick()}>
        {isLoading ? (
            <ClipLoader
                size={22}
                color="rgb(193, 199, 198)"
            />
        ) : (
            title
        )}
    </button>
);

export const IconButton = ({ title, leftIcon, rightIcon, clickFunction, onClick, isLoading, width, bgColor, padding, border, shadow, sx }) => (
    <button
        onClick={() => onClick()}
        style={{
            ...sx,
            width: width ? width : "100%",
            background: bgColor ? bgColor : "var(--primary)",
            padding: padding ? padding : "8px",
            border: border ? border : "none",
            shadow: shadow ? shadow : "none"
        }}
        className={[styles.button, styles.leftIconButton, isLoading ? styles.active : null].join(" ")}>
        {isLoading ? (
            <ClipLoader
                size={22}
                color="rgb(193, 199, 198)"
            />
        ) : (
            <span>
                {leftIcon && <span>{leftIcon}</span>}
                {title}
                {rightIcon && <span style={{ marginLeft: "5px" }}>{rightIcon}</span>}
            </span>
        )}
    </button>
);
