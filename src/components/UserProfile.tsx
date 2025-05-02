import { UserRound, Trophy, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardHeader, CardContent } from "./ui/card";

interface UserProfileProps {
  score: number;
  totalQuestions: number;
  grade: string;
  username: string;
  profilePic: string;
  quizType?: string;
}

export const UserProfile = ({ score, totalQuestions, grade, username, profilePic, quizType = "Tech Quiz" }: UserProfileProps) => {
  const percentage = (score / totalQuestions) * 100;
  
  let gradeColor = "text-purple-600 dark:text-purple-400";
  let gradeBg = "bg-purple-100 dark:bg-purple-900/30";
  let GradeIcon = Trophy;

  if (grade === "Beginner") {
    gradeColor = "text-blue-600 dark:text-blue-400";
    gradeBg = "bg-blue-100 dark:bg-blue-900/30";
    GradeIcon = Award;
  } else if (grade === "Intermediate") {
    gradeColor = "text-green-600 dark:text-green-400";
    gradeBg = "bg-green-100 dark:bg-green-900/30";
    GradeIcon = Award;
  }

  return (
    <div className="transform transition-all duration-300 hover:translate-y-[-4px]">
      <Card className="w-full max-w-xs bg-white dark:bg-gray-800 shadow-lg border-none overflow-hidden rounded-xl">
        <CardHeader className="space-y-4 pt-6">
          <div className="flex justify-center">
            <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800">
              <AvatarImage 
                src={profilePic}
                alt={`${username}'s avatar`}
              />
              <AvatarFallback className="bg-primary/10 dark:bg-primary/20">
                <UserRound className="h-12 w-12 text-primary" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Quiz Taker</p>
            <p className="text-2xl font-bold text-primary">
              {username}
            </p>
            <div className="flex justify-center mt-3">
              <div className={`px-3 py-1 rounded-full flex items-center gap-1 ${gradeBg}`}>
                <GradeIcon className={`h-3.5 w-3.5 ${gradeColor}`} />
                <span className={`text-xs font-bold ${gradeColor}`}>{grade} Level</span>
              </div>
            </div>
            <p className="text-xs text-primary/80 font-medium mt-2">{quizType}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Accuracy</span>
              <span className="font-bold text-primary">{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Score</span>
              <div className="flex items-baseline">
                <span className="font-bold text-2xl text-primary">{score}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">/ {totalQuestions}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
