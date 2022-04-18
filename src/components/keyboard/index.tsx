import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const layout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", ["Backspace", "delete-left"]],
];
const KeyboardLetter = ({ letter, handle }: { letter: string | string[]; handle: any }) => {
    const handleClick = () => {
        handle({
            key: typeof letter === "string" ? letter : letter[0],
            repeat: false,
        });
    };

    return (
        <div
            style={{
                padding: "1rem",
                margin: ".2rem",
                fontFamily: "inherit",
                fontWeight: "bold",
                border: 0,
                borderRadius: "4px",
                cursor: "pointer",
                userSelect: "none",
                backgroundColor: "#818384",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textTransform: "uppercase",
            }}
            onClick={handleClick}
        >
            {typeof letter === "string" ? letter : <FontAwesomeIcon icon={letter[1] as IconProp} />}
        </div>
    );
};

const Keyboard = ({ handle }: { handle: any }) => {
    return (
        <div
            style={{
                marginTop: "3rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {layout.map((row, key) => {
                return (
                    <div style={{ display: "flex", alignItems: "center" }} key={key}>
                        {row.map((col, key2) => (
                            <KeyboardLetter key={key2} letter={col} handle={handle} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Keyboard;
