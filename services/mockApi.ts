import { User, Course, Enrollment, Role, Module, Lesson, Announcement, Assignment, Submission, Quiz, QuizAttempt, Question } from '../types';

// Mock Data
let users: User[] = [
  { id: 'user_1', name: 'Alice Johnson', email: 'alice@example.com', role: Role.STUDENT, avatarUrl: 'https://picsum.photos/seed/alice/100' },
  { id: 'user_2', name: 'Bob Williams', email: 'bob@example.com', role: Role.INSTRUCTOR, avatarUrl: 'https://picsum.photos/seed/bob/100' },
  { id: 'user_3', name: 'Charlie Brown', email: 'charlie@example.com', role: Role.ADMIN, avatarUrl: 'https://picsum.photos/seed/charlie/100' },
  { id: 'user_4', name: 'Diana Prince', email: 'diana@example.com', role: Role.CONTENT_CREATOR, avatarUrl: 'https://picsum.photos/seed/diana/100' },
];

const lessons: Lesson[] = [
    { id: 'l_1_1', title: 'Introduction to HTML', contentType: 'video', content: 'sample.mp4', durationMinutes: 15 },
    { id: 'l_1_2', title: 'HTML Tags', contentType: 'text', content: 'This is a text about HTML tags.', durationMinutes: 10 },
    { id: 'l_2_1', title: 'React Components', contentType: 'video', content: 'sample.mp4', durationMinutes: 25 },
    { id: 'l_2_2', title: 'State and Props', contentType: 'pdf', content: 'sample.pdf', durationMinutes: 20 },
    { id: 'l_3_1', title: 'Getting Started with Python', contentType: 'video', content: 'sample.mp4', durationMinutes: 18 },
];

const modules: Module[] = [
    { id: 'm_1', title: 'Module 1: The Basics of Web', lessons: [lessons[0], lessons[1]] },
    { id: 'm_2', title: 'Module 2: Advanced React', lessons: [lessons[2], lessons[3]] },
    { id: 'm_3', title: 'Module 1: Python Fundamentals', lessons: [lessons[4]] },
];

let courses: Course[] = [
  { id: 'course_1', title: 'Introduction to Web Development', description: 'Learn the fundamentals of HTML, CSS, and JavaScript.', instructorId: 'user_2', category: 'Web Development', thumbnailUrl: 'https://picsum.photos/seed/webdev/400/225', modules: [modules[0]] },
  { id: 'course_2', title: 'Advanced React Development', description: 'Dive deep into React hooks, context, and performance.', instructorId: 'user_2', category: 'Web Development', thumbnailUrl: 'https://picsum.photos/seed/react/400/225', modules: [modules[1]] },
  { id: 'course_3', title: 'Python for Data Science', description: 'Master Python for data analysis and visualization.', instructorId: 'user_2', category: 'Data Science', thumbnailUrl: 'https://picsum.photos/seed/python/400/225', modules: [modules[2]] },
];

let enrollments: Enrollment[] = [
  { userId: 'user_1', courseId: 'course_1', progress: 50, completedLessons: ['l_1_1'] },
  { userId: 'user_1', courseId: 'course_3', progress: 0, completedLessons: [] },
];

let announcements: Announcement[] = [
    { id: 'ann_1', courseId: 'course_1', authorId: 'user_2', content: 'Welcome to the course! The first assignment is due next Friday.', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'ann_2', courseId: 'course_1', authorId: 'user_2', content: 'Office hours will be held on Tuesdays at 2 PM.', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
]

let assignments: Assignment[] = [
    { id: 'assign_1', courseId: 'course_1', title: 'HTML Structure Basics', description: 'Create a simple HTML page with a header, body, and footer that includes at least 5 different HTML tags.', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'assign_2', courseId: 'course_1', title: 'CSS Styling Challenge', description: 'Style the HTML page from the previous assignment using CSS. Add colors, fonts, and layout adjustments. Be creative!', dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() },
];

let submissions: Submission[] = [
    { id: 'sub_1', assignmentId: 'assign_1', studentId: 'user_1', submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), grade: 95, content: 'Here is the link to my HTML page on CodePen: https://codepen.io/...', feedback: 'Excellent work on the basic structure. Next time, try exploring more semantic HTML5 tags like <main>, <nav>, and <article>.' }
];

