import React from 'react';
import { Gamepad2 } from 'lucide-react';

const h = React.createElement;

const heroImg =
  'https://png.pngtree.com/thumb_back/fw800/background/20231219/pngtree-game-c4d-entertainment-game-background-image_15523486.png';
const sudokuImg =
  'https://media.madebyteachers.com/wp-content/uploads/2023/03/29183747/100-sudoku-easy-tpt.png';
const snakeImg = 'https://www.coolmathgames.com/sites/default/files/Snake_OG-logo.jpg';
const quizImg =
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSmKZvI3_KZyk84QGsFN3ScQkr168BBT-4Oivjp8eu9aU_od46MiBJmOywv0xkRtVj_QPUPXv2LYiDpNBo5uSXkgjaBX4Ymh9K83AS8n4GESVeU8X3hBfwOOOjtmvsg9dzR2G1KFix0Qa46InkAL_wqwc_SC6ksl0OR25eAU3QfmFnWzs24FywHcJC7A/w1600/quiz.webp';

export default function Home({ onSelectGame }) {
  return h(
    'section',
    { className: 'home', style: { width: '100%' } },
    h(
      'div',
      { className: 'hero-banner' },
      h(
        'div',
        { style: { zIndex: 2 } },
        h(
          'h2',
          { className: 'hero-title', style: { fontSize: '3rem', letterSpacing: '-1px' } },
          'PLAY ',
          h('span', null, 'HORIZON')
        ),
        h(
          'p',
          { className: 'hero-subtitle', style: { maxWidth: '26rem' } },
          'Your arcade in one place—pick a game below and start playing in seconds.'
        )
      ),
      h('img', {
        src: heroImg,
        alt: 'Gaming scene',
        referrerPolicy: 'no-referrer',
        style: {
          width: 'min(100%, 320px)',
          maxHeight: '220px',
          objectFit: 'contain',
          zIndex: 2,
          borderRadius: '16px',
          filter: 'drop-shadow(0 16px 32px rgba(0, 0, 0, 0.45))'
        }
      })
    ),
    h(
      'h3',
      { className: 'section-title' },
      h(Gamepad2, { size: 24, color: 'var(--primary)' }),
      ' Available Games'
    ),
    h(
      'div',
      { className: 'game-grid' },
      h(
        'article',
        {
          className: 'game-card sudoku',
          onClick: () => onSelectGame('sudoku')
        },
        h(
          'div',
          { className: 'game-icon' },
          h('img', {
            src: sudokuImg,
            alt: 'Sudoku',
            referrerPolicy: 'no-referrer',
            style: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }
          })
        ),
        h('h3', null, 'Sudoku'),
        h('p', null, 'The ultimate test of logic and deduction. Challenge your mind.')
      ),
      h(
        'article',
        {
          className: 'game-card snake',
          onClick: () => onSelectGame('snake')
        },
        h(
          'div',
          {
            className: 'game-icon',
            style: { background: 'transparent', border: 'none', boxShadow: 'none' }
          },
          h('img', {
            src: snakeImg,
            alt: 'Neon Snake',
            referrerPolicy: 'no-referrer',
            style: { width: '100%', height: '100%', objectFit: 'contain' }
          })
        ),
        h('h3', null, 'Neon Snake'),
        h('p', null, 'A modern twist on the Nokia classic. Fast reflexes required.')
      ),
      h(
        'article',
        {
          className: 'game-card quiz',
          onClick: () => onSelectGame('quiz-lobby')
        },
        h(
          'div',
          {
            className: 'game-icon',
            style: { background: 'transparent', border: 'none', boxShadow: 'none' }
          },
          h('img', {
            src: quizImg,
            alt: 'QuizMaster',
            referrerPolicy: 'no-referrer',
            style: { width: '100%', height: '100%', objectFit: 'contain' }
          })
        ),
        h('h3', null, 'QuizMaster'),
        h('p', null, 'Answer rapidly. The legacy mini-game tests your knowledge.')
      )
    )
  );
}
