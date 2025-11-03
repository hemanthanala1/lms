import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow">
        <section className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Unlock Your Potential with <span className="text-primary">LMS Pro</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Your all-in-one solution for online learning. Manage courses, track progress, and collaborate with ease.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/courses"
                className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                Browse Courses
              </Link>
              <Link
                to="/login"
                className="inline-block bg-slate-200 text-slate-800 font-semibold px-8 py-3 rounded-lg hover:bg-slate-300 transition-colors duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Features for Everyone</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <h3 className="text-xl font-semibold text-slate-800">For Students</h3>
                        <p className="mt-2 text-slate-600">Access courses, track your progress, and submit assignments seamlessly.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <h3 className="text-xl font-semibold text-slate-800">For Instructors</h3>
                        <p className="mt-2 text-slate-600">Create engaging courses, manage students, and provide valuable feedback.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <h3 className="text-xl font-semibold text-slate-800">For Creators</h3>
                        <p className="mt-2 text-slate-600">Develop high-quality content with our easy-to-use course authoring tools.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <h3 className="text-xl font-semibold text-slate-800">For Admins</h3>
                        <p className="mt-2 text-slate-600">Oversee the entire platform, manage users, and gain insights with analytics.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;