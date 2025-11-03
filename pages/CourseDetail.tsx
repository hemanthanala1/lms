import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Spinner from '../components/common/Spinner';
import { api } from '../services/mockApi';
import { Course, User, Announcement, Assignment, Submission, Role, Quiz, QuizAttempt, Question } from '../types';
import { useAuth } from '../hooks/useAuth';

type SubmissionWithStudent = Submission & { student: User };

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, role } = useAuth();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [instructor, setInstructor] = useState<User | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState('syllabus');

  // State for modals
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [showSubmitAssignment, setShowSubmitAssignment] = useState<Assignment | null>(null);

  // State for forms
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentDesc, setNewAssignmentDesc] = useState('');
  const [newAssignmentDueDate, setNewAssignmentDueDate] = useState('');
  const [submissionContent, setSubmissionContent] = useState('');
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);

  // State for instructor grading flow
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [currentAssignmentForGrading, setCurrentAssignmentForGrading] = useState<Assignment | null>(null);
  const [submissionsForGrading, setSubmissionsForGrading] = useState<SubmissionWithStudent[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  const [showGradingModal, setShowGradingModal] = useState(false);
  const [submissionToGrade, setSubmissionToGrade] = useState<SubmissionWithStudent | null>(null);
  const [gradeInput, setGradeInput] = useState<string>('');
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [isGrading, setIsGrading] = useState(false);
  const [gradingError, setGradingError] = useState<string | null>(null);

  // State for quiz flow
  const [takingQuiz, setTakingQuiz] = useState<Quiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [viewingResult, setViewingResult] = useState<QuizAttempt | null>(null);
  const [resultQuiz, setResultQuiz] = useState<Quiz | null>(null);


  const fetchCourseData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const courseData = await api.courses.getById(id);
      if (courseData) {
        setCourse(courseData);
        const instructorData = await api.users.getById(courseData.instructorId);
        setInstructor(instructorData || null);
        const announcementsData = await api.announcements.getByCourseId(id);
        setAnnouncements(announcementsData);
        const assignmentsData = await api.assignments.getByCourseId(id);
        setAssignments(assignmentsData);
        const quizzesData = await api.quizzes.getByCourseId(id);
        setQuizzes(quizzesData);

        if (user && user.role === Role.STUDENT) {
          const submissionsData = await api.submissions.getForStudentInCourse(user.id, id);
          setSubmissions(submissionsData);
          const quizAttemptsData = await api.quizzes.getAttemptsForStudent(user.id, id);
          setQuizAttempts(quizAttemptsData);
        }

      } else {
        navigate('/404');
      }
    } catch (error) {
      console.error("Failed to fetch course details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [id, navigate, user]);

  const handleEnroll = async () => {
      if (!isAuthenticated || !user) {
          navigate('/login', {state: {from: window.location.hash.substring(1)}});
          return;
      }
      if (!course) return;
      setEnrolling(true);
      try {
          await api.enrollments.enroll(user.id, course.id);
          alert('Successfully enrolled!');
          navigate('/dashboard/student');
      } catch (error) {
          console.error('Enrollment failed', error);
          alert('Failed to enroll in the course.');
      } finally {
          setEnrolling(false);
      }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !newAssignmentTitle || !newAssignmentDueDate) return;
    try {
        await api.assignments.create({
            courseId: course.id,
            title: newAssignmentTitle,
            description: newAssignmentDesc,
            dueDate: new Date(newAssignmentDueDate).toISOString()
        });
        setShowCreateAssignment(false);
        setNewAssignmentTitle('');
        setNewAssignmentDesc('');
        setNewAssignmentDueDate('');
        fetchCourseData();
    } catch (error) {
        console.error("Failed to create assignment", error);
        alert("Failed to create assignment.");
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setSubmissionFile(e.target.files[0]);
    } else {
        setSubmissionFile(null);
    }
  };

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !showSubmitAssignment) return;
    if (!submissionContent && !submissionFile) {
        alert("Please provide a text submission or upload a file.");
        return;
    }
    try {
        await api.submissions.submit({
            assignmentId: showSubmitAssignment.id,
            studentId: user.id,
            content: submissionContent,
            fileName: submissionFile?.name
        });
        closeSubmitModal();
        fetchCourseData();
    } catch(error) {
        console.error("Failed to submit assignment", error);
        alert("Failed to submit assignment.");
    }
  }
  
  const handleViewSubmissions = async (assignment: Assignment) => {
    setCurrentAssignmentForGrading(assignment);
    setShowSubmissionsModal(true);
    setLoadingSubmissions(true);
    try {
      const subs = await api.submissions.getForAssignment(assignment.id);
      const subsWithStudents: SubmissionWithStudent[] = await Promise.all(
        subs.map(async (sub) => {
          const student = await api.users.getById(sub.studentId);
          return { ...sub, student: student! };
        })
      );
      setSubmissionsForGrading(subsWithStudents.filter(s => s.student));
    } catch (error) {
      console.error("Failed to fetch submissions for grading", error);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const openGradingModal = (submission: SubmissionWithStudent) => {
    setSubmissionToGrade(submission);
    setGradeInput(submission.grade?.toString() || '');
    setFeedbackInput(submission.feedback || '');
    setGradingError(null);
    setShowGradingModal(true);
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionToGrade || gradeInput === '' || isGrading) return;

    setGradingError(null);
    const grade = parseInt(gradeInput, 10);
    if (isNaN(grade) || grade < 0 || grade > 100) {
        setGradingError("Please enter a valid grade between 0 and 100.");
        return;
    }

    setIsGrading(true);
    try {
        await api.submissions.grade(submissionToGrade.id, grade, feedbackInput);
        setShowGradingModal(false);
        setSubmissionToGrade(null);
        if (currentAssignmentForGrading) {
            handleViewSubmissions(currentAssignmentForGrading);
        }
        if(user?.id === submissionToGrade.studentId) {
            fetchCourseData();
        }
    } catch (error) {
        console.error("Failed to save grade", error);
        setGradingError("Failed to save grade. Please try again.");
    } finally {
        setIsGrading(false);
    }
  };

  const openSubmitModal = (assignment: Assignment) => {
    const submission = submissions.find(s => s.assignmentId === assignment.id);
    setSubmissionContent(submission?.content || '');
    setSubmissionFile(null);
    setShowSubmitAssignment(assignment);
  };

  const closeSubmitModal = () => {
    setShowSubmitAssignment(null);
    setSubmissionContent('');
    setSubmissionFile(null);
  };

  const getSubmissionStatus = (assignmentId: string) => {
      const submission = submissions.find(s => s.assignmentId === assignmentId);
      if (!submission) return { text: 'Not Submitted', color: 'bg-red-100 text-red-800' };
      if (submission.grade !== null) return { text: `Graded: ${submission.grade}%`, color: 'bg-blue-100 text-blue-800' };
      return { text: 'Submitted', color: 'bg-green-100 text-green-800' };
  }

  // Quiz handlers
  const handleStartQuiz = (quiz: Quiz) => {
    setQuizAnswers({});
    setTakingQuiz(quiz);
  };

  const handleQuizAnswerChange = (questionId: string, answerId: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleViewQuizResults = async (attempt: QuizAttempt) => {
      const quizData = await api.quizzes.getById(attempt.quizId);
      if (quizData) {
          setResultQuiz(quizData);
          setViewingResult(attempt);
      }
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!takingQuiz || !user) return;
      
      const answersToSubmit = takingQuiz.questions.map(q => ({
          questionId: q.id,
          selectedAnswerId: quizAnswers[q.id] || '',
      }));

      setIsSubmittingQuiz(true);
      try {
        const newAttempt = await api.quizzes.submitAttempt(takingQuiz.id, user.id, answersToSubmit);
        await fetchCourseData();
        setTakingQuiz(null);
        handleViewQuizResults(newAttempt);
      } catch (error) {
        console.error("Failed to submit quiz", error);
        alert("There was an error submitting your quiz. Please try again.");
      } finally {
        setIsSubmittingQuiz(false);
      }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen"><Spinner /></div>
    );
  }

  if (!course) {
    return (
      <div>Course not found.</div>
    );
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

  const TabButton: React.FC<{tabName: string; children: React.ReactNode}> = ({tabName, children}) => (
    <button 
      onClick={() => setActiveTab(tabName)} 
      className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${activeTab === tabName ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />
      <main className="flex-grow">
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <p className="text-primary font-semibold uppercase tracking-wider text-sm">{course.category}</p>
                <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 text-slate-900">{course.title}</h1>
                <p className="mt-4 max-w-3xl text-slate-600 text-lg">{course.description}</p>
                {instructor && <p className="mt-4 flex items-center gap-2"><img src={instructor.avatarUrl} className="h-6 w-6 rounded-full" alt={instructor.name} /> Created by <span className="font-semibold text-slate-800">{instructor.name}</span></p>}
            </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-slate-200/60 p-1.5 rounded-xl inline-flex space-x-1 mb-6">
                <TabButton tabName="syllabus">Syllabus</TabButton>
                <TabButton tabName="announcements">Announcements</TabButton>
                <TabButton tabName="assignments">Assignments</TabButton>
                <TabButton tabName="quizzes">Quizzes</TabButton>
              </div>

              {activeTab === 'syllabus' && (
                <div className="space-y-6">
                  {course.modules.map(module => (
                    <div key={module.id} className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="text-xl font-semibold text-slate-800">{module.title}</h3>
                      <ul className="mt-4 space-y-3">
                        {module.lessons.map(lesson => (
                          <li key={lesson.id} className="flex items-center text-slate-600 p-2 rounded-md hover:bg-slate-50">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                              <span>{lesson.title}</span>
                              <span className="ml-auto text-sm text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-full">{lesson.durationMinutes} min</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'announcements' && (
                <div className="space-y-4">
                  {announcements.length > 0 ? announcements.map(ann => (
                    <div key={ann.id} className="bg-white p-5 rounded-xl shadow-md">
                        <p className="text-slate-700">{ann.content}</p>
                        <p className="text-xs text-slate-500 mt-3 text-right">
                          Posted on {new Date(ann.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                  )) : <p className="text-slate-500">No announcements for this course yet.</p>}
                </div>
              )}
              {activeTab === 'assignments' && (
                  <div>
                    {role === Role.INSTRUCTOR && course.instructorId === user?.id && (
                        <div className="text-right mb-4">
                            <button onClick={() => setShowCreateAssignment(true)} className="bg-primary text-white font-semibold px-5 py-2 rounded-lg hover:bg-primary-dark shadow-sm hover:shadow-md transition-all">Create New Assignment</button>
                        </div>
                    )}
                    <div className="space-y-4">
                        {assignments.length > 0 ? assignments.map(assignment => {
                            const submission = submissions.find(s => s.assignmentId === assignment.id);
                            const status = getSubmissionStatus(assignment.id);
                            return (
                                <div key={assignment.id} className="bg-white p-5 rounded-xl shadow-md">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800">{assignment.title}</h3>
                                            <p className="text-sm text-slate-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                        </div>
                                        {role === Role.STUDENT && (
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                                                {status.text}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-2 text-slate-700">{assignment.description}</p>
                                     {role === Role.STUDENT && submission && (
                                        <>
                                        <div className="mt-3 bg-slate-50 p-3 rounded-md border border-slate-200">
                                            <h4 className="text-sm font-semibold text-slate-600">Your Submission:</h4>
                                            {submission.content && <p className="text-sm text-slate-800 truncate mt-1"><strong>Text:</strong> {submission.content}</p>}
                                            {submission.fileName && <p className="text-sm text-slate-800 mt-1"><strong>File:</strong> {submission.fileName}</p>}
                                        </div>
                                        {submission.feedback && (
                                            <div className="mt-3 bg-primary/10 p-3 rounded-md border border-primary/20">
                                                <h4 className="text-sm font-semibold text-primary/80">Instructor Feedback:</h4>
                                                <p className="text-sm text-slate-800 mt-1 whitespace-pre-wrap">{submission.feedback}</p>
                                            </div>
                                        )}
                                        </>
                                    )}
                                    {role === Role.STUDENT && (
                                        <div className="text-right mt-4">
                                            <button onClick={() => openSubmitModal(assignment)} className="bg-primary/10 text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/20 text-sm">
                                                {submission ? 'View / Edit Submission' : 'Submit Assignment'}
                                            </button>
                                        </div>
                                    )}
                                    {role === Role.INSTRUCTOR && course.instructorId === user?.id && (
                                        <div className="text-right mt-4">
                                            <button onClick={() => handleViewSubmissions(assignment)} className="bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg hover:bg-slate-300 text-sm">
                                                View Submissions
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )
                        }) : <p className="text-slate-500">No assignments for this course yet.</p>}
                    </div>
                  </div>
              )}
               {activeTab === 'quizzes' && (
                  <div className="space-y-4">
                    {quizzes.length > 0 ? quizzes.map(quiz => {
                        const attempt = quizAttempts.find(qa => qa.quizId === quiz.id);
                        return (
                           <div key={quiz.id} className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center">
                               <div>
                                   <h3 className="text-lg font-semibold text-slate-800">{quiz.title}</h3>
                                   <p className="text-sm text-slate-500">{quiz.questions.length} questions</p>
                               </div>
                                {role === Role.STUDENT && (
                                   <div>
                                    {attempt ? (
                                        <div className="text-right">
                                            <p className="font-semibold text-blue-600">Score: {attempt.score}%</p>
                                            <button onClick={() => handleViewQuizResults(attempt)} className="text-primary hover:underline text-sm font-semibold">View Results</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => handleStartQuiz(quiz)} className="bg-primary text-white font-semibold px-5 py-2 rounded-lg hover:bg-primary-dark shadow-sm hover:shadow-md transition-all text-sm">
                                           Start Quiz
                                        </button>
                                    )}
                                   </div>
                                )}
                           </div>
                        )
                    }) : <p className="text-slate-500">No quizzes for this course yet.</p>}
                  </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
                  <img src={course.thumbnailUrl} alt={course.title} className="w-full rounded-lg mb-4"/>
                  <button onClick={handleEnroll} disabled={enrolling} className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 disabled:bg-primary/70 shadow-md hover:shadow-lg">
                      {enrolling ? 'Enrolling...' : 'Enroll in this course'}
                  </button>
                  <div className="mt-6 text-sm text-slate-600 space-y-3">
                      <p><strong>{course.modules.length}</strong> modules</p>
                      <p><strong>{totalLessons}</strong> lessons</p>
                      <p><strong>{assignments.length}</strong> assignments</p>
                      <p><strong>{quizzes.length}</strong> quizzes</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Create Assignment Modal */}
      {showCreateAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-slate-800">Create New Assignment</h2>
                <form onSubmit={handleCreateAssignment} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                        <input type="text" id="title" value={newAssignmentTitle} onChange={e => setNewAssignmentTitle(e.target.value)} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                        <textarea id="description" value={newAssignmentDesc} onChange={e => setNewAssignmentDesc(e.target.value)} rows={4} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700">Due Date</label>
                        <input type="date" id="dueDate" value={newAssignmentDueDate} onChange={e => setNewAssignmentDueDate(e.target.value)} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={() => setShowCreateAssignment(false)} className="bg-slate-200 text-slate-800 font-semibold px-4 py-2 rounded-md hover:bg-slate-300">Cancel</button>
                        <button type="submit" className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-dark">Create</button>
                    </div>
                </form>
            </div>
        </div>
      )}

       {/* Submit Assignment Modal */}
       {showSubmitAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold mb-2 text-slate-800">Submit Assignment</h2>
                <p className="text-slate-700 mb-4 font-semibold">{showSubmitAssignment.title}</p>
                <form onSubmit={handleSubmitAssignment} className="space-y-4">
                    <div>
                        <label htmlFor="submission" className="block text-sm font-medium text-slate-700">Comments / Text Submission</label>
                        <p className="text-xs text-slate-500 mb-2">Provide any comments, text, or a link to your work (e.g., Google Doc, GitHub, CodePen).</p>
                        <textarea id="submission" value={submissionContent} onChange={e => setSubmissionContent(e.target.value)} rows={5} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">File Upload</label>
                         {submissions.find(s => s.assignmentId === showSubmitAssignment.id)?.fileName && !submissionFile && (
                            <div className="mt-2 p-2 bg-slate-100 rounded-md text-sm text-slate-800 flex justify-between items-center">
                                <span>Previously submitted: {submissions.find(s => s.assignmentId === showSubmitAssignment.id)?.fileName}</span>
                            </div>
                        )}
                        {submissionFile ? (
                             <div className="mt-2 p-2 bg-primary/10 rounded-md text-sm text-primary/80 flex justify-between items-center">
                                <span>{submissionFile.name}</span>
                                <button type="button" onClick={() => setSubmissionFile(null)} className="text-xl font-bold text-red-600 hover:text-red-800">&times;</button>
                            </div>
                        ) : (
                            <div className="mt-2 flex items-center justify-center w-full">
                                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>
                                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div> 
                        )}
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={closeSubmitModal} className="bg-slate-200 text-slate-800 font-semibold px-4 py-2 rounded-md hover:bg-slate-300">Cancel</button>
                        <button type="submit" className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-dark">Submit</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* Submissions List Modal (for Instructor) */}
      {showSubmissionsModal && currentAssignmentForGrading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-full overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-slate-800">Submissions for "{currentAssignmentForGrading.title}"</h2>
                      <button onClick={() => setShowSubmissionsModal(false)} className="text-slate-500 hover:text-slate-800 text-2xl">&times;</button>
                  </div>
                  {loadingSubmissions ? <Spinner /> : (
                      <div className="space-y-4">
                          {submissionsForGrading.length > 0 ? submissionsForGrading.map(sub => (
                              <div key={sub.id} className="p-4 border rounded-md flex justify-between items-center hover:bg-slate-50">
                                  <div>
                                      <p className="font-semibold text-slate-800">{sub.student.name}</p>
                                      <p className="text-sm text-slate-600">Submitted on: {new Date(sub.submittedAt).toLocaleString()}</p>
                                      {sub.grade !== null ? (
                                          <p className="text-sm font-bold text-blue-600">Graded: {sub.grade}/100</p>
                                      ) : (
                                          <p className="text-sm text-red-600">Not Graded</p>
                                      )}
                                  </div>
                                  <button onClick={() => openGradingModal(sub)} className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-dark text-sm">
                                      {sub.grade !== null ? 'Edit Grade' : 'Grade'}
                                  </button>
                              </div>
                          )) : <p className="text-slate-500">No submissions for this assignment yet.</p>}
                      </div>
                  )}
              </div>
          </div>
      )}

      {/* Grading Modal (for Instructor) */}
      {showGradingModal && submissionToGrade && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-8 w-full max-w-lg max-h-full overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-2 text-slate-800">Grade Submission</h2>
                  <p className="font-semibold text-slate-800">Student: {submissionToGrade.student.name}</p>
                  <div className="mt-4 bg-slate-50 p-3 rounded-md border">
                      <h4 className="text-sm font-semibold text-slate-600">Submission Details:</h4>
                      {submissionToGrade.content && <p className="text-sm text-slate-800 mt-1 whitespace-pre-wrap"><strong>Text:</strong> {submissionToGrade.content}</p>}
                      {submissionToGrade.fileName && <p className="text-sm text-slate-800 mt-1"><strong>File:</strong> <span className="text-primary underline">{submissionToGrade.fileName}</span></p>}
                  </div>

                  <form onSubmit={handleSaveGrade} className="mt-6 space-y-4">
                      <div>
                          <label htmlFor="grade" className="block text-sm font-medium text-slate-700">Grade (0-100)</label>
                          <input 
                            type="number" 
                            id="grade" 
                            value={gradeInput} 
                            onChange={e => setGradeInput(e.target.value)} 
                            min="0" 
                            max="100" 
                            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary ${gradingError ? 'border-red-500' : 'border-slate-300'}`}
                            required 
                          />
                          {gradingError && <p className="mt-2 text-sm text-red-600">{gradingError}</p>}
                      </div>
                      <div>
                          <label htmlFor="feedback" className="block text-sm font-medium text-slate-700">Feedback</label>
                          <textarea id="feedback" value={feedbackInput} onChange={e => setFeedbackInput(e.target.value)} rows={5} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                      </div>
                      <div className="flex justify-end gap-4 pt-4">
                          <button type="button" onClick={() => setShowGradingModal(false)} className="bg-slate-200 text-slate-800 font-semibold px-4 py-2 rounded-md hover:bg-slate-300">Cancel</button>
                          <button 
                            type="submit" 
                            disabled={isGrading}
                            className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-dark disabled:bg-primary/70 disabled:cursor-not-allowed flex items-center justify-center w-32"
                          >
                            {isGrading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Save Grade'
                            )}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Quiz Taker Modal */}
      {takingQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 flex-shrink-0">{takingQuiz.title}</h2>
            <form onSubmit={handleQuizSubmit} className="space-y-6 overflow-y-auto flex-grow">
              {takingQuiz.questions.map((q, index) => (
                <div key={q.id} className="p-4 border rounded-md">
                  <p className="font-semibold text-slate-800">{index + 1}. {q.questionText}</p>
                  <div className="mt-3 space-y-2">
                    {q.options.map(opt => (
                      <label key={opt.id} className="flex items-center p-2 rounded-md hover:bg-slate-100 cursor-pointer">
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.id}
                          checked={quizAnswers[q.id] === opt.id}
                          onChange={() => handleQuizAnswerChange(q.id, opt.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-slate-300"
                        />
                        <span className="ml-3 text-slate-700">{opt.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </form>
            <div className="flex justify-end gap-4 pt-6 flex-shrink-0">
              <button type="button" onClick={() => setTakingQuiz(null)} className="bg-slate-200 text-slate-800 font-semibold px-4 py-2 rounded-md hover:bg-slate-300">Cancel</button>
              <button onClick={handleQuizSubmit} disabled={isSubmittingQuiz} className="bg-primary text-white font-semibold px-6 py-2 rounded-md hover:bg-primary-dark w-40 flex items-center justify-center">
                {isSubmittingQuiz ? <Spinner /> : 'Submit Quiz'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Quiz Result Modal */}
      {viewingResult && resultQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] flex flex-col">
             <div className="flex justify-between items-start mb-4 flex-shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Quiz Results</h2>
                    <h3 className="text-lg font-semibold text-slate-600">{resultQuiz.title}</h3>
                </div>
                <button onClick={() => setViewingResult(null)} className="text-slate-500 hover:text-slate-800 text-3xl font-bold">&times;</button>
            </div>
            <div className="text-center bg-slate-50 p-4 rounded-lg mb-6 flex-shrink-0">
                <p className="text-slate-600 text-lg">Your Score</p>
                <p className="text-5xl font-bold text-primary">{viewingResult.score}%</p>
            </div>
            <div className="space-y-4 overflow-y-auto flex-grow">
                {resultQuiz.questions.map((q, index) => {
                    const studentAnswerId = viewingResult.answers.find(a => a.questionId === q.id)?.selectedAnswerId;
                    const isCorrect = studentAnswerId === q.correctAnswerId;
                    return (
                        <div key={q.id} className="p-4 border-l-4 rounded-md bg-slate-50" style={{borderColor: isCorrect ? '#22c55e' : '#ef4444'}}>
                           <p className="font-semibold text-slate-800">{index + 1}. {q.questionText}</p>
                           <div className="mt-3 space-y-2">
                            {q.options.map(opt => {
                                const isSelected = studentAnswerId === opt.id;
                                const isCorrectAnswer = q.correctAnswerId === opt.id;
                                let optionStyle = 'text-slate-700';
                                if (isCorrectAnswer) optionStyle = 'text-green-600 font-semibold';
                                if (isSelected && !isCorrectAnswer) optionStyle = 'text-red-600 line-through';
                                
                                return (
                                    <div key={opt.id} className="flex items-center">
                                        {isCorrectAnswer && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                        {isSelected && !isCorrectAnswer && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>}
                                        {!isCorrectAnswer && !isSelected && <div className="w-5 mr-2"></div>}
                                        <span className={optionStyle}>{opt.text}</span>
                                    </div>
                                );
                            })}
                           </div>
                        </div>
                    )
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
