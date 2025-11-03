export enum Role {
  STUDENT = 'Student',
  INSTRUCTOR = 'Instructor',
  ADMIN = 'Admin',
  CONTENT_CREATOR = 'Content Creator',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  contentType: 'video' | 'pdf' | 'text';
  content: string; // URL for video/pdf or markdown text
  durationMinutes: number;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  category: string;
  thumbnailUrl: string;
  modules: Module[];
}

export interface Enrollment {
  userId: string;
  courseId: string;
  progress: number; // Percentage
  completedLessons: string[]; // Array of lesson IDs
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  grade: number | null;
  content: string; // Link to submission or text
  fileName?: string;
  feedback?: string;
}

export interface Announcement {
  id: string;
  courseId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface AnswerOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  questionText: string;
  options: AnswerOption[];
  correctAnswerId: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  answers: {
    questionId: string;
    selectedAnswerId: string;
  }[];
  score: number; // Percentage
  submittedAt: string;
}
