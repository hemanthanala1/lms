import React from 'react';

const upcomingEvents = [
	{ title: 'Orientation Webinar', date: '2025-10-01' },
	{ title: 'Course Release: React Basics', date: '2025-10-05' },
	{ title: 'Quiz Week', date: '2025-10-10' },
];

const Schedule = () => {
	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold text-slate-800 mb-6">Schedule</h1>
			<div className="bg-white rounded-xl shadow-md p-6 mb-8">
				<h2 className="text-xl font-semibold text-slate-800 mb-4">Schedule Meeting</h2>
				<form className="space-y-4">
					<input type="text" placeholder="Meeting Title" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
					<input type="date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
					<button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">Schedule</button>
				</form>
			</div>
			<div className="bg-white rounded-xl shadow-md p-6">
				<h2 className="text-xl font-semibold text-slate-800 mb-4">Upcoming Events</h2>
				<ul className="divide-y divide-slate-200">
					{upcomingEvents.map(event => (
						<li key={event.title} className="py-3 flex justify-between items-center">
							<span className="text-slate-700 font-medium">{event.title}</span>
							<span className="text-slate-500 text-sm">{event.date}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Schedule;