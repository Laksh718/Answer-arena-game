import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuestionProps {
  question: {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
  };
  onAnswer: (answer: number) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export const Question = ({ question, onAnswer, currentQuestion, totalQuestions }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const handleOptionClick = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    // Delay sending the answer to show feedback
    setTimeout(() => {
      onAnswer(optionIndex);
      setSelectedOption(null);
      setIsAnswered(false);
    }, 500); // Reduced from 800ms to 500ms for faster transitions
  };
  
  const getOptionClass = (optionIndex: number) => {
    if (!isAnswered || selectedOption !== optionIndex) {
      return 'bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 text-gray-800 dark:text-white border-transparent hover:border-primary/50 transition-all duration-200';
    }
    
    if (optionIndex === question.correctAnswer) {
      return 'bg-green-50 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-300';
    }
    
    if (selectedOption === optionIndex) {
      return 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-300';
    }
    
    return 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white';
  };
  
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-none overflow-hidden rounded-xl">
        <CardHeader className="pb-2 pt-6 px-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-primary dark:text-primary-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
        </CardHeader>
        
        <CardContent className="pt-6 px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            {question.text}
          </h2>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <div key={index} className="transform transition-all duration-200 hover:translate-y-[-2px]">
                <Button
                  variant="outline"
                  className={`w-full p-5 text-left justify-start text-base md:text-lg font-medium mb-1 border-2 rounded-xl relative ${getOptionClass(index)}`}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                >
                  <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-foreground">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-grow">{option}</span>
                  
                  {isAnswered && selectedOption === index && (
                    <div className="absolute right-4">
                      {index === question.correctAnswer ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-4 pb-6 px-6">
          <div className="w-full text-center text-sm text-gray-600 dark:text-gray-400">
            Select the best answer from the options above
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
