import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Question } from '../components/Question';
import { Result } from '../components/Result';
import { quizCategories } from '../data/quizData';
import { useToast } from '../components/ui/use-toast';
import { Button } from '../components/ui/button';
import { ArrowLeft, Brain } from 'lucide-react';
import { saveUserRecord } from '../lib/userRecords';
import { getRandomProfileImage } from '../lib/utils';

interface LocationState {
  username: string;
  profilePic?: string;
  quizType?: string;
}

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizType: quizTypeParam } = useParams<{ quizType: string }>();
  const { toast } = useToast();
  
  const [username, setUsername] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string>(getRandomProfileImage());
  const [quizType, setQuizType] = useState<string>('Tech Quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  
  // Find the appropriate question set based on quiz type
  const questions = useMemo(() => {
    const category = quizCategories.find(cat => cat.name === quizType) || quizCategories[0];
    return category.questions;
  }, [quizType]);
  
  useEffect(() => {
    // Get username from location state
    const state = location.state as LocationState;
    
    if (!state || !state.username) {
      // If no username is provided, redirect to dashboard
      navigate('/');
      return;
    }
    
    setUsername(state.username);
    if (state.profilePic) {
      setProfilePic(state.profilePic);
    }
    
    // Use quiz type from URL parameter if available, otherwise from state
    const decodedQuizType = quizTypeParam ? decodeURIComponent(quizTypeParam) : state.quizType || 'Tech Quiz';
    setQuizType(decodedQuizType);
    
    // Initialize selected answers array
    setSelectedAnswers(new Array(questions.length).fill(-1));
  }, [location, navigate, quizTypeParam, questions.length]);
  
  const handleAnswer = (answer: number) => {
    // Store the selected answer
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answer;
    setSelectedAnswers(newSelectedAnswers);
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      toast({
        description: "Correct answer!",
        className: "bg-green-500 text-white font-medium",
        duration: 500,
      });
    } else {
      toast({
        description: "Wrong answer",
        className: "bg-red-500 text-white font-medium",
        duration: 500,
      });
    }

    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
      }, 500);
    } else {
      // This is the last question, show results
      setTimeout(() => {
        setIsComplete(true);
        
        // Calculate final score based on all answers
        const finalScore = newSelectedAnswers.reduce((total, answer, index) => {
          return total + (answer === questions[index].correctAnswer ? 1 : 0);
        }, 0);
        
        const percentage = (finalScore / questions.length) * 100;
        let grade = "Expert";
        
        if (percentage < 50) {
          grade = "Beginner";
        } else if (percentage < 80) {
          grade = "Intermediate";
        }
        
        saveUserRecord({
          username,
          score: finalScore,
          totalQuestions: questions.length,
          profilePic,
          grade,
          quizType
        });
      }, 500);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };
  
  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <header className="container mx-auto px-4 py-4 sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={handleBackToDashboard}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white ml-2">Answer Arena</h1>
            </div>
          </div>
          <div className="text-base font-bold text-primary dark:text-primary-foreground px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20">
            {quizType}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl transition-all duration-300 ease-in-out">
          {!isComplete && questions.length > 0 ? (
            <Question
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              currentQuestion={currentQuestion + 1}
              totalQuestions={questions.length}
            />
          ) : (
            <Result
              score={score}
              totalQuestions={questions.length}
              onRestart={handleRestart}
              username={username}
              profilePic={profilePic}
              quizType={quizType}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Quiz;