const webDevQuizQuestions: Question[] = [
    {
        id: 'q_1',
        questionText: 'What does HTML stand for?',
        options: [
            { id: 'q_1_a_1', text: 'Hyper Trainer Marking Language' },
            { id: 'q_1_a_2', text: 'Hyper Text Marketing Language' },
            { id: 'q_1_a_3', text: 'Hyper Text Markup Language' },
            { id: 'q_1_a_4', text: 'Hyperlink and Text Markup Language' },
        ],
        correctAnswerId: 'q_1_a_3',
    },
    {
        id: 'q_2',
        questionText: 'Which CSS property is used to change the background color?',
        options: [
            { id: 'q_2_a_1', text: 'color' },
            { id: 'q_2_a_2', text: 'background-color' },
            { id: 'q_2_a_3', text: 'bgcolor' },
            { id: 'q_2_a_4', text: 'background' },
        ],
        correctAnswerId: 'q_2_a_2',
    },
     {
        id: 'q_3',
        questionText: 'Which tag is used to define an unordered list?',
        options: [
            { id: 'q_3_a_1', text: '<ol>' },
            { id: 'q_3_a_2', text: '<li>' },
            { id: 'q_3_a_3', text: '<list>' },
            { id: 'q_3_a_4', text: '<ul>' },
        ],
        correctAnswerId: 'q_3_a_4',
    }
];

let quizzes: Quiz[] = [
    { id: 'quiz_1', courseId: 'course_1', title: 'Web Development Basics Quiz', questions: webDevQuizQuestions },
];

let quizAttempts: QuizAttempt[] = [];


// Mock API Functions
const delay = <T,>(data: T, ms = 500): Promise<T> => new Promise(resolve => setTimeout(() => resolve(data), ms));

