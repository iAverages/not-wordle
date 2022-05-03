import { FC } from "react";
import styles from "./style.module.css";

interface IButton {
    className?: string;
    [reset: string]: any;
}

const Button: FC<IButton> = ({ className, children, ...reset }) => {
    return (
        <button className={`${styles.btn} ${className ?? ""}`.trim()} {...reset}>
            {children}
        </button>
    );
};

export default Button;
