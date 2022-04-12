import { FC } from "react";
interface WinScreenProps {
    handle: () => void;
}

const WinScreen: FC<WinScreenProps> = ({ handle }) => {
    return (
        <div
            style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
            }}
        >
            <div>Share results</div>
            <button onClick={handle}>Play again</button>
        </div>
    );
};

export default WinScreen;
