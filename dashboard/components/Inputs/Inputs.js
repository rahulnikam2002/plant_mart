import { useState } from 'react'
import styles from '../../styles/inputs.module.css'

export const TextInput = ({ placeholder, setText, label, name }) => {
    return (
        <div>
            {label && <p className={styles.label}>{label}</p>}
            <input className={styles.inputText} name={name} onChange={(e) => setText(e)} placeholder={placeholder} />
        </div>
    )
}


export const TextArea = ({ placeholder, setText, label, name }) => {
    return (
        <div>
            {label && <p className={styles.label}>{label}</p>}
            <textarea className={styles.inputText} name={name} onChange={(e) => setText(e)} placeholder={placeholder} />
        </div>
    )
}

export const PasswordInput = ({ placeholder, label, setText, name }) => {
    const [isPassword, setIsPassword] = useState(true)
    return (
        <div className={styles.PasswordInput}>
            {label && <p className={styles.label}>{label}</p>}
            <div className={styles.innerInputClass}>
                <input
                    onChange={(e) => setText(e)}
                    name={name}
                    type={isPassword ? "password" : "text"}
                    className={styles.inputPass}
                    placeholder={placeholder} />
                <span>
                    {!isPassword ? <i
                        onClick={() => setIsPassword(true)}
                        className="fi fi-rr-eye
                    "></i> : <i
                        onClick={() => setIsPassword(false)}
                        className="fi fi-rs-crossed-eye"
                    ></i>}
                </span>
            </div>
        </div>
    )
}
export const IconInput = ({ placeholder, label, onChange, rightIcon, leftIcon, background, noBorder , color}) => <div className={styles.iconInput}>
    {label && <p className={styles.label}>{label}</p>}
    <input
        style={{
            border: noBorder ? "none" : "2px solid rgb(209 213 219)",
            background: background ? background : "white",
            color: color ? color : "#333333"
        }}
        type="text"
        className={[styles.inputText, styles.iconInputField].join(" ")}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)} />
    {
        rightIcon && <span
            className={styles.rightIconInput}>
            {rightIcon}
        </span>
    }
    {
        leftIcon && <span
            className={styles.leftIconInput}>
            {leftIcon}
        </span>
    }
</div>