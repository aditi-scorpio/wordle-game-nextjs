"use client";

import Board from "./components/Board";
import { evaluateGuess, LetterStatus } from "../lib/game";
import Keyboard from "./components/Keyboard";
import { useEffect, useState, useRef } from "react";

import { answers } from "../data/answers";
import { validWords } from "../data/validWords";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;


type GuessResult = {
  word: string;
  status: LetterStatus[];
}



export default function Home() {

  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<GuessResult[]>([]);

  const [answer, setAnswer] = useState(() => {
    return answers[Math.floor(Math.random() * answers.length)];
  })

  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [message, setMessage] = useState("");

  const [shake, setShake] = useState(false);

  const [keyboardStatuses, setKeyboardStatuses] = useState<Record<string, LetterStatus>>({});
  const keyboardTimeoutRef = useRef<ReturnType<typeof setTimeout> | null> (null);

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
    
    if(!validWords.has(currentGuess)) {
      setShake(true);
      setMessage("Not a valid word");
      setTimeout(() => {
        setShake(false),
        setMessage("")
      }, 600);
      return;
    }


      const status = evaluateGuess(currentGuess, answer);
      const newGuess = { word: currentGuess, status };
      setGuesses((prev) => [...prev, newGuess]);
      setCurrentGuess("");
      keyboardTimeoutRef.current = setTimeout(() => {
        setKeyboardStatuses((prev) => {
          const updated = {...prev}

          currentGuess.split("").forEach((letter, index) => {
            const newStatus = status[index];
            const currentStatus = updated[letter];

            if(newStatus === 'correct' 
              || (newStatus === 'present' && currentStatus !== 'correct')
              || (!currentStatus && newStatus === 'absent')
            ) {
              updated[letter] = newStatus;
            }
          })
          return updated;
        })
      }, 1600)
      if(currentGuess === answer) {
        setTimeout(() => {
          setGameWon(true);
        }, 1800)
        return;
      }
      if(guesses.length + 1 === MAX_GUESSES) {
        setTimeout(()=> {
          setGameOver(true);
        }, 1800)
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
    if(keyboardTimeoutRef.current){
      clearTimeout(keyboardTimeoutRef.current);
    }
    setCurrentGuess("");
    setGuesses([]);
    setGameWon(false);
    setGameOver(false);
    setKeyboardStatuses({});
    setAnswer(answers[Math.floor(Math.random() * answers.length)]);
  }

  useEffect(() => {
    return () => {
      if(keyboardTimeoutRef.current) {
        clearTimeout(keyboardTimeoutRef.current);
      }
    }
  }, [])

  return (
    <main className="game">
      <h1>WORDLE</h1>
      {
        message && (
          <div className="game-message">
            {message}
          </div>
        )
      }
      <section className="board">
        <Board currentGuess={currentGuess} guesses={guesses} maxGuesses={MAX_GUESSES} shake={shake} />
      </section>
      <section className="keyboard">
        <Keyboard onKeyPress={handleKeyboardPress} letterStatuses={keyboardStatuses} />
      </section>
      {
        (gameWon || gameOver) && (
          <div className="modal-overlay">
            <div className="result-modal">
              <h2>
                { gameWon ? '🎉 You got it!!' : 'Game Over'}
              </h2>
              <p>
                {
                  gameWon ? `You guessed it in ${guesses.length} ${guesses.length === 1 ? 'try' : 'tries'}!` 
                  : `The word was ${answer}`
                }
              </p>
              <button onClick={restartGame}>
                Play Again
              </button>
            </div>
          </div>
        )
      }
    </main>
  )
}