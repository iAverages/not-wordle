import { FC } from "react";
import EndScreen, { EndScreenProps } from "./EndScreen";

interface WinScreenProps extends EndScreenProps {
    handle: () => void;
}

const WinScreen: FC<WinScreenProps> = ({ handle }) => {
    return <EndScreen handle={handle}>Well done, you guessed the word correctly.</EndScreen>;
};

export default WinScreen;
