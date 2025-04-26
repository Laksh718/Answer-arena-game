import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowBigLeft, Award, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "./UserProfile";
import { getRandomProfileImage } from "@/lib/utils";

interface ResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  username: string;
  profilePic: string;
}

export const Result = ({
  score,
  totalQuestions,
  onRestart,
  username,
  profilePic,
}: ResultProps) => {
  const percentage = (score / totalQuestions) * 100;
  let message = "Phenomenal Performance!";
  let emoji = "🎯";
  let grade = "Expert";
  let icon = Trophy;

  if (percentage < 50) {
    message = "Keep learning, you'll improve!";
    emoji = "💪";
    grade = "Beginner";
    icon = Award;
  } else if (percentage < 80) {
    message = "Great progress! Keep it up!";
    emoji = "👏";
    grade = "Intermediate";
    icon = Award;
  }

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const randomBackgroundPic = `https://source.unsplash.com/random/800x400?landscape&${Date.now()}`;

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col md:flex-row gap-8 items-start justify-center p-4"
    >
      <motion.div variants={itemVariants} className="w-full md:w-auto">
        <UserProfile
          score={score}
          totalQuestions={totalQuestions}
          grade={grade}
          username={username}
          profilePic={profilePic}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="flex-1 max-w-md">
        <Card className="bg-white/50 backdrop-blur-md shadow-xl border-none overflow-hidden h-full relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${randomBackgroundPic})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-50/20 to-indigo-100/30 rounded-lg" />
          <CardContent className="space-y-8 p-8 relative z-10">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  {React.createElement(icon, {
                    className: "h-12 w-12 text-primary",
                  })}
                </div>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Quiz Complete!
              </h2>
              <div className="mt-4 text-xl text-gray-600">
                <p>
                  {emoji} {message}
                </p>
              </div>

              <div className="mt-8 bg-white/70 rounded-lg p-4">
                <div className="text-5xl font-bold text-primary">
                  {score}/{totalQuestions}
                </div>
                <div className="text-gray-500 mt-1">Final Score</div>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={onRestart}
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all shadow-lg"
              >
                <ArrowBigLeft className="mr-2 h-6 w-6" /> Try Again
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
