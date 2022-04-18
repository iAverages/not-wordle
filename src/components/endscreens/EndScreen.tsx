import { FC, useState } from "react";
import words from "../../words";
import styles from "./style.module.css";

export interface EndScreenProps {
    handle: (word?: string | any) => void;
}

const EndScreen: FC<EndScreenProps> = ({ handle, children }) => {
    const [newWord, setNewWord] = useState("");
    const [err, setErr] = useState("");

    const challenge = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!words.includes(newWord)) {
            setErr("Not in wordlist");
            return;
        }
        handle(newWord);
    };

    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={styles.wrapper}>
                {children}
                <div>Share results</div>
                <button onClick={handle}>Play again</button>
                <div className={styles.challenge}>
                    <p>{err}</p>
                    <form onSubmit={challenge}>
                        <button type="submit">Challenge a Friend</button>
                        <input value={newWord} onChange={(e) => setNewWord(e.target.value)} />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EndScreen;
