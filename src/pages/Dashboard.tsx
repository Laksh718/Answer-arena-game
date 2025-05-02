import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { UserRecords } from '../components/UserRecords';
import { quizCategories } from '../data/quizData';
import { Brain, BarChart, Play, BookOpen, Code, Trophy, Medal, Star } from 'lucide-react';
import { UsernameDialog } from '../components/UsernameDialog';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { getRandomProfileImage } from '../lib/utils';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [showUsernameDialog, setShowUsernameDialog] = useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState("Tech Quiz");
  const userRecordsRef = useRef<HTMLDivElement>(null);
  
  const handleStartQuiz = (quizType: string) => {
    setSelectedQuizType(quizType);
    setShowUsernameDialog(true);
  };
  
  const handleUsernameSubmit = (name: string) => {
    setShowUsernameDialog(false);
    // Navigate to quiz page with username as state
    navigate(`/quiz/${encodeURIComponent(selectedQuizType)}`, { 
      state: { 
        username: name,
        profilePic: getRandomProfileImage(),
        quizType: selectedQuizType
      } 
    });
  };

  const handleViewStats = () => {
    // Scroll to user records section
    if (userRecordsRef.current) {
      userRecordsRef.current.scrollIntoView({ behavior: 'smooth' });
      
      // On mobile, we might need to ensure it's visible
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setTimeout(() => {
          window.scrollBy({
            top: -80, // Adjust for header
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <UsernameDialog
        open={showUsernameDialog}
        onOpenChange={setShowUsernameDialog}
        onSubmit={handleUsernameSubmit}
      />
      
      <header className="container mx-auto px-4 py-6 sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Answer Arena</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-primary/90 rounded-full p-5">
                <Brain className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Answer Arena
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Challenge yourself with our interactive quizzes and test your knowledge across different categories!
          </p>
          <Button 
            onClick={handleViewStats}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white dark:text-white text-lg px-8 py-6"
          >
            <Trophy className="mr-2 h-5 w-5" /> View Your Stats
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {quizCategories.map((category) => (
            <div key={category.id}>
              <Card className="bg-white dark:bg-gray-800 hover:shadow-xl transition-all h-full border-none overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
                      {category.id === 'tech' && <Brain className="h-8 w-8 text-primary" />}
                      {category.id === 'general' && <BookOpen className="h-8 w-8 text-primary" />}
                      {category.id === 'coding' && <Code className="h-8 w-8 text-primary" />}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">{category.name}</CardTitle>
                      <div className="flex items-center text-yellow-500 mt-1">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{category.questions.length} questions</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {category.id === 'tech' && 'Test your knowledge about Google technologies, web development, and the latest tech trends.'}
                    {category.id === 'general' && 'Challenge yourself with questions spanning history, science, arts, and general knowledge.'}
                    {category.id === 'coding' && 'Put your programming skills to the test with coding challenges and computer science questions.'}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Medal className="h-4 w-4 mr-1" />
                      <span>Earn badges</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1" />
                      <span>Compete for top scores</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    onClick={() => handleStartQuiz(category.name)}
                    className="w-full bg-primary hover:bg-primary/90 text-white dark:text-white py-5 text-lg"
                  >
                    <Play className="mr-2 h-5 w-5" /> Start Quiz
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        
        <div ref={userRecordsRef} id="stats-section" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
              <Trophy className="mr-3 h-7 w-7 text-primary" />
              Your Quiz Records
            </h2>
          </div>
          <UserRecords />
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-6 mt-auto border-t border-gray-200 dark:border-gray-800">
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Answer Arena - All rights reserved
        </div>
      </footer>
    </div>
  );
};
