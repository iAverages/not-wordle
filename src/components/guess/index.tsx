import Letter from "../letter";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { clamp } from "../../helpers";
import { LetterState } from "../../interfaces/game";

const Guess = ({
    guess: initialGuess,
    state: initalState,
    length,
}: {
    state?: LetterState[];
    guess: string;
    length: number;
}) => {
    const [guess, setGuess] = useState(initialGuess);
    const [state, setState] = useState(initalState);

    const addExtraChar = (str: string = "") => {
        if (!str) str = "     ";
        return str + " ".repeat(length - clamp(str?.length ?? 0, 0, 5));
    };

    useEffect(() => {
        setGuess(initialGuess);
        setState(initalState);
    }, [initialGuess, initalState]);

    return (
        <div className={styles.wrapper}>
            {addExtraChar(guess)
                .split("")
                .map((l, key) => (
                    <Letter key={key} letter={l} state={state && state[key]} />
                ))}
        </div>
    );
};

export default Guess;
