import React from 'react';

const Document = () => {
	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold text-slate-800 mb-6">Documents</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="bg-white rounded-xl shadow-md p-6">
					<h2 className="text-xl font-semibold text-slate-800 mb-4">Upload File</h2>
					<form className="space-y-4">
						<input type="file" className="w-full px-4 py-2 border rounded-lg" />
						<button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">Upload</button>
					</form>
				</div>
				<div className="bg-white rounded-xl shadow-md p-6">
					<h2 className="text-xl font-semibold text-slate-800 mb-4">Make Folder</h2>
					<form className="space-y-4">
						<input type="text" placeholder="Folder Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
						<button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition">Create Folder</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Document;