export const api = {
  auth: {
    login: async (username: string, password: string, role: Role): Promise<{ token: string; user: User } | null> => {
      // For demo purposes, accept any password that's at least 6 characters
      if (!username || !password || password.length < 6) {
        return delay(null);
      }
      
      const user = users.find(u => 
        (u.email.toLowerCase() === username.toLowerCase() || 
         u.name.toLowerCase() === username.toLowerCase())
      );

      // First check if we found a user with matching username/email
      if (!user) {
        return delay(null);
      }

      // Then check if the role matches
      if (user.role !== role) {
        return delay(null);
      }
      
      const token = `mock-token-for-${user.id}`;
      return delay({ token, user });
    },
  },
  users: {
    getById: async (id: string): Promise<User | undefined> => {
        return delay(users.find(u => u.id === id));
    },
    getAll: async (): Promise<User[]> => {
        return delay(users);
    }
  },
  courses: {
    list: async (): Promise<Course[]> => delay(courses),
    getById: async (id: string): Promise<Course | undefined> => delay(courses.find(c => c.id === id)),
  },
  enrollments: {
    listForUser: async (userId: string): Promise<Enrollment[]> => delay(enrollments.filter(e => e.userId === userId)),
    enroll: async (userId: string, courseId: string): Promise<Enrollment> => {
      let enrollment = enrollments.find(e => e.userId === userId && e.courseId === courseId);
      if (!enrollment) {
        enrollment = { userId, courseId, progress: 0, completedLessons: [] };
        enrollments.push(enrollment);
      }
      return delay(enrollment);
    },
  },
  announcements: {
    getByCourseId: async (courseId: string): Promise<Announcement[]> => {
        return delay(announcements.filter(a => a.courseId === courseId).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  },
  assignments: {
      getByCourseId: async (courseId: string): Promise<Assignment[]> => {
          return delay(assignments.filter(a => a.courseId === courseId).sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
      },
      create: async (data: Omit<Assignment, 'id'>): Promise<Assignment> => {
          const newAssignment: Assignment = { ...data, id: `assign_${Date.now()}` };
          assignments.push(newAssignment);
          return delay(newAssignment);
      }
  },
  submissions: {
      getForStudentInCourse: async (studentId: string, courseId: string): Promise<Submission[]> => {
          const courseAssignments = assignments.filter(a => a.courseId === courseId).map(a => a.id);
          const studentSubmissions = submissions.filter(s => s.studentId === studentId && courseAssignments.includes(s.assignmentId));
          return delay(studentSubmissions);
      },
      submit: async (data: Omit<Submission, 'id' | 'submittedAt' | 'grade'>): Promise<Submission> => {
          const existingSubmissionIndex = submissions.findIndex(s => s.assignmentId === data.assignmentId && s.studentId === data.studentId);
          if (existingSubmissionIndex > -1) {
              const updatedSubmission = { ...submissions[existingSubmissionIndex], ...data, submittedAt: new Date().toISOString() };
              submissions[existingSubmissionIndex] = updatedSubmission;
              return delay(updatedSubmission);
          } else {
              const newSubmission: Submission = { ...data, id: `sub_${Date.now()}`, submittedAt: new Date().toISOString(), grade: null };
              submissions.push(newSubmission);
              return delay(newSubmission);
          }
      },
      getForAssignment: async (assignmentId: string): Promise<Submission[]> => {
          return delay(submissions.filter(s => s.assignmentId === assignmentId));
      },
      grade: async (submissionId: string, grade: number, feedback: string): Promise<Submission> => {
          const submissionIndex = submissions.findIndex(s => s.id === submissionId);
          if (submissionIndex === -1) {
              throw new Error("Submission not found");
          }
          const updatedSubmission = {
              ...submissions[submissionIndex],
              grade,
              feedback,
          };
          submissions[submissionIndex] = updatedSubmission;
          return delay(updatedSubmission);
      },
  },
  quizzes: {
      getByCourseId: async (courseId: string): Promise<Quiz[]> => {
          return delay(quizzes.filter(q => q.courseId === courseId));
      },
      getById: async (quizId: string): Promise<Quiz | undefined> => {
          return delay(quizzes.find(q => q.id === quizId));
      },
      getAttemptsForStudent: async (studentId: string, courseId: string): Promise<QuizAttempt[]> => {
          const courseQuizzes = quizzes.filter(q => q.courseId === courseId).map(q => q.id);
          return delay(quizAttempts.filter(qa => qa.studentId === studentId && courseQuizzes.includes(qa.quizId)));
      },
      getAttemptById: async (attemptId: string): Promise<QuizAttempt | undefined> => {
          return delay(quizAttempts.find(qa => qa.id === attemptId));
      },
      submitAttempt: async (quizId: string, studentId: string, answers: { questionId: string; selectedAnswerId: string }[]): Promise<QuizAttempt> => {
          const quiz = quizzes.find(q => q.id === quizId);
          if (!quiz) {
              throw new Error("Quiz not found");
          }

          let correctAnswers = 0;
          for (const answer of answers) {
              const question = quiz.questions.find(q => q.id === answer.questionId);
              if (question && question.correctAnswerId === answer.selectedAnswerId) {
                  correctAnswers++;
              }
          }

          const score = Math.round((correctAnswers / quiz.questions.length) * 100);

          const newAttempt: QuizAttempt = {
              id: `qa_${Date.now()}`,
              quizId,
              studentId,
              answers,
              score,
              submittedAt: new Date().toISOString(),
          };

          // Remove previous attempt for simplicity, allowing retakes
          const existingAttemptIndex = quizAttempts.findIndex(qa => qa.quizId === quizId && qa.studentId === studentId);
          if (existingAttemptIndex > -1) {
              quizAttempts.splice(existingAttemptIndex, 1);
          }

          quizAttempts.push(newAttempt);
          return delay(newAttempt);
      }
  }
};
