import React from "react";
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
    shake: boolean;
}

export default function Board({ currentGuess, guesses, maxGuesses, shake}: BoardProps) {
    return (
        <div className={`board ${shake ? 'shake' : '' }`}>
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
                                <div className={`tile
                                ${ guess ? `submitted` : ''}
                                `} key={colIndex}
                                style={guess ? {animationDelay: `${colIndex * 150}ms`,} : undefined}
                                >
                                   <div className="tile-face"
                                   style={status ? ({"--tile-color" : 
                                    status === 'correct' ? '#6aaa64' :
                                    status === 'present' ? '#c9b458' : '#787c7e'
                                   } as React.CSSProperties
                                ) : undefined }
                                   >{letter}</div>
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