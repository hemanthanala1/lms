import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/mockApi';
import { Course, Enrollment, User } from '../../types';
import Spinner from '../../components/common/Spinner';
import { Link } from 'react-router-dom';

type EnrolledCourse = Course & { 
  progress: number;
  instructor: User | null;
  lessonsCount: number;
};

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!user) return;
      try {
        const enrollments: Enrollment[] = await api.enrollments.listForUser(user.id);
        const allCourses: Course[] = await api.courses.list();
        const allUsers: User[] = await api.users.getAll();
        
        const coursesWithDetails = enrollments.map(enrollment => {
          const courseDetails = allCourses.find(c => c.id === enrollment.courseId);
          if (!courseDetails) return null;

          const instructor = allUsers.find(u => u.id === courseDetails.instructorId) || null;
          const lessonsCount = courseDetails.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
          
          return { 
            ...courseDetails, 
            progress: enrollment.progress,
            instructor,
            lessonsCount,
          };
        }).filter((c): c is EnrolledCourse => c !== null);

        setEnrolledCourses(coursesWithDetails);
      } catch (error) {
        console.error("Failed to fetch student data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }
  
  const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-slate-600">Progress</span>
            <span className="text-sm font-medium text-primary">{progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">Welcome, {user?.name.split(' ')[0]}!</h1>
      <p className="text-slate-600 mt-1">Let's continue your learning journey.</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Enrolled Courses</h2>
        {enrolledCourses.length > 0 ? (
          <div className="bg-white rounded-xl shadow-md">
            <ul className="divide-y divide-slate-200">
              {enrolledCourses.map(course => (
                <li key={course.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                     <img className="h-24 w-32 object-cover rounded-lg flex-shrink-0" src={course.thumbnailUrl} alt={course.title} />
                     <div className="flex-grow">
                        <Link to={`/courses/${course.id}`} className="hover:underline">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary">{course.title}</h3>
                        </Link>
                        {course.instructor && <p className="text-sm text-slate-500 mt-1">by {course.instructor.name}</p>}
                         <div className="flex items-center gap-4 text-sm text-slate-600 mt-3">
                          <span>{course.lessonsCount} Lessons</span>
                        </div>
                     </div>
                     <div className="w-full md:w-48">
                        <ProgressBar progress={course.progress} />
                     </div>
                     <div className="flex-shrink-0">
                        <Link to={`/courses/${course.id}`} className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors duration-300 text-sm shadow-sm hover:shadow-md">
                          Continue Learning
                        </Link>
                     </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center bg-white p-10 rounded-xl shadow-md">
            <h3 className="text-xl font-medium text-slate-800">You are not enrolled in any courses yet.</h3>
            <p className="text-slate-500 mt-2">Why not start your learning journey today?</p>
            <Link to="/courses" className="mt-6 inline-block bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300">
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;