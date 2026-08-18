# Wordle — Next.js

A modern implementation of the classic **Wordle word puzzle**, built with Next.js, React, and TypeScript.

The project focuses on client-side game state, keyboard interaction, word validation, reusable components, CSS animations, and responsive UI.

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

```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm

### Clone the Repository

```bash
git clone <repository-url>
cd wordle-game-nextjs
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open the application in your browser:

**http://localhost:3000**

The development server supports hot reloading, so changes made to the source code will automatically be reflected in the browser.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Run the Production Build

After creating the production build, start the application using:

```bash
npm start
```

The production application will be available at:

**http://localhost:3000**

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates an optimized production build |
| `npm start` | Starts the production server |
| `npm run lint` | Runs ESLint checks |

### Project Structure

```text
src/
├── app/
│   ├── components/
│   │   ├── Board.tsx
│   │   └── Keyboard.tsx
│   │
│   ├── globals.css
│   └── page.tsx
│
├── data/
│   ├── answers.ts
│   └── validWords.ts
│
└── lib/
    └── game.ts
```

### Development Workflow

After cloning the repository:

1. Install the project dependencies.
2. Start the development server.
3. Open the application at `http://localhost:3000`.
4. Make changes to the source code.
5. Verify the application and run lint checks.
6. Create a production build before deployment.

### Verify the Project

Run the following commands before committing changes:

```bash
npm run lint
npm run build
```

Both commands should complete successfully before pushing changes to the repository.