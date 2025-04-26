export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Which framework is primarily maintained by Google?",
    options: ["React", "Vue", "Angular", "Svelte"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "What is Firebase's primary database called?",
    options: ["MongoDB", "Realtime Database", "PostgreSQL", "MySQL"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Which technology is NOT part of the MERN stack?",
    options: ["MongoDB", "Express.js", "Python", "Node.js"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "What is Google's programming language for Android development?",
    options: ["Swift", "Kotlin", "Java", "Both B and C"],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "Which Google product is used for containerization?",
    options: ["Docker", "Kubernetes", "Jenkins", "CircleCI"],
    correctAnswer: 1,
  },
];
