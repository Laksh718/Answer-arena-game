export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizCategory {
  id: string;
  name: string;
  questions: Question[];
}

export const quizCategories: QuizCategory[] = [
  {
    id: "tech",
    name: "Tech Quiz",
    questions: [
      {
        id: 1,
        text: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Machine Learning",
          "Hyper Transfer Markup Language",
          "Hyperlink and Text Markup Language"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        text: "Which of these is NOT a JavaScript framework?",
        options: ["React", "Angular", "Vue", "Jakarta"],
        correctAnswer: 3
      },
      {
        id: 3,
        text: "What is the primary purpose of CSS?",
        options: [
          "To define the structure of a webpage",
          "To style and layout web pages",
          "To handle server-side logic",
          "To manage database operations"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        text: "Which company developed the Android operating system?",
        options: ["Apple", "Microsoft", "Google", "Samsung"],
        correctAnswer: 2
      },
      {
        id: 5,
        text: "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Automated Program Integration",
          "Advanced Programming Interface",
          "Application Process Integration"
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: "general",
    name: "General Knowledge",
    questions: [
      {
        id: 1,
        text: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
      },
      {
        id: 2,
        text: "Who painted the Mona Lisa?",
        options: [
          "Vincent van Gogh",
          "Pablo Picasso",
          "Leonardo da Vinci",
          "Michelangelo"
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        text: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correctAnswer: 2
      },
      {
        id: 4,
        text: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correctAnswer: 1
      },
      {
        id: 5,
        text: "Who wrote the play 'Romeo and Juliet'?",
        options: [
          "Charles Dickens",
          "Jane Austen",
          "William Shakespeare",
          "Mark Twain"
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "coding",
    name: "Coding Quiz",
    questions: [
      {
        id: 1,
        text: "Which of these is a Python web framework?",
        options: ["Express", "Django", "Laravel", "Ruby on Rails"],
        correctAnswer: 1
      },
      {
        id: 2,
        text: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Simple Question Language",
          "Standard Query Logic",
          "System Quality Language"
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        text: "In object-oriented programming, what is encapsulation?",
        options: [
          "The process of creating objects",
          "Bundling data and methods that operate on that data",
          "Inheriting properties from a parent class",
          "Converting code to machine language"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        text: "Which data structure operates on a LIFO principle?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        correctAnswer: 1
      },
      {
        id: 5,
        text: "What is the time complexity of binary search?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 2
      }
    ]
  }
];

// For backward compatibility
export const quizQuestions = quizCategories[0].questions;
