import { useState } from "react";
import styles from "../../styles/inputs.module.css";

export const TextInput = ({ placeholder, value, setText, label, name, type = "text" }) => {
    return (
        <div>
            {label && <p className={styles.label}>{label}</p>}
            <input
                type={type}
                value={value}
                className={styles.inputText}
                name={name}
                onChange={(e) => setText(e)}
                placeholder={placeholder}
            />
        </div>
    );
};

export const TextArea = ({ placeholder, setText, label, name, value, type = "text" }) => {
    return (
        <div>
            {label && <p className={styles.label}>{label}</p>}
            <textarea
                type={type}
                value={value}
                style={{ resize: "vertical" }}
                className={styles.inputText}
                name={name}
                onChange={(e) => setText(e)}
                placeholder={placeholder}
            />
        </div>
    );
};

export const PasswordInput = ({ placeholder, label, setText, name }) => {
    const [isPassword, setIsPassword] = useState(true);
    return (
        <div className={styles.PasswordInput}>
            {label && <p className={styles.label}>{label}</p>}
            <div className={styles.innerInputClass}>
                <input
                    onChange={(e) => setText(e)}
                    name={name}
                    type={isPassword ? "password" : "text"}
                    className={styles.inputPass}
                    placeholder={placeholder}
                />
                <span>
                    {!isPassword ? (
                        <i
                            onClick={() => setIsPassword(true)}
                            className="fi fi-rr-eye
                    "></i>
                    ) : (
                        <i
                            onClick={() => setIsPassword(false)}
                            className="fi fi-rs-crossed-eye"></i>
                    )}
                </span>
            </div>
        </div>
    );
};
export const IconInput = ({
    placeholder,
    value,
    label,
    onChange,
    rightIcon,
    leftIcon,
    background,
    noBorder,
    color,
    rightIconCSS,
    leftIconCSS,
    name
}) => (
    <div className={styles.iconInput}>
        {label && <p className={styles.label}>{label}</p>}
        <input
            value={value}
            name={name}
            style={{
                border: noBorder ? "none" : "2px solid var(--borderGrey)",
                background: background ? background : "white",
                color: color ? color : "#333333",
                paddingLeft: leftIcon ? "30px" : "10px"
            }}
            type="text"
            className={[styles.inputText, styles.iconInputField].join(" ")}
            placeholder={placeholder}
            onChange={(e) => onChange && onChange(e)}
        />
        {rightIcon && (
            <span
                style={{ ...rightIconCSS }}
                className={styles.rightIconInput}>
                {rightIcon}
            </span>
        )}
        {leftIcon && (
            <span
                style={{ ...leftIconCSS }}
                className={styles.leftIconInput}>
                {leftIcon}
            </span>
        )}
    </div>
);
