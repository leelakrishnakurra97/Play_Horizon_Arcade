import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw, Trophy } from 'lucide-react';

const h = React.createElement;

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

const generateEmptyGrid = () => Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));

const generateApple = (snake) => {
  let newApple;
  while (true) {
    newApple = [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)];
    if (!snake.some((segment) => segment[0] === newApple[0] && segment[1] === newApple[1])) {
      break;
    }
  }
  return newApple;
};

export default function Snake({ onQuit }) {
  const [snake, setSnake] = useState([[10, 10]]);
  const [apple, setApple] = useState([5, 5]);
  const [direction, setDirection] = useState([0, -1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const dirRef = useRef([0, -1]);

  function restartGame() {
    setSnake([[10, 10]]);
    setDirection([0, -1]);
    dirRef.current = [0, -1];
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setApple(generateApple([[10, 10]]));
  }

  useEffect(() => {
    if (gameOver && score > 0) {
      try {
        const raw = localStorage.getItem('quiz_leaderboard');
        const existing = raw ? JSON.parse(raw) : [];
        existing.push({
          name: 'Snake Pilot',
          score: score,
          difficulty: 'Neon Snake',
          date: new Date().toLocaleDateString()
        });
        localStorage.setItem('quiz_leaderboard', JSON.stringify(existing));
      } catch (e) {
        // ignore quota error
      }
    }
  }, [gameOver, score]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (!isPlaying) {
        if (e.key === ' ') {
          restartGame();
        }
        return;
      }

      const [dx, dy] = dirRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (dy !== 1) dirRef.current = [0, -1];
          break;
        case 'ArrowDown':
        case 's':
          if (dy !== -1) dirRef.current = [0, 1];
          break;
        case 'ArrowLeft':
        case 'a':
          if (dx !== 1) dirRef.current = [-1, 0];
          break;
        case 'ArrowRight':
        case 'd':
          if (dx !== -1) dirRef.current = [1, 0];
          break;
        default:
          break;
      }
      setDirection(dirRef.current);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const newHead = [prev[0][0] + dirRef.current[0], prev[0][1] + dirRef.current[1]];

        if (
          newHead[0] < 0 ||
          newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= GRID_SIZE
        ) {
          setGameOver(true);
          setIsPlaying(false);
          return prev;
        }

        if (prev.some((seg) => seg[0] === newHead[0] && seg[1] === newHead[1])) {
          setGameOver(true);
          setIsPlaying(false);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        if (newHead[0] === apple[0] && newHead[1] === apple[1]) {
          setScore((s) => s + 10);
          setApple(generateApple(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const currentSpeed = Math.max(50, INITIAL_SPEED - Math.floor(score / 50) * 10);
    const interval = setInterval(moveSnake, currentSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, apple, score]);

  return h(
    'div',
    { className: 'snake-container', style: { width: '100%' } },
    h(
      'div',
      { className: 'quiz-top', style: { width: '100%' } },
      h(
        'button',
        { className: 'nav-btn', onClick: onQuit },
        h(ArrowLeft, { size: 18 }),
        ' BACK MAIN'
      ),
      h(
        'div',
        { className: 'score-display' },
        h(Trophy, { size: 24, color: 'var(--success)' }),
        ` ${score}`
      )
    ),
    h(
      'div',
      {
        className: 'glass-panel',
        style: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }
      },
      !isPlaying &&
        !gameOver &&
        h(
          'div',
          {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.6)',
              borderRadius: '24px'
            }
          },
          h('button', { className: 'btn', onClick: restartGame }, 'START GAME (SPACE)')
        ),
      gameOver &&
        h(
          'div',
          {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.8)',
              borderRadius: '24px'
            }
          },
          h(
            'h2',
            {
              className: 'hero-title',
              style: { color: 'var(--danger)', fontSize: '3rem', marginBottom: '10px' }
            },
            'GAME OVER'
          ),
          h(
            'p',
            { style: { fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px' } },
            `Final Score: ${score}`
          ),
          h(
            'button',
            { className: 'btn', onClick: restartGame },
            'PLAY AGAIN ',
            h(RefreshCw, { size: 18, style: { marginLeft: '8px' } })
          )
        ),
      h(
        'div',
        {
          className: 'snake-board',
          style: {
            width: '500px',
            height: '500px',
            maxWidth: '100%',
            aspectRatio: '1',
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
          }
        },
        Array(GRID_SIZE)
          .fill()
          .map((_, y) =>
            Array(GRID_SIZE)
              .fill()
              .map((__, x) => {
                const isSnake = snake.some((seg) => seg[0] === x && seg[1] === y);
                const isHead = snake[0][0] === x && snake[0][1] === y;
                const isApple = apple[0] === x && apple[1] === y;
                let bg = 'transparent';
                if (isHead) bg = 'var(--success)';
                else if (isSnake) bg = 'rgba(0, 255, 102, 0.6)';
                else if (isApple) bg = 'var(--danger)';
                return h('div', {
                  key: `${x}-${y}`,
                  style: {
                    backgroundColor: bg,
                    width: '100%',
                    height: '100%',
                    borderRadius: isApple ? '50%' : isSnake ? '4px' : '0',
                    boxShadow: isApple
                      ? '0 0 10px var(--danger)'
                      : isHead
                        ? '0 0 15px var(--success)'
                        : 'none',
                    transform: isApple ? 'scale(0.8)' : 'none'
                  }
                });
              })
          )
      ),
      h(
        'p',
        { style: { marginTop: '20px', color: 'var(--text-muted)' } },
        'Use W, A, S, D or Arrow Keys to move'
      )
    )
  );
}
