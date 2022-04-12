import { LetterState } from "./interfaces/game";
import words from "./words";

export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const calcScore = (guess: string, word: string) => {
    const state = Array.from(Array(word.length)).map(() => -1);
    const charsTaken = Array.from(Array(word.length)).map(() => false);

    // Check if all letters in correct position
    for (let i = 0; i < guess.length; i++) {
        if (word.charAt(i) === guess.charAt(i)) {
            state[i] = LetterState.correct;
            charsTaken[i] = true;
        }
    }

    // Find all other chars in incorrect position
    for (let i = 0; i < guess.length; i++) {
        let letter = guess.charAt(i);
        // Ignore chars alr found
        if (state[i] == LetterState.correct) {
            continue;
        }

        // Find char if in word that hasnt been found yet
        let indexOfPresentChar = 0;
        for (let index = 0; index < word.length; index++) {
            if (word.charAt(index) == letter && !charsTaken[index]) {
                indexOfPresentChar = index;
                break;
            }
        }

        // If yes set yellow, else set grey
        if (indexOfPresentChar > 0) {
            state[i] = LetterState.close;
            charsTaken[indexOfPresentChar] = true;
        } else {
            state[i] = LetterState.incorrect;
        }
    }

    return state;
};

export const randomWord = (prev: string = ""): string => {
    const min = Math.ceil(0);
    const max = Math.floor(words.length);
    const wordIdx = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    const word = words[wordIdx];
    if (word == prev) return randomWord(prev);
    return word;
};
