import { useState } from "react";
import { Welcome } from "@/components/Welcome";
import { Question } from "@/components/Question";
import { Result } from "@/components/Result";
import { quizQuestions } from "@/data/quizData";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { UsernameDialog } from "@/components/UsernameDialog";
import { getRandomProfileImage } from "@/lib/utils";

const Index = () => {
  const [started, setStarted] = useState(false);
  const [showUsernameDialog, setShowUsernameDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const { toast } = useToast();

  const handleStart = () => {
    setShowUsernameDialog(true);
    setProfilePic(getRandomProfileImage());
  };

  const handleUsernameSubmit = (name: string) => {
    setUsername(name);
    setShowUsernameDialog(false);
    setStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setIsComplete(false);
  };

  const handleAnswer = (answer: number) => {
    const isCorrect = answer === quizQuestions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      toast({
        description: "Correct answer! 🎉",
        className: "bg-green-500 text-white font-medium",
      });
    } else {
      toast({
        description: "Wrong answer. Try the next question!",
        className: "bg-red-500 text-white font-medium",
      });
    }

    // Move to next question or show results
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsComplete(true);
      }, 1000);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setShowUsernameDialog(false);
    setCurrentQuestion(0);
    setScore(0);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl"
      >
        <UsernameDialog
          open={showUsernameDialog}
          onSubmit={handleUsernameSubmit}
        />

        <AnimatePresence mode="wait">
          {!started && !showUsernameDialog && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Welcome onStart={handleStart} />
            </motion.div>
          )}

          {started && !isComplete && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Question
                question={quizQuestions[currentQuestion]}
                onAnswer={handleAnswer}
                currentQuestion={currentQuestion + 1}
                totalQuestions={quizQuestions.length}
              />
            </motion.div>
          )}

          {isComplete && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Result
                score={score}
                totalQuestions={quizQuestions.length}
                onRestart={handleRestart}
                username={username}
                profilePic={profilePic}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Index;
