export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  siteId?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What year did freed slaves gather under the Cotton Tree to give thanks?',
    options: ['1792', '1800', '1818', '1896'],
    correctAnswer: 0,
    explanation: 'In 1792, freed slaves gathered under the Cotton Tree to pray and give thanks for their freedom, establishing it as a symbol of liberty.',
    siteId: '1',
  },
  {
    id: 'q2',
    question: 'What happened to the historic Cotton Tree in 2023?',
    options: [
      'It was renovated',
      'It fell during a storm',
      'It was relocated',
      'Nothing significant',
    ],
    correctAnswer: 1,
    explanation: 'In May 2023, the historic Cotton Tree fell during a severe storm. A memorial site was later established to preserve its memory.',
    siteId: '1',
  },
  {
    id: 'q3',
    question: 'When was the Sierra Leone National Museum established?',
    options: ['1945', '1957', '1970', '2000'],
    correctAnswer: 1,
    explanation: 'The Sierra Leone National Museum was established in 1957 and serves as the primary institution for cultural preservation.',
    siteId: '3',
  },
  {
    id: 'q4',
    question: 'What does the Cotton Tree symbolize?',
    options: [
      'Economic prosperity',
      'Freedom and resilience',
      'Colonial power',
      'Natural beauty',
    ],
    correctAnswer: 1,
    explanation: 'The Cotton Tree represents freedom, resilience, and the beginning of a new nation. It is featured on Sierra Leone\'s coat of arms.',
    siteId: '1',
  },
  {
    id: 'q5',
    question: 'When was St. George\'s Cathedral built?',
    options: ['1792', '1800', '1818', '1896'],
    correctAnswer: 2,
    explanation: 'St. George\'s Cathedral was built in 1818 and is one of the oldest churches in Freetown.',
    siteId: '5',
  },
  {
    id: 'q6',
    question: 'Who was King Jimmy Market named after?',
    options: [
      'A British colonial governor',
      'A Temne chief',
      'A Mende warrior',
      'A freed slave leader',
    ],
    correctAnswer: 1,
    explanation: 'King Jimmy Market is named after King Jimmy, a Temne chief, and has served as a center of commerce for generations.',
    siteId: '4',
  },
  {
    id: 'q7',
    question: 'What temporarily caused the National Museum to close in the 1990s?',
    options: [
      'Renovation',
      'Funding issues',
      'Civil war',
      'Natural disaster',
    ],
    correctAnswer: 2,
    explanation: 'The civil war in the 1990s caused temporary closure of the National Museum. It reopened in the 2000s with restored collections.',
    siteId: '3',
  },
  {
    id: 'q8',
    question: 'Where is the Cotton Tree located?',
    options: [
      'Central Freetown',
      'Bo District',
      'Kenema',
      'Makeni',
    ],
    correctAnswer: 0,
    explanation: 'The Cotton Tree is located in Central Freetown, Sierra Leone, where it served as a central landmark.',
    siteId: '1',
  },
  {
    id: 'q9',
    question: 'What types of artifacts does the National Museum house?',
    options: [
      'Only colonial documents',
      'Only modern art',
      'Traditional masks, instruments, and historical documents',
      'Only photographs',
    ],
    correctAnswer: 2,
    explanation: 'The National Museum houses a rich collection including traditional masks, musical instruments, historical documents, and pre-historic tools.',
    siteId: '3',
  },
  {
    id: 'q10',
    question: 'When was the AR experience launched for the Cotton Tree Memorial?',
    options: ['2020', '2022', '2024', '2025'],
    correctAnswer: 2,
    explanation: 'In 2024, an AR experience was launched to recreate the Cotton Tree in augmented reality at the memorial site.',
    siteId: '2',
  },
];

export const getRandomQuestions = (count: number = 5): QuizQuestion[] => {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
