
import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface UserProfileProps {
  score: number;
  totalQuestions: number;
  grade: string;
  username: string;
  profilePic: string;
}

export const UserProfile = ({ score, totalQuestions, grade, username, profilePic }: UserProfileProps) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="w-full max-w-xs bg-white/50 backdrop-blur-md shadow-lg border-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-blue-50/10 to-indigo-100/20 rounded-lg" />
        <CardHeader className="space-y-4 relative z-10">
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Avatar className="h-24 w-24 ring-4 ring-white/50 ring-offset-2 ring-offset-primary/10">
                <AvatarImage 
                  src={profilePic}
                  alt={`${username}'s avatar`}
                />
                <AvatarFallback className="bg-primary/10">
                  <UserRound className="h-12 w-12 text-primary" />
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Quiz Taker</p>
            <p className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {username}
            </p>
            <p className="text-sm text-gray-500">{grade} Level</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 relative z-10">
          <div className="bg-white/70 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">Accuracy</span>
              <span className="font-bold text-primary">{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-primary to-purple-600 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white/70 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Score</span>
              <span className="font-bold text-primary">{score}/{totalQuestions}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
