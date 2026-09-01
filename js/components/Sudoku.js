import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';

const h = React.createElement;

const generateEmptyBoard = () => Array(9).fill().map(() => Array(9).fill(0));

const isValid = (board, row, col, num) => {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
};

const solveBoard = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (const num of nums) {
          if (isValid(board, i, j, num)) {
            board[i][j] = num;
            if (solveBoard(board)) return true;
            board[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const createPuzzle = (difficulty) => {
  const board = generateEmptyBoard();
  solveBoard(board);
  const puzzle = board.map((row) => [...row]);
  let removeCount = 30;
  if (difficulty === 'easy') removeCount = 20;
  if (difficulty === 'hard') removeCount = 45;
  let attempts = removeCount;
  while (attempts > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    while (puzzle[row][col] === 0) {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    }
    puzzle[row][col] = 0;
    attempts--;
  }
  return { fullBoard: board, puzzleBoard: puzzle };
};

export default function Sudoku({ onQuit }) {
  const [board, setBoard] = useState(generateEmptyBoard());
  const [initialBoard, setInitialBoard] = useState(generateEmptyBoard());
  const [solution, setSolution] = useState(generateEmptyBoard());
  const [selectedCell, setSelectedCell] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (difficulty) {
      const { fullBoard, puzzleBoard } = createPuzzle(difficulty);
      setSolution(fullBoard);
      setBoard(puzzleBoard.map((row) => [...row]));
      setInitialBoard(puzzleBoard.map((row) => [...row]));
      setErrors([]);
      setSelectedCell(null);
      setIsWon(false);
      setSubmitMessage('');
    }
  }, [difficulty]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCell) return;
      if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(parseInt(e.key, 10));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleNumberInput(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, board]);

  const handleCellClick = (r, c) => {
    if (initialBoard[r][c] !== 0) return;
    setSelectedCell([r, c]);
  };

  const handleNumberInput = (num) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (initialBoard[r][c] !== 0) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = num;
    setBoard(newBoard);

    if (errors.length > 0) {
      setErrors(errors.filter((err) => !(err[0] === r && err[1] === c)));
    }
    setSubmitMessage('');
  };

  const handleRestart = () => {
    if (!difficulty) return;
    const { fullBoard, puzzleBoard } = createPuzzle(difficulty);
    setSolution(fullBoard);
    setBoard(puzzleBoard.map((row) => [...row]));
    setInitialBoard(puzzleBoard.map((row) => [...row]));
    setErrors([]);
    setSelectedCell(null);
    setIsWon(false);
    setSubmitMessage('');
  };

  const handleSubmit = () => {
    let newErrors = [];
    let isComplete = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          isComplete = false;
        } else if (board[r][c] !== solution[r][c]) {
          newErrors.push([r, c]);
        }
      }
    }
    setErrors(newErrors);

    if (newErrors.length === 0 && isComplete) {
      setIsWon(true);
    } else {
      setSubmitMessage(isComplete ? 'Incorrect solution. Try again!' : 'Puzzle is incomplete!');
    }
  };

  if (!difficulty) {
    return h(
      'div',
      { className: 'sudoku-container', style: { width: '100%' } },
      h(
        'div',
        { className: 'quiz-top', style: { width: '100%' } },
        h(
          'button',
          { className: 'nav-btn', onClick: onQuit },
          h(ArrowLeft, { size: 18 }),
          ' BACK'
        )
      ),
      h('div', { className: 'section-title' }, 'Select Difficulty'),
      h(
        'div',
        { className: 'difficulty-grid' },
        h(
          'div',
          { className: 'diff-card easy', onClick: () => setDifficulty('easy') },
          h('h3', null, 'Easy'),
          h('p', { className: 'time-limit' }, 'Good for warmups')
        ),
        h(
          'div',
          { className: 'diff-card medium', onClick: () => setDifficulty('medium') },
          h('h3', null, 'Medium'),
          h('p', { className: 'time-limit' }, 'Standard challenge')
        ),
        h(
          'div',
          { className: 'diff-card hard', onClick: () => setDifficulty('hard') },
          h('h3', null, 'Hard'),
          h('p', { className: 'time-limit' }, 'Expert mode')
        )
      )
    );
  }

  return h(
    'div',
    { className: 'sudoku-container', style: { width: '100%' } },
    h(
      'div',
      { className: 'quiz-top', style: { width: '100%' } },
      h(
        'button',
        { className: 'nav-btn', onClick: () => setDifficulty(null) },
        h(ArrowLeft, { size: 18 }),
        ' CHANGE'
      )
    ),
    isWon
      ? h(
          'div',
          { className: 'hero-banner', style: { marginTop: '20px' } },
          h(CheckCircle, {
            size: 64,
            color: 'var(--success)',
            style: { marginBottom: '20px' }
          }),
          h(
            'h2',
            { className: 'hero-title' },
            h('span', null, 'PUZZLE'),
            ' SOLVED!'
          ),
          h(
            'button',
            {
              className: 'btn',
              onClick: () => setDifficulty(null),
              style: { marginTop: '20px' }
            },
            'Play Again'
          )
        )
      : h(
          'div',
          {
            className: 'glass-panel',
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }
          },
          h(
            'div',
            { className: 'sudoku-board' },
            board.map((row, r) =>
              row.map((cell, c) => {
                const isFixed = initialBoard[r][c] !== 0;
                const isSelected =
                  selectedCell && selectedCell[0] === r && selectedCell[1] === c;
                const isError = errors.some((err) => err[0] === r && err[1] === c);
                const isHighlight =
                  selectedCell &&
                  !isSelected &&
                  (selectedCell[0] === r ||
                    selectedCell[1] === c ||
                    (Math.floor(r / 3) === Math.floor(selectedCell[0] / 3) &&
                      Math.floor(c / 3) === Math.floor(selectedCell[1] / 3)));
                return h(
                  'div',
                  {
                    key: `${r}-${c}`,
                    className: `sudoku-cell ${isFixed ? 'fixed' : ''} ${isSelected ? 'selected' : ''} ${isError ? 'error' : ''} ${isHighlight ? 'highlight' : ''} ${r === 2 || r === 5 ? 'sudoku-row-3' : ''}`,
                    onClick: () => handleCellClick(r, c)
                  },
                  cell !== 0 ? cell : ''
                );
              })
            )
          ),
          h(
            'div',
            { className: 'numpad' },
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) =>
              h(
                'button',
                {
                  key: n,
                  className: 'num-btn',
                  onClick: () => handleNumberInput(n)
                },
                n === 0 ? 'X' : String(n)
              )
            )
          ),
          h(
            'div',
            { className: 'action-buttons', style: { display: 'flex', gap: '15px', marginTop: '15px' } },
            h(
              'button',
              {
                className: 'btn btn-secondary',
                onClick: handleSubmit,
                style: { padding: '10px 20px', fontSize: '1rem', color: 'var(--accent)', borderColor: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }
              },
              h(CheckCircle, { size: 18 }),
              ' SUBMIT'
            ),
            h(
              'button',
              {
                className: 'btn btn-secondary',
                onClick: handleRestart,
                style: { padding: '10px 20px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }
              },
              h(RefreshCw, { size: 18 }),
              ' RESTART'
            )
          ),
          submitMessage && h('div', { className: 'submit-message', style: { color: 'var(--error)', marginTop: '15px', fontWeight: 'bold', fontSize: '1rem' } }, submitMessage)
        )
  );
}
