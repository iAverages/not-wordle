import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Header = () => {
    return (
        <div className={styles.header}>
            <p className={styles.text}>Wordle</p>
            <Link to={"/how2play"} className={styles.help}>
                <FontAwesomeIcon icon="circle-question" size="lg" />
            </Link>
        </div>
    );
};

export default Header;
