import React, { useEffect, useState } from 'react';
import { Trophy, ArrowLeft, Trash2, Medal } from 'lucide-react';

const h = React.createElement;

export default function Leaderboard({ onBack }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('quiz_leaderboard');
    const parsed = raw ? JSON.parse(raw) : [];
    parsed.sort((a, b) => b.score - a.score);
    setScores(parsed.slice(0, 100));
  }, []);

  return h(
    'div',
    { className: 'card leaderboard' },
    h(
      'h2',
      { className: 'card-title' },
      h(Trophy, { color: '#fbbf24', strokeWidth: 2.5 }),
      ' Top Players'
    ),
    scores.length === 0
      ? h(
          'div',
          {
            style: {
              textAlign: 'center',
              color: 'var(--muted)',
              padding: '40px 0'
            }
          },
          h(Trophy, { size: 48, opacity: 0.2, style: { marginBottom: '16px' } }),
          h('p', null, 'No scores yet — play a game to get on the board!')
        )
      : h(
          'ul',
          { className: 'leaderboard-list' },
          scores.map((s, idx) =>
            h(
              'li',
              { key: idx, className: `lb-item rank-${idx + 1}` },
              h(
                'div',
                { className: 'lb-rank' },
                idx < 3 ? h(Medal, { size: 24 }) : `#${idx + 1}`
              ),
              h(
                'div',
                { className: 'lb-player' },
                h('span', { className: 'lb-name' }, s.name),
                h('span', { className: 'lb-diff' }, `${s.difficulty || 'medium'} mode`)
              ),
              h(
                'div',
                { className: 'lb-score' },
                s.score,
                h(
                  'span',
                  {
                    style: {
                      fontSize: '0.8rem',
                      color: 'var(--muted)',
                      fontWeight: 400
                    }
                  },
                  'pts'
                )
              )
            )
          )
        ),
    h(
      'div',
      { className: 'controls', style: { marginTop: '24px' } },
      h(
        'button',
        { className: 'btn ghost', onClick: onBack },
        h(ArrowLeft, { size: 16 }),
        ' Back'
      ),
      h(
        'button',
        {
          className: 'btn ghost',
          onClick: () => {
            localStorage.removeItem('quiz_leaderboard');
            setScores([]);
          }
        },
        h(Trash2, { size: 16, color: '#f87171' }),
        ' Clear'
      )
    )
  );
}
