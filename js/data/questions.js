const questions = [
  // EASY
  { difficulty: 'easy', question: 'What is the capital of France?', choices: ['Berlin', 'Madrid', 'Paris', 'Rome'], correct: 2 },
  { difficulty: 'easy', question: '2 + 2 = ?', choices: ['3', '4', '5', '2'], correct: 1 },
  { difficulty: 'easy', question: 'Which color is created by mixing red and white?', choices: ['Pink', 'Purple', 'Brown', 'Orange'], correct: 0 },
  { difficulty: 'easy', question: 'How many legs does a spider have?', choices: ['6', '8', '10', '12'], correct: 1 },
  { difficulty: 'easy', question: 'Which animal is known as the King of the Jungle?', choices: ['Tiger', 'Elephant', 'Lion', 'Bear'], correct: 2 },
  { difficulty: 'easy', question: 'What planet do we live on?', choices: ['Mars', 'Earth', 'Venus', 'Saturn'], correct: 1 },
  { difficulty: 'easy', question: 'What do bees produce?', choices: ['Milk', 'Honey', 'Wax', 'Silk'], correct: 1 },
  { difficulty: 'easy', question: 'How many days are in a regular year?', choices: ['365', '366', '364', '360'], correct: 0 },
  { difficulty: 'easy', question: 'Which is the largest bird?', choices: ['Eagle', 'Ostrich', 'Penguin', 'Parrot'], correct: 1 },
  { difficulty: 'easy', question: 'What is water boiling temperature in Celsius?', choices: ['50', '100', '150', '200'], correct: 1 },
  { difficulty: 'easy', question: 'How many colors are in a rainbow?', choices: ['5', '6', '7', '8'], correct: 2 },
  { difficulty: 'easy', question: 'If you freeze water, what do you get?', choices: ['Steam', 'Ice', 'Snow', 'Cloud'], correct: 1 },
  { difficulty: 'easy', question: 'Which fruit is known to keep the doctor away?', choices: ['Apple', 'Banana', 'Orange', 'Grape'], correct: 0 },
  { difficulty: 'easy', question: 'What shape is a pizza generally?', choices: ['Circle', 'Square', 'Triangle', 'Rectangle'], correct: 0 },
  { difficulty: 'easy', question: 'What is 10 - 3?', choices: ['5', '6', '7', '8'], correct: 2 },

  // MEDIUM
  { difficulty: 'medium', question: 'Which planet has the most moons?', choices: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correct: 3 },
  { difficulty: 'medium', question: 'What does HTTP stand for?', choices: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'Hyperlink Text Transfer', 'Home Transfer Text Protocol'], correct: 0 },
  { difficulty: 'medium', question: 'Who painted the Mona Lisa?', choices: ['Van Gogh', 'Michelangelo', 'Leonardo da Vinci', 'Raphael'], correct: 2 },
  { difficulty: 'medium', question: 'What is the largest ocean on Earth?', choices: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], correct: 3 },
  { difficulty: 'medium', question: 'Which organ pumps blood in the human body?', choices: ['Liver', 'Heart', 'Lungs', 'Brain'], correct: 1 },
  { difficulty: 'medium', question: 'What is the chemical symbol for Gold?', choices: ['Ag', 'Au', 'Gd', 'Go'], correct: 1 },
  { difficulty: 'medium', question: 'How many bones are in the adult human body?', choices: ['206', '208', '210', '212'], correct: 0 },
  { difficulty: 'medium', question: 'Which gas do plants absorb from the atmosphere?', choices: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correct: 1 },
  { difficulty: 'medium', question: 'In what year did the Titanic sink?', choices: ['1910', '1912', '1914', '1916'], correct: 1 },
  { difficulty: 'medium', question: 'What is the tallest mountain in the world?', choices: ['K2', 'Mount Everest', 'Mount Kilimanjaro', 'Mount Fuji'], correct: 1 },
  { difficulty: 'medium', question: 'What is the hardest natural substance on Earth?', choices: ['Gold', 'Iron', 'Diamond', 'Platinum'], correct: 2 },
  { difficulty: 'medium', question: 'Who wrote "Romeo and Juliet"?', choices: ['Charles Dickens', 'J.K. Rowling', 'William Shakespeare', 'Mark Twain'], correct: 2 },
  { difficulty: 'medium', question: 'What is the longest river in the world?', choices: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], correct: 1 },
  { difficulty: 'medium', question: 'How many planets are in our solar system?', choices: ['7', '8', '9', '10'], correct: 1 },
  { difficulty: 'medium', question: 'Which of these is a mammal?', choices: ['Shark', 'Dolphin', 'Crocodile', 'Eagle'], correct: 1 },

  // HARD
  { difficulty: 'hard', question: 'In which year was the Battle of Hastings?', choices: ['1066', '1215', '1415', '1588'], correct: 0 },
  { difficulty: 'hard', question: 'What is the derivative of sin(x)?', choices: ['cos(x)', '-sin(x)', '-cos(x)', 'sin(x)'], correct: 0 },
  { difficulty: 'hard', question: 'Which language introduced the concept of prototypes in OOP?', choices: ['Java', 'Smalltalk', 'JavaScript', 'Self'], correct: 3 },
  { difficulty: 'hard', question: 'What is the rarest blood type?', choices: ['O-', 'B-', 'AB-', 'A-'], correct: 2 },
  { difficulty: 'hard', question: 'Who was the first female Prime Minister of the UK?', choices: ['Theresa May', 'Margaret Thatcher', 'Angela Merkel', 'Queen Elizabeth II'], correct: 1 },
  { difficulty: 'hard', question: 'What is the powerhouse of the cell?', choices: ['Nucleus', 'Ribosome', 'Mitochondria', 'Endoplasmic Reticulum'], correct: 2 },
  { difficulty: 'hard', question: 'Which element has the highest melting point?', choices: ['Iron', 'Carbon', 'Tungsten', 'Titanium'], correct: 2 },
  { difficulty: 'hard', question: 'Who is the author of "1984"?', choices: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'H.G. Wells'], correct: 1 },
  { difficulty: 'hard', question: 'What is the capital of Australia?', choices: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra'], correct: 3 },
  { difficulty: 'hard', question: 'Which country won the first FIFA World Cup in 1930?', choices: ['Brazil', 'Argentina', 'Uruguay', 'Italy'], correct: 2 },
  { difficulty: 'hard', question: 'What does "DNA" stand for?', choices: ['Deoxyribonucleic Acid', 'Dinucleic Acid', 'Deoxyribonuclein Acid', 'Desoxyribonucleic Acid'], correct: 0 },
  { difficulty: 'hard', question: 'Who developed the theory of general relativity?', choices: ['Isaac Newton', 'Niels Bohr', 'Albert Einstein', 'Galileo Galilei'], correct: 2 },
  { difficulty: 'hard', question: 'Which string instrument is the largest?', choices: ['Cello', 'Viola', 'Harp', 'Double Bass'], correct: 3 },
  { difficulty: 'hard', question: 'What is the value of Pi to 4 decimal places?', choices: ['3.1415', '3.1416', '3.1425', '3.1426'], correct: 0 },
  { difficulty: 'hard', question: 'What is the state capital of California?', choices: ['Los Angeles', 'San Francisco', 'Sacramento', 'San Diego'], correct: 2 }
];

export default questions;
