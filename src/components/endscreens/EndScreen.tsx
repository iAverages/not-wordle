import { FC, useState } from "react";
import words from "../../words";
import Button from "../button";
import styles from "./style.module.css";

export interface EndScreenProps {
    handle: (word?: string | any) => void;
    share: () => void;
}

const EndScreen: FC<EndScreenProps> = ({ handle, children, share }) => {
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
                <div className={styles.actions}>
                    <Button onClick={share}>Share results</Button>
                    <Button onClick={() => handle()}>Play again</Button>
                </div>
                <div className={styles.challenge}>
                    <p className={styles.error}>{err}</p>
                    <form onSubmit={challenge}>
                        <Button type="submit">Challenge a Friend</Button>
                        <input className={styles.newWord} value={newWord} onChange={(e) => setNewWord(e.target.value)} />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EndScreen;
