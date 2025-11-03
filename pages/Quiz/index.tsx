import React from 'react';

const sampleQuizzes = [
	{ id: 1, title: 'React Basics Quiz', course: 'React Basics', questions: 10 },
	{ id: 2, title: 'JS Advanced Quiz', course: 'Advanced JavaScript', questions: 15 },
];

const Quiz = () => {
	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold text-slate-800 mb-6">Quizzes</h1>
			<div className="bg-white rounded-xl shadow-md p-6 mb-8">
				<h2 className="text-xl font-semibold text-slate-800 mb-4">Quiz List</h2>
				<table className="min-w-full divide-y divide-slate-200">
					<thead className="bg-slate-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Title</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Course</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Questions</th>
							<th className="px-6 py-3"></th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-slate-200">
						{sampleQuizzes.map(quiz => (
							<tr key={quiz.id}>
								<td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{quiz.title}</td>
								<td className="px-6 py-4 whitespace-nowrap text-slate-700">{quiz.course}</td>
								<td className="px-6 py-4 whitespace-nowrap text-slate-700">{quiz.questions}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition">Edit</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="bg-white rounded-xl shadow-md p-6">
				<h2 className="text-xl font-semibold text-slate-800 mb-4">Create New Quiz</h2>
				<form className="space-y-4">
					<input type="text" placeholder="Quiz Title" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
					<input type="text" placeholder="Course" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
					<input type="number" placeholder="Number of Questions" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
					<button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">Create Quiz</button>
				</form>
			</div>
		</div>
	);
};

export default Quiz;