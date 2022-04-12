import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Letter from "../../components/letter";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LetterState } from "../../interfaces/game";

const How2Play: React.FC = () => {
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false);

    return (
        <div className={styles.instructions}>
            <h1 style={{ textAlign: "center" }}>HOW TO PLAY</h1>
            <FontAwesomeIcon
                style={{ float: "right", cursor: isHover ? "pointer" : "default" }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                icon="xmark"
                size="lg"
                onClick={() => navigate("/game")}
            />
            <section className={styles.section}>
                <p>Guess the WORDLE in six tries.</p>
                <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
                <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
            </section>
            <section className={styles.section}>
                <h3>Examples</h3>
                <div className={styles.exampleWord}>
                    <Letter letter="W" state={LetterState.correct} />
                    <Letter letter="E" />
                    <Letter letter="A" />
                    <Letter letter="R" />
                    <Letter letter="Y" />
                </div>
                <p>The letter W is in the word and in the correct spot.</p>

                <div className={styles.exampleWord}>
                    <Letter letter="P" />
                    <Letter letter="I" state={LetterState.close} />
                    <Letter letter="L" />
                    <Letter letter="L" />
                    <Letter letter="S" />
                </div>
                <p>The letter I is in the word but in the wrong spot.</p>
                <div className={styles.exampleWord}>
                    <Letter letter="V" />
                    <Letter letter="A" />
                    <Letter letter="G" />
                    <Letter letter="U" state={LetterState.incorrect} />
                    <Letter letter="E" />
                </div>
                <p>The letter U is not in the word in any spot.</p>
            </section>
            A new WORDLE will be available each day!
        </div>
    );
};

export default How2Play;
