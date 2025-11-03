import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group">
      <Link to={`/courses/${course.id}`} className="block">
        <div className="relative">
          <img className="h-48 w-full object-cover" src={course.thumbnailUrl} alt={course.title} />
          <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
            {course.category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-800 truncate group-hover:text-primary transition-colors duration-300">{course.title}</h3>
          <p className="mt-2 text-slate-600 text-sm h-10 overflow-hidden text-ellipsis">{course.description}</p>
        </div>
        <div className="px-6 pt-2 pb-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">View Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;