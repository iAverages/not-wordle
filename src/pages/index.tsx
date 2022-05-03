import { FC, useCallback, useEffect, useState } from "react";
import Guess from "../components/guess";
import RemainingGuesses from "../components/remainingGuesses";
import styles from "./game.module.css";
import WinScreen from "../components/endscreens/WinScreen";
import LoseScreen from "../components/endscreens/LoseScreen";
import { calcScore, randomWord } from "../helpers";
import Header from "../components/header";
import Keyboard from "../components/keyboard";
import { GameMeta, GuessMeta, LetterState } from "../interfaces/game";

const Game: FC<GameMeta> = ({ word: initialWord }) => {
    const maxGuesses = 6;
    const [hasWon, setHasWon] = useState(false);
    const [hasLose, setHasLose] = useState(false);
    const [word, setWord] = useState(initialWord);
    const [guessCount, setGuessCount] = useState(0);
    const [guesses, setGuesses] = useState<GuessMeta[]>([]);
    const [currentGuess, setCurrentGuess] = useState<string>("");

    const win = () => {
        setGuesses((prev) => {
            return [
                ...prev,
                { guess: currentGuess, letters: Array.from(Array(word.length)).map(() => LetterState.correct) },
            ];
        });
        setCurrentGuess("");
        setHasWon(true);
    };

    const nextGuess = () => {
        if (currentGuess.length != word.length) return;

        // Check if guess is same word
        if (currentGuess == word) {
            win();
            return;
        }

        // Calculate score from guess
        const score = calcScore(currentGuess, word);

        setGuessCount(guessCount + 1);
        setGuesses((prev) => {
            return [...prev, { guess: currentGuess, letters: score }];
        });
        setCurrentGuess("");
    };

    const handleKeyPress = (e: any) => {
        if (hasLose || hasWon) return;

        if (guessCount === maxGuesses) {
            setHasLose(true);

            return;
        }
        // Submit guess
        if (e.key === "Enter") {
            nextGuess();
            return;
        }

        // Remove character
        if (e.key === "Backspace") {
            setCurrentGuess((prev) => prev.slice(0, prev.length - 1));
            return;
        }

        // Ignore input if currentGuess >= word length
        if (currentGuess.length >= word.length) return;

        // Ignore repeat keys + ctrl, shift etc
        if (e.repeat || e.key.length > 1) return;

        // Ignore keys that are not a-z
        if (!/[A-Za-z]/.test(e.key)) return;

        setCurrentGuess((prev) => prev + e.key.toLowerCase());
    };

    const handlePlayAgain = (newWord?: string) => {
        setWord(newWord ? newWord : randomWord());
        setHasWon(false);
        setHasLose(false);
        setCurrentGuess("");
        setGuesses([]);
        setGuessCount(0);
    };

    const handleShare = () => {
        let text = `Notworld! (${guessCount}/${word.length})\n\n`;
        const squares = [];
        for (const next of guesses) {
            let square = next.letters.map((letter) => {
                if (letter === LetterState.correct) return "🟩";
                if (letter === LetterState.close) return "🟨";
                if (letter === LetterState.incorrect) return "⬛";
            });
            squares.push(square.join(""));
        }
        navigator.clipboard.writeText(text + squares.join());
    };

    const calcUsedLetters = useCallback(() => {
        const used: Record<string, LetterState> = {};
        for (const guess of guesses) {
            for (const [k, v] of Object.entries(guess.letters)) {
                const l = guess.guess.split("")[parseInt(k)];
                if (v === LetterState.incorrect) continue;
                if (used[k] && v === LetterState.correct) continue;
                used[l] = v;
            }
        }

        return used;
    }, [guesses]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [nextGuess, handleKeyPress]);

    useEffect(() => {
        setWord(randomWord());
    }, []);

    useEffect(() => {
        console.log("Word is", word);
    }, [word]);

    return (
        <>
            <Header />
            {hasLose && <LoseScreen handle={handlePlayAgain} word={word} guesses={guesses} share={handleShare} />}
            {hasWon && <WinScreen handle={handlePlayAgain} share={handleShare} />}
            {typeof word != "undefined" && (
                <div className={styles.guesses}>
                    {guesses.map(({ guess, letters }, key) => (
                        <Guess key={key} guess={guess} state={letters} length={word.length} />
                    ))}
                    {currentGuess && <Guess guess={currentGuess} length={word.length} />}

                    <RemainingGuesses
                        amount={Math.max(0, maxGuesses - guesses.length - (currentGuess ? 1 : 0))}
                        length={word.length}
                    />
                </div>
            )}
            <Keyboard handle={handleKeyPress} usedLetters={calcUsedLetters()} />
        </>
    );
};

export default Game;
