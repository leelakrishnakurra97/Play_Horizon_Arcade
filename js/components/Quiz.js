import React, { useState, useEffect, useRef } from 'react';
import questionsData from '../data/questions.js';
import { Clock, Star, XCircle, CheckCircle } from 'lucide-react';

const h = React.createElement;

const difficultyConfig = {
  easy: { timePer: 20, points: 10 },
  medium: { timePer: 12, points: 20 },
  hard: { timePer: 8, points: 30 }
};

export default function Quiz({ difficulty = 'medium', onQuit, onFinished }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const pool = questionsData.filter((q) => q.difficulty === difficulty);
    const picked = shuffle(pool).slice(0, 10);
    setQuestions(picked);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setTimeLeft(difficultyConfig[difficulty].timePer);
  }, [difficulty]);

  function shuffle(arr) {
    return arr.slice().sort(() => Math.random() - 0.5);
  }

  function handleNext() {
    setSelected(null);
    if (index + 1 >= questions.length) {
      onFinished();
      return;
    }
    setIndex((i) => i + 1);
  }

  function handleAnswer(choice) {
    if (selected !== null) return;
    setSelected(choice);
    const q = questions[index];
    if (choice === q.correct) {
      setScore((s) => s + difficultyConfig[difficulty].points);
    }
    setTimeout(handleNext, 800);
  }

  useEffect(() => {
    if (!questions.length) return;
    clearInterval(timerRef.current);
    setTimeLeft(difficultyConfig[difficulty].timePer);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleNext();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [questions, index]);

  if (!questions.length) {
    return h('div', { className: 'card' }, 'Loading questions...');
  }

  const q = questions[index];
  const isDanger = timeLeft <= 5;

  return h(
    'div',
    { className: 'card quiz', key: `q-${index}` },
    h(
      'div',
      { className: 'quiz-top' },
      h(
        'div',
        { className: 'meta' },
        h(Star, { size: 16, color: '#fbbf24', fill: '#fbbf24' }),
        ` Question ${index + 1}/${questions.length}`
      ),
      h(
        'div',
        { className: `timer ${isDanger ? 'danger' : ''}` },
        h(Clock, { size: 16 }),
        ` ${timeLeft}s`
      )
    ),
    h('h3', { className: 'question' }, q.question),
    h(
      'div',
      { className: 'choices' },
      q.choices.map((c, i) => {
        let statusClass = '';
        let Icon = null;
        if (selected === i) {
          if (i === q.correct) {
            statusClass = 'correct';
            Icon = CheckCircle;
          } else {
            statusClass = 'wrong';
            Icon = XCircle;
          }
        } else if (selected !== null && i === q.correct) {
          statusClass = 'correct';
          Icon = CheckCircle;
        }
        return h(
          'button',
          {
            key: i,
            disabled: selected !== null,
            className: `choice ${statusClass}`,
            onClick: () => handleAnswer(i)
          },
          h('span', null, c),
          Icon && h('span', null, h(Icon, { size: 18 }))
        );
      })
    ),
    h(
      'div',
      { className: 'quiz-footer' },
      h('div', { className: 'score' }, `Score: ${score}`),
      h(
        'div',
        { className: 'controls' },
        h(
          'button',
          {
            className: 'btn ghost',
            onClick: () => {
              clearInterval(timerRef.current);
              onQuit();
            }
          },
          'Quit'
        )
      )
    )
  );
}
