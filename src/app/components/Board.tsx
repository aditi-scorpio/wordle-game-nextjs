import { LetterStatus } from "../../lib/game";

type GuessResult = {
    word: string;
    status: LetterStatus[];
}
const WORD_LENGTH = 5;

type BoardProps = {
    currentGuess: string;
    guesses: GuessResult[];
    maxGuesses: number;
}

export default function Board({ currentGuess, guesses, maxGuesses }: BoardProps) {
    return (
        <div className="board">
            {Array.from({ length: maxGuesses}).map((_, rowIndex) => {
                const guess = guesses[rowIndex];
                const isCurrentGuessRow = rowIndex === guesses.length;
                const rowValue = isCurrentGuessRow ? currentGuess : guess?.word || "";
                return (
                    <div className="row" key={rowIndex}>
                        {
                            Array.from({length: WORD_LENGTH}).map((_, colIndex) => {
                                const letter = rowValue[colIndex] || "";
                                const status = guess?.status[colIndex];
                                return (
                                <div className={`tile ${status || ''}
                                ${ guess ? `submitted row-${rowIndex}` : ''}
                                `} key={colIndex}>
                                    {letter}
                                </div>
                                )
                            }
                            )
                        }
                    </div>
                )
            })
            }
        </div>
    )
}