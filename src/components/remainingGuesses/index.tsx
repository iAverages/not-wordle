import Guess from "../guess";

const RemainingGuesses = ({ amount = 0 }: { amount: number }) => {
    return (
        <>
            {Array.from(Array(amount)).map((_, key) => (
                <Guess key={key} guess={"     "} />
            ))}
        </>
    );
};

export default RemainingGuesses;
