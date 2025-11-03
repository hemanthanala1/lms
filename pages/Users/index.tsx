import React from 'react';

const sampleUsers = [
	{ id: 1, name: 'Alice', email: 'alice@example.com', role: 'Student' },
	{ id: 2, name: 'Bob', email: 'bob@example.com', role: 'Instructor' },
	{ id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Admin' },
];

const Users = () => {
	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold text-slate-800 mb-6">Users</h1>
			<div className="bg-white rounded-xl shadow-md p-6 mb-8">
				<h2 className="text-xl font-semibold text-slate-800 mb-4">User List</h2>
				<table className="min-w-full divide-y divide-slate-200">
					<thead className="bg-slate-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Name</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Email</th>
							<th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Role</th>
							<th className="px-6 py-3"></th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-slate-200">
						{sampleUsers.map(user => (
							<tr key={user.id}>
								<td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{user.name}</td>
								<td className="px-6 py-4 whitespace-nowrap text-slate-700">{user.email}</td>
								<td className="px-6 py-4 whitespace-nowrap text-slate-700">{user.role}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition">Remove</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="bg-white rounded-xl shadow-md p-6">
					<h2 className="text-xl font-semibold text-slate-800 mb-4">Add User</h2>
					<form className="space-y-4">
						<input type="text" placeholder="Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
						<input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
						<select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
							<option>Student</option>
							<option>Instructor</option>
							<option>Admin</option>
						</select>
						<button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">Add User</button>
					</form>
				</div>
				<div className="bg-white rounded-xl shadow-md p-6">
					<h2 className="text-xl font-semibold text-slate-800 mb-4">Assign Content</h2>
					<form className="space-y-4">
						<input type="text" placeholder="User Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
						<input type="text" placeholder="Content Title" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
						<button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">Assign</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Users;