# Wordle — Next.js

A modern implementation of the classic **Wordle word puzzle**, built with Next.js, React, and TypeScript.

The project focuses on client-side game state, keyboard interaction, word validation, reusable components, CSS animations, and responsive UI.

> **Status:** Complete

---

## About the Game

Wordle is a word puzzle where the player has six attempts to guess a hidden five-letter word.

After each guess, letters are highlighted based on their relationship to the answer:

- 🟩 **Correct** — the letter is in the correct position
- 🟨 **Present** — the letter exists in the word but is in a different position
- ⬜ **Absent** — the letter does not exist in the word

The player wins by finding the word within six attempts.

---

## Features

### Core Gameplay

- [x] Five-letter word guessing
- [x] Six attempts per game
- [x] Random answer selection
- [x] Extensive answer word list
- [x] Extensive valid-guess word list
- [x] Correct / present / absent letter evaluation
- [x] Duplicate-letter handling
- [x] Invalid-word validation
- [x] Win detection
- [x] Game-over detection
- [x] Play Again with a new answer

### Input

- [x] Physical keyboard support
- [x] On-screen keyboard
- [x] Backspace support
- [x] Enter support
- [x] Mixed physical and on-screen keyboard input
- [x] Keyboard state reflects discovered letters

### User Experience

- [x] Letter pop animation
- [x] Sequential tile flip animation
- [x] Delayed color reveal during flip
- [x] Invalid-word shake animation
- [x] Win / Lose result modal
- [x] Responsive layout
- [x] Mobile-friendly keyboard

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Application framework |
| React | UI and component architecture |
| TypeScript | Type safety |
| Next.js App Router | Application structure |
| CSS | Styling and animations |
| ESLint | Code quality |

---

## Architecture

The application separates the UI components, game logic, and word data.

```text
                    Next.js Application
                           │
                           ▼
                      App Router
                           │
                           ▼
                        Game Page
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Board        Keyboard       Result
             │             │            Modal
             │             │
             ▼             ▼
          Tiles        User Input
             │
             ▼
                      Game Logic
                           │
                           ▼
                    Word Evaluation