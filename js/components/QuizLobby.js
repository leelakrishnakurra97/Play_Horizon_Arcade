import React from 'react';
import { Zap, Trophy } from 'lucide-react';

const h = React.createElement;

export default function QuizLobby({ onStart, onBack }) {
  return h(
    'div',
    { className: 'card quiz-lobby' },
    h(
      'button',
      { type: 'button', className: 'btn btn-secondary quiz-lobby-back', onClick: onBack },
      'Back to Arcade'
    ),
    h(
      'header',
      { className: 'quiz-lobby-header' },
      h('h2', { className: 'quiz-lobby-title' }, 'Knowledge Check'),
      h(
        'p',
        { className: 'quiz-lobby-subtitle' },
        'The legacy quiz mode. Select your difficulty.'
      )
    ),
    h(
      'div',
      { className: 'quiz-lobby-body' },
      h(
        'div',
        { className: 'difficulty-grid' },
        h(
          'div',
          { className: 'diff-card easy', onClick: () => onStart('easy') },
          h('h3', { style: { marginTop: 0 } }, 'Easy'),
          h('span', { className: 'time-limit' }, '20s per question')
        ),
        h(
          'div',
          { className: 'diff-card medium', onClick: () => onStart('medium') },
          h('h3', { style: { marginTop: 0 } }, 'Medium'),
          h('span', { className: 'time-limit' }, '12s per question')
        ),
        h(
          'div',
          { className: 'diff-card hard', onClick: () => onStart('hard') },
          h('h3', { style: { marginTop: 0 } }, 'Hard'),
          h('span', { className: 'time-limit' }, '8s per question')
        )
      ),
      h(
        'div',
        { className: 'hint-box quiz-lobby-hint' },
        h(Zap, { size: 16, className: 'hint-icon', style: { color: 'var(--accent)' } }),
        h('span', null, 'Harder modes reward you with higher score multipliers.')
      )
    )
  );
}
