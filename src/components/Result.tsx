import React from "react";
import { Button } from "./ui/button";
import { ArrowBigLeft, Award, Trophy, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { UserProfile } from "./UserProfile";
import { Progress } from "./ui/progress";

interface ResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  username: string;
  profilePic: string;
  quizType?: string;
}

export const Result = ({
  score,
  totalQuestions,
  onRestart,
  username,
  profilePic,
  quizType = "Tech Quiz",
}: ResultProps) => {
  const percentage = (score / totalQuestions) * 100;
  let message = "Phenomenal Performance!";
  let emoji = "🎯";
  let grade = "Expert";
  let icon = Trophy;
  let gradeColor = "text-purple-600 dark:text-purple-400";
  let gradeBg = "bg-purple-100 dark:bg-purple-900/30";

  if (percentage < 50) {
    message = "Keep learning, you'll improve!";
    emoji = "💪";
    grade = "Beginner";
    icon = Award;
    gradeColor = "text-blue-600 dark:text-blue-400";
    gradeBg = "bg-blue-100 dark:bg-blue-900/30";
  } else if (percentage < 80) {
    message = "Great progress! Keep it up!";
    emoji = "👏";
    grade = "Intermediate";
    icon = Award;
    gradeColor = "text-green-600 dark:text-green-400";
    gradeBg = "bg-green-100 dark:bg-green-900/30";
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start justify-center p-4 w-full">
      <div className="w-full md:w-auto">
        <UserProfile
          score={score}
          totalQuestions={totalQuestions}
          grade={grade}
          username={username}
          profilePic={profilePic}
          quizType={quizType}
        />
      </div>

      <div className="flex-1 max-w-md">
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-none overflow-hidden h-full rounded-xl">
          <CardContent className="space-y-8 p-8">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="relative bg-white dark:bg-gray-800 p-5 rounded-full">
                    {React.createElement(icon, {
                      className: "h-14 w-14 text-primary",
                    })}
                  </div>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-primary mb-2">
                Quiz Complete!
              </h2>
              <div className="text-lg text-gray-600 dark:text-gray-300">
                <p className="font-medium">{quizType}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6">
              <div className={`px-4 py-1.5 rounded-full ${gradeBg}`}>
                <span className={`font-bold ${gradeColor}`}>{grade} Level</span>
              </div>
              
              <div className="text-center">
                <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                  {message} {emoji}
                </p>
                
                <div className="mt-8 flex items-center justify-center">
                  <div className="text-7xl font-bold text-primary">
                    {score}
                  </div>
                  <div className="text-2xl text-gray-500 dark:text-gray-400 ml-2">
                    / {totalQuestions}
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Score</span>
                    <span className="text-sm font-medium text-primary">{percentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2.5 bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
              
              <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.ceil(percentage / 20) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} 
                  />
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-col space-y-3">
              <Button
                onClick={onRestart}
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl transition-all duration-200 hover:shadow-lg"
              >
                <ArrowBigLeft className="mr-2 h-5 w-5" />
                Back to Dashboard
              </Button>
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                Play again to improve your score!
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
