"use client";

import Board from "./components/Board";
import { evaluateGuess, LetterStatus } from "../lib/game";
import Keyboard from "./components/Keyboard";
import { useEffect, useState } from "react";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

const ANSWER = "APPLE";

type GuessResult = {
  word: string;
  status: LetterStatus[];
}



export default function Home() {

  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<GuessResult[]>([]);

  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const letterStatuses = guesses.reduce((statuses, guess) => {
    guess.word.split("").forEach((letter, index) => {
      const newStatus = guess.status[index];
      const currentStatus = statuses[letter];
      if(newStatus === "correct" 
        || (newStatus === "present" && currentStatus !== "correct")
        || (!currentStatus && newStatus === "absent")) 
      {
        statuses[letter] = newStatus;
      }
    })
    return statuses;
  },
  {} as Record<string, LetterStatus>
)

  useEffect(() => {
    
    function handleKeyDown(event: KeyboardEvent) {
      handleKeyboardPress(event.key);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess, guesses])

  function handleKeyboardPress(key: string) {
    key = key.toUpperCase();
    if(gameWon || gameOver) {
      return;
    }
    if(key === "ENTER") {
      if(currentGuess.length !== WORD_LENGTH) {
        return;
      }
      if(guesses.length >= MAX_GUESSES) {
        return;
      }

      const status = evaluateGuess(currentGuess, ANSWER);
      const newGuess = { word: currentGuess, status };
      setGuesses((prev) => [...prev, newGuess]);
      setCurrentGuess("");
      if(currentGuess === ANSWER) {
        setGameWon(true);
        return;
      }
      if(guesses.length + 1 === MAX_GUESSES) {
        setGameOver(true);
      }
      return;
    }

    if(key === "BACKSPACE") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if(/^[A-Z]$/.test(key)) {
      setCurrentGuess((prev) => {
        if(prev.length >= WORD_LENGTH) {
          return prev;
        }
        return prev + key;
      })
    }
  }

  function restartGame() {
    setCurrentGuess("");
    setGuesses([]);
    setGameWon(false);
    setGameOver(false);
  }

  return (
    <main className="game">
      <h1>WORDLE</h1>
      <section className="board">
        <Board currentGuess={currentGuess} guesses={guesses} maxGuesses={MAX_GUESSES} />
      </section>
      <section className="keyboard">
        <Keyboard onKeyPress={handleKeyboardPress} letterStatuses={letterStatuses} />
      </section>
      {
        (gameWon || gameOver) && (
          <div className="game-message">
            {
              gameWon ? (
                <h2>Congratulations! You guessed the word!</h2>
              ) : (
                <h2>Game Over! The correct word was {ANSWER}.</h2>
              )
            }
            <button onClick={restartGame}>Play Again</button>
          </div>
        )
      }
    </main>
  )
}