export interface GuessMeta {
    guess: string;
    letters: LetterState[];
}

export interface GameMeta {
    word: string;
}

export enum LetterState {
    correct,
    close,
    incorrect,
}
