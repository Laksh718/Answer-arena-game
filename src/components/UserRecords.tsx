import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { UserRound, Trophy, Clock, Users, Medal } from 'lucide-react';
import { UserRecord, getTopScores, getRecentScores, getUserRecords } from '../lib/userRecords';
import { motion } from 'framer-motion';

export const UserRecords = () => {
  const [activeTab, setActiveTab] = useState('top');
  
  const topScores = getTopScores(5);
  const recentScores = getRecentScores(5);
  const allRecords = getUserRecords();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const calculatePercentage = (score: number, total: number) => {
    return ((score / total) * 100).toFixed(0) + '%';
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-xl border-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-50/20 to-indigo-100/30 dark:from-purple-900/30 dark:via-blue-900/20 dark:to-indigo-900/30 rounded-lg z-0" />
      <CardHeader className="relative z-10 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Quiz Records</CardTitle>
          <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
            <Medal className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <Tabs defaultValue="top" onValueChange={setActiveTab} id="user-records-tabs">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="top" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Top Scores</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Recent</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>All Records</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="top">
            {topScores.length > 0 ? (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {topScores.map((record) => (
                  <motion.div key={record.id} variants={item}>
                    <UserRecordItem record={record} formatDate={formatDate} calculatePercentage={calculatePercentage} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 px-4">
                <div className="flex justify-center mb-4">
                  <Trophy className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-300 mb-2">No quiz records yet</h3>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Take a quiz to see your scores here!
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recent">
            {recentScores.length > 0 ? (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {recentScores.map((record) => (
                  <motion.div key={record.id} variants={item}>
                    <UserRecordItem record={record} formatDate={formatDate} calculatePercentage={calculatePercentage} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 px-4">
                <div className="flex justify-center mb-4">
                  <Clock className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-300 mb-2">No recent attempts</h3>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Your recent quiz attempts will appear here
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all">
            {allRecords.length > 0 ? (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-3 max-h-[400px] overflow-y-auto pr-2"
              >
                {allRecords.map((record) => (
                  <motion.div key={record.id} variants={item}>
                    <UserRecordItem record={record} formatDate={formatDate} calculatePercentage={calculatePercentage} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 px-4">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-300 mb-2">No quiz history</h3>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Start taking quizzes to build your history
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface UserRecordItemProps {
  record: UserRecord;
  formatDate: (date: string) => string;
  calculatePercentage: (score: number, total: number) => string;
}

const UserRecordItem = ({ record, formatDate, calculatePercentage }: UserRecordItemProps) => {
  return (
    <div className="flex items-center p-3 bg-white/70 dark:bg-gray-700/70 rounded-lg transition-all hover:shadow-md">
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={record.profilePic} alt={record.username} />
        <AvatarFallback>
          <UserRound className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-900 dark:text-white truncate">{record.username}</p>
          <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(record.date)}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{record.quizType}</span>
            <span className="text-xs px-2 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground rounded-full">
              {record.grade}
            </span>
          </div>
          <div className="font-medium text-primary dark:text-primary-foreground">
            {record.score}/{record.totalQuestions} ({calculatePercentage(record.score, record.totalQuestions)})
          </div>
        </div>
      </div>
    </div>
  );
};
