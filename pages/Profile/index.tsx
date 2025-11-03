import React from 'react';

const user = {
	name: 'Alice',
	email: 'alice@example.com',
	role: 'Student',
	avatarUrl: 'https://i.pravatar.cc/150?u=alice',
};

const Profile = () => {
	return (
		<div className="space-y-8 max-w-xl mx-auto">
			<h1 className="text-3xl font-bold text-slate-800 mb-6">Profile</h1>
			<div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6">
				<img src={user.avatarUrl} alt="Avatar" className="h-20 w-20 rounded-full object-cover" />
				<div>
					<div className="text-xl font-semibold text-slate-800">{user.name}</div>
					<div className="text-slate-600">{user.email}</div>
					<div className="text-slate-500 text-sm mt-1">Role: {user.role}</div>
				</div>
			</div>
			<div className="bg-white rounded-xl shadow-md p-6">
				<h2 className="text-xl font-semibold text-slate-800 mb-4">Change Password</h2>
				<form className="space-y-4">
					<input type="password" placeholder="Current Password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
					<input type="password" placeholder="New Password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
					<button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">Change Password</button>
				</form>
			</div>
			<div className="flex justify-end">
				<button className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">Log Out</button>
			</div>
		</div>
	);
};

export default Profile;