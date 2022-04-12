import { FC } from "react";
import styles from "./style.module.css";

export interface EndScreenProps {
    handle: () => void;
}

const EndScreen: FC<EndScreenProps> = ({ handle, children }) => {
    return (
        <div className={styles.wrapper}>
            {children}
            <div>Share results</div>
            <button onClick={handle}>Play again</button>
        </div>
    );
};

export default EndScreen;
