import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Question as QuestionType } from "../data/quizData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: number) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export const Question = ({ question, onAnswer, currentQuestion, totalQuestions }: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  
  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setAnswered(false);
  }, [question.id]);

  const handleAnswerClick = (index: number) => {
    if (answered) return; // Prevent multiple selections
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    // Delay the score calculation to show feedback first
    setTimeout(() => {
      onAnswer(index);
    }, 1000);
  };

  const getButtonClass = (index: number) => {
    const isCorrect = index === question.correctAnswer;
    const isSelected = selectedAnswer === index;
    const baseClass = "p-6 text-left justify-start text-lg w-full transition-all relative hover:shadow-md border rounded-lg";
    
    if (!answered) {
      return `${baseClass} bg-white hover:bg-gray-50 text-gray-700`;
    }

    if (isSelected) {
      return isCorrect 
        ? `${baseClass} bg-green-100 border-green-500 text-green-900`
        : `${baseClass} bg-red-100 border-red-500 text-red-900`;
    }

    if (isCorrect && answered) {
      return `${baseClass} bg-green-100 border-green-500 text-green-900`;
    }

    return `${baseClass} bg-gray-100 text-gray-500`;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-white/50 backdrop-blur-md shadow-xl border-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-50/20 to-indigo-100/30 rounded-lg z-0" />
        <CardHeader className="space-y-4 relative z-10">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600 bg-white/50 px-3 py-1 rounded-full">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <div className="w-40">
              <Progress 
                value={(currentQuestion / totalQuestions) * 100} 
                className="h-2 bg-gray-200"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{question.question}</h2>
        </CardHeader>

        <CardContent className="relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-3"
          >
            {question.options.map((option, index) => {
              const isCorrect = index === question.correctAnswer;
              
              return (
                <motion.div key={index} variants={item}>
                  <Button
                    onClick={() => handleAnswerClick(index)}
                    className={getButtonClass(index)}
                    variant="outline"
                    disabled={answered}
                  >
                    <span className="mr-3 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                    {answered && isCorrect && (
                      <Check 
                        className="ml-auto text-green-600 absolute right-4 top-1/2 -translate-y-1/2" 
                        size={24} 
                      />
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
