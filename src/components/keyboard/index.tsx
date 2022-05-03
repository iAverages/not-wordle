import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { LetterState } from "../../interfaces/game";
import letterStyles from "../letter/style.module.css";
import styles from "./styles.module.css";

const layout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", ["Backspace", "delete-left"]],
];

const KeyboardLetter = ({
    letter,
    handle,
    state: initialState,
}: {
    letter: string | string[];
    handle: (obj: { key: string; repeat: boolean }) => void;
    state: LetterState;
}) => {
    const [state, setState] = useState(initialState);
    const [stateClass, setStateClass] = useState("");

    const handleClick = () => {
        handle({
            key: typeof letter === "string" ? letter : letter[0],
            repeat: false,
        });
    };

    useEffect(() => {
        setState(initialState);
    }, [initialState]);

    useEffect(() => {
        switch (state) {
            case LetterState.correct:
                setStateClass(letterStyles.correct);
                break;
            case LetterState.close:
                setStateClass(letterStyles.close);
                break;
            case LetterState.incorrect:
                setStateClass(letterStyles.incorrect);
                break;
            default:
                setStateClass("");
                break;
        }
    }, [state]);

    return (
        <div className={`${styles.letter} ${stateClass}`} onClick={handleClick}>
            {typeof letter === "string" ? letter : <FontAwesomeIcon icon={letter[1] as IconProp} />}
        </div>
    );
};

const Keyboard = ({ handle, usedLetters }: { handle: (...x: any) => any; usedLetters: Record<string, LetterState> }) => {
    return (
        <div className={styles.keyboard}>
            {layout.map((row, key) => {
                return (
                    <div style={{ display: "flex", alignItems: "center" }} key={key}>
                        {row.map((col, key2) => (
                            <KeyboardLetter
                                key={key2}
                                letter={col}
                                handle={handle}
                                state={(col as string) in usedLetters ? usedLetters[col as string] : LetterState.incorrect}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Keyboard;
