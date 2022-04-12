import { FC } from "react";
import { GuessMeta } from "../../interfaces/game";
import EndScreen, { EndScreenProps } from "./EndScreen";

interface LoseScreenProps extends EndScreenProps {
    word: string;
    guesses: GuessMeta[];
}

const LoseScreen: FC<LoseScreenProps> = ({ handle, word }) => {
    return <EndScreen handle={handle}>You did not guess the word in time, the word was {word}</EndScreen>;
};

export default LoseScreen;
