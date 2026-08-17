import { LetterStatus } from '../../lib/game';

type KeyboardProps = {
    onKeyPress: (key: string) => void;
    letterStatuses: Record<string, LetterStatus>;
}

const ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
];

export default function Keyboard({ onKeyPress, letterStatuses }: KeyboardProps) {
    return (
        <div className="keyboard">
            {
                ROWS.map((row, rowIndex) => (
                    <div className="keyboard-row" key={rowIndex}>
                        {
                            row.map((key) => {
                                const status = letterStatuses[key];
                                return (
                                    <button key={key} className={`key ${status || ''}
                                     ${key === 'ENTER' || key === 'BACKSPACE' ? 'wide' : ''}
                                    `}
                                     onClick={(event) => {
                                        event.currentTarget.blur();
                                        onKeyPress(key);
                                     }}>
                                        {key === 'Backspace' ? '⌫' : key}
                                    </button>
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    )
}