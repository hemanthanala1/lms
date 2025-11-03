import React from 'react';

const stats = [
	{ label: 'Total Learners', value: 1200 },
	{ label: 'Average Learners', value: 300 },
	{ label: 'Total Content', value: 85 },
	{ label: 'Demographics', value: 'Global' },
];

const events = [
	{ title: 'Orientation Webinar', date: '2025-10-01' },
	{ title: 'Course Release: React Basics', date: '2025-10-05' },
	{ title: 'Quiz Week', date: '2025-10-10' },
];

const Dashboard = () => (
	<div className="space-y-8">
		<h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			{stats.map((stat) => (
				<div key={stat.label} className="bg-white rounded-xl shadow-md p-6 text-center">
					<div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
					<div className="text-slate-600 font-medium">{stat.label}</div>
				</div>
			))}
		</div>
		<div className="bg-white rounded-xl shadow-md p-6">
			<h2 className="text-xl font-semibold text-slate-800 mb-4">Upcoming Events</h2>
			<ul className="divide-y divide-slate-200">
				{events.map((event) => (
					<li key={event.title} className="py-3 flex justify-between items-center">
						<span className="text-slate-700 font-medium">{event.title}</span>
						<span className="text-slate-500 text-sm">{event.date}</span>
					</li>
				))}
			</ul>
		</div>
	</div>
);

export default Dashboard;