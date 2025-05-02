export interface UserRecord {
  id: string;
  username: string;
  score: number;
  totalQuestions: number;
  date: string;
  profilePic: string;
  grade: string;
  quizType: string;
}

// Function to save a user record to localStorage
export const saveUserRecord = (record: Omit<UserRecord, 'id' | 'date'>): UserRecord => {
  // Get existing records
  const records = getUserRecords();
  
  // Create a new record with id and date
  const newRecord: UserRecord = {
    ...record,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  
  // Add to records and save
  records.push(newRecord);
  localStorage.setItem('userRecords', JSON.stringify(records));
  
  return newRecord;
};

// Function to get all user records
export const getUserRecords = (): UserRecord[] => {
  const recordsJson = localStorage.getItem('userRecords');
  if (!recordsJson) return [];
  
  try {
    return JSON.parse(recordsJson);
  } catch (error) {
    console.error('Error parsing user records:', error);
    return [];
  }
};

// Function to get top scores
export const getTopScores = (limit: number = 5): UserRecord[] => {
  const records = getUserRecords();
  
  // Sort by percentage score (descending)
  return records
    .sort((a, b) => {
      const scoreA = (a.score / a.totalQuestions) * 100;
      const scoreB = (b.score / b.totalQuestions) * 100;
      return scoreB - scoreA;
    })
    .slice(0, limit);
};

// Function to get recent scores
export const getRecentScores = (limit: number = 5): UserRecord[] => {
  const records = getUserRecords();
  
  // Sort by date (descending)
  return records
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Function to clear all records (for testing)
export const clearUserRecords = (): void => {
  localStorage.setItem('userRecords', JSON.stringify([]));
};
