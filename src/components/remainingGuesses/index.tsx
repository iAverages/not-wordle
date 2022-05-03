import Guess from "../guess";

const RemainingGuesses = ({ amount = 0, length }: { amount: number; length: number }) => {
    return (
        <>
            {Array.from(Array(amount)).map((_, key) => (
                <Guess key={key} guess={"     "} length={length} />
            ))}
        </>
    );
};

export default RemainingGuesses;
