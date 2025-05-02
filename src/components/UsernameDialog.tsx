import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getRandomProfileImage } from "../lib/utils";

interface UsernameDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (username: string) => void;
}

export const UsernameDialog = ({ open, onOpenChange, onSubmit }: UsernameDialogProps) => {
  const [username, setUsername] = useState("");
  const [profilePic] = useState(getRandomProfileImage());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-none shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent text-center">
            Welcome to the Quiz!
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Avatar className="h-24 w-24 ring-4 ring-white/50 dark:ring-gray-700/50 ring-offset-2 ring-offset-primary/10">
                <AvatarImage src={profilePic} alt="Profile picture" />
                <AvatarFallback className="bg-primary/10">
                  <User className="h-12 w-12 text-primary" />
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                className="h-12 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-2 border-primary/20 focus:border-primary/40 text-lg text-center placeholder:text-gray-400 dark:text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={!username.trim()}
              className="w-full h-12 text-lg bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"
            >
              Start Quiz
            </Button>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
