import { useState } from 'react'
import styles from '../../styles/inputs.module.css'

export const TextInput = ({ placeholder, setText, label, name }) => {
    return (
        <div>
            {label && <p>{label}</p>}
            <input data-cy="counter" className={styles.inputText} name={name} onChange={(e) => setText(e)} placeholder={placeholder} />
        </div>
    )
}

export const PasswordInput = ({ placeholder, label, setText, name }) => {
    const [isPassword, setIsPassword] = useState(true)
    return (
        <div className={styles.PasswordInput}>
            {label && <p>{label}</p>}
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