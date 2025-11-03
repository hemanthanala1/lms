
import React from 'react';

const ContentCreatorDashboard: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-3xl font-bold text-gray-800">Content Studio</h2>
                 <button className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700">Create New Course</button>
            </div>
            <div className="text-center bg-white p-10 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-gray-800">Welcome to the Content Studio</h3>
                <p className="text-gray-500 mt-2">This is where you can create, edit, and manage your course content.</p>
                <p className="mt-4 text-gray-500">Feature coming soon!</p>
            </div>
        </div>
    );
};

export default ContentCreatorDashboard;
