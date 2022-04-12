import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./style.module.css";

interface ErrorProps {
    error?: string;
}

const Error: React.FC<ErrorProps> = ({ error = "An error has occured" }) => {
    return (
        <div className={styles.error}>
            <div className={styles.messageWrapper}>
                <p className={styles.message}>
                    <FontAwesomeIcon className={styles.icon} icon={["fas", "exclamation-circle"]} />
                    {error}
                </p>
            </div>
            <div className={styles.imgWrapper}>
                <img className={styles.yin} src={"/images/yin_cry.png"} alt={"Sad Yin"} />
            </div>
        </div>
    );
};

export default Error;
