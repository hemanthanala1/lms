import React from 'react';

const sampleCourses = [
	{ id: 1, title: 'React Basics', instructor: 'Bob', learners: 200 },
	{ id: 2, title: 'Advanced JavaScript', instructor: 'Alice', learners: 150 },
	{ id: 3, title: 'UI/UX Design', instructor: 'Diana', learners: 100 },
];

const Course = () => {
	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold text-slate-800 mb-6">Courses</h1>
			<div className="bg-white rounded-xl shadow-md p-6 mb-8">
				<h2 className="text-xl font-semibold text-slate-800 mb-4">Course List</h2>
				<table className="min-w-full divide-y divide-slate-200">
					<thead className="bg-slate-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Title</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Instructor</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Learners</th>
							<th className="px-6 py-3"></th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-slate-200">
						{sampleCourses.map(course => (
							<tr key={course.id}>
								<td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{course.title}</td>
								<td className="px-6 py-4 whitespace-nowrap text-slate-700">{course.instructor}</td>
								<td className="px-6 py-4 whitespace-nowrap text-slate-700">{course.learners}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition">Edit</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="bg-white rounded-xl shadow-md p-6">
				<h2 className="text-xl font-semibold text-slate-800 mb-4">Add New Course</h2>
				<form className="space-y-4">
					<input type="text" placeholder="Course Title" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
					<input type="text" placeholder="Instructor" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
					<button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">Create Course</button>
				</form>
			</div>
		</div>
	);
};

export default Course;