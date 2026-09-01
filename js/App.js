import React, { useState } from 'react';
import Home from './components/Home.js';
import QuizLobby from './components/QuizLobby.js';
import Quiz from './components/Quiz.js';

import Sudoku from './components/Sudoku.js';
import Snake from './components/Snake.js';
import { Home as HomeIcon } from 'lucide-react';

const h = React.createElement;

const brandLogo = new URL('../assets/dark_logo.png', import.meta.url).href;

export default function App() {
  const [view, setView] = useState('home');
  const [difficulty, setDifficulty] = useState('medium');

  function startQuiz(level) {
    setDifficulty(level);
    setView('quiz');
  }

  function handleSelectGame(gameView) {
    setView(gameView);
  }

  return h(
    'div',
    { className: 'app' },
    h(
      'header',
      { className: 'top-nav' },
      h(
        'div',
        {
          className: 'brand',
          onClick: () => setView('home'),
          style: { cursor: 'pointer' }
        },
        h('img', {
          src: brandLogo,
          alt: 'Logo',
          style: {
            width: '40px',
            height: '40px',
            objectFit: 'contain',
            mixBlendMode: 'screen',
            filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.6))'
          }
        }),
        h('span', { className: 'brand-text' }, 'Play Horizon')
      ),
      h(
        'nav',
        { className: 'nav-links' },
        h(
          'button',
          {
            className: `nav-btn ${view === 'home' ? 'active' : ''}`,
            onClick: () => setView('home')
          },
          h(HomeIcon, { size: 18 }),
          h('span', { className: 'hide-mobile' }, 'Arcade')
        )
      )
    ),
    h(
      'main',
      {
        className: 'main-content',
        style: { display: 'flex', justifyContent: 'center', width: '100%' }
      },
      view === 'home' && h(Home, { onSelectGame: handleSelectGame }),
      view === 'sudoku' && h(Sudoku, { onQuit: () => setView('home') }),
      view === 'snake' && h(Snake, { onQuit: () => setView('home') }),
      view === 'quiz-lobby' &&
        h(QuizLobby, {
          onStart: startQuiz,
          onBack: () => setView('home')
        }),
      view === 'quiz' &&
        h(Quiz, {
          difficulty,
          onQuit: () => setView('quiz-lobby'),
          onFinished: () => setView('quiz-lobby')
        })
    ),
    h(
      'footer',
      { className: 'site-footer', role: 'contentinfo' },
      h('p', { className: 'site-footer-title' }, 'Play Horizon'),
      h(
        'p',
        { className: 'site-footer-tagline' },
        'Sudoku · Neon Snake · QuizMaster'
      ),
      h(
        'p',
        { className: 'site-footer-meta' },
        'Static web app · React via CDN'
      )
    )
  );
}
