import React from 'react';

const Message = () => {
	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold text-slate-800 mb-6">Messages</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="bg-white rounded-xl shadow-md p-6">
					<h2 className="text-xl font-semibold text-slate-800 mb-4">Personal Chat</h2>
					<div className="h-48 bg-slate-50 rounded-lg p-4 overflow-y-auto mb-4">Sample personal chat messages...</div>
					<form className="flex gap-2">
						<input type="text" placeholder="Type a message" className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
						<button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">Send</button>
					</form>
				</div>
				<div className="bg-white rounded-xl shadow-md p-6">
					<h2 className="text-xl font-semibold text-slate-800 mb-4">Group Chat</h2>
					<div className="h-48 bg-slate-50 rounded-lg p-4 overflow-y-auto mb-4">Sample group chat messages...</div>
					<form className="flex gap-2">
						<input type="text" placeholder="Type a message" className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
						<button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">Send</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Message;