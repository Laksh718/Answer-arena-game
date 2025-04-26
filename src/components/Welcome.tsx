
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowBigRight, Brain } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome = ({ onStart }: WelcomeProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-white/50 backdrop-blur-md shadow-xl border-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-50/20 to-indigo-100/30 rounded-lg z-0" />
        <CardHeader>
          <div className="flex flex-col items-center space-y-6 relative z-10">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="p-5 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full shadow-inner"
            >
              <Brain className="w-16 h-16 text-primary" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Knowledge Quest
            </h1>
            <p className="text-xl text-gray-600 max-w-md text-center leading-relaxed">
              Challenge yourself with our interactive quiz. Test your knowledge and see how you rank against others!
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex justify-center pb-10 relative z-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onStart}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-10 py-7 rounded-xl text-lg font-medium transition-all shadow-lg"
            >
              Start Quiz <ArrowBigRight className="ml-2 w-6 h-6" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
