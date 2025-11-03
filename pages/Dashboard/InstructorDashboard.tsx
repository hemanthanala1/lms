import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/mockApi';
import { Course } from '../../types';
import Spinner from '../../components/common/Spinner';
import CourseCard from '../../components/common/CourseCard';

const InstructorDashboard: React.FC = () => {
    const { user } = useAuth();
    const [myCourses, setMyCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!user) return;
            try {
                const allCourses = await api.courses.list();
                setMyCourses(allCourses.filter(c => c.instructorId === user.id));
            } catch (error) {
                console.error("Failed to fetch instructor courses", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [user]);

    if (loading) {
        return <div className="flex justify-center items-center h-full"><Spinner /></div>;
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">My Courses</h1>
                    <p className="text-slate-600 mt-1">Manage your courses and view student progress.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-sm hover:shadow-md">
                   <PlusIcon />
                   <span>Add New Course</span>
                </button>
            </div>
            {myCourses.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myCourses.map(course => (
                       <CourseCard key={course.id} course={course} />
                    ))}
                 </div>
            ) : (
                <div className="text-center bg-white p-10 rounded-xl shadow-md">
                    <h3 className="text-xl font-medium text-slate-800">You haven't created any courses yet.</h3>
                    <p className="text-slate-500 mt-2">Ready to share your knowledge? Let's create your first course!</p>
                     <button className="mt-6 flex items-center justify-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-sm hover:shadow-md mx-auto">
                        <PlusIcon />
                        <span>Create Your First Course</span>
                    </button>
                </div>
            )}
        </div>
    );
};

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);


export default InstructorDashboard;