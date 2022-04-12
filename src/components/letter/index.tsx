import { useEffect, useState } from "react";
import { LetterState } from "../../interfaces/game";
import styles from "./style.module.css";

interface ILetter {
    letter: string;
    state?: LetterState;
}

export default ({ letter: initialLetter, state: initialState }: ILetter) => {
    const [letter, setLetter] = useState(initialLetter);
    const [state, setState] = useState(initialState);
    const [stateClass, setStateClass] = useState("");

    useEffect(() => {
        setLetter(initialLetter);
        setState(initialState);
    }, [initialLetter, initialState]);

    useEffect(() => {
        switch (state) {
            case LetterState.correct:
                setStateClass(styles.correct);
                break;
            case LetterState.close:
                setStateClass(styles.close);
                break;
            case LetterState.incorrect:
                setStateClass(styles.incorrect);
                break;
            default:
                setStateClass("");
                break;
        }
    }, [state]);

    return <div className={`${styles.box} ${letter !== " " ? stateClass : ""}`}>{letter}</div>;
};
