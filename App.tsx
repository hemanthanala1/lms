
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CoursesList from './pages/CoursesList';
import CourseDetail from './pages/CourseDetail';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import InstructorDashboard from './pages/Dashboard/InstructorDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ContentCreatorDashboard from './pages/Dashboard/ContentCreatorDashboard';
import DashboardHome from './pages/Dashboard/DashboardHome';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/auth/PrivateRoute';
import { Role } from './types';
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Quiz from './pages/Quiz';
import Users from './pages/Users';
import Message from './pages/Message';
import Document from './pages/Document';
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* Role-based Dashboard Routes */}
          <Route index element={
            <PrivateRoute>
              <DashboardHome />
            </PrivateRoute>
          } />
          
          {/* Student Dashboard */}
          <Route path="student" element={
            <PrivateRoute roles={[Role.STUDENT]}>
              <StudentDashboard />
            </PrivateRoute>
          } />

          {/* Instructor Dashboard */}
          <Route path="instructor" element={
            <PrivateRoute roles={[Role.INSTRUCTOR]}>
              <InstructorDashboard />
            </PrivateRoute>
          } />

          {/* Admin Dashboard */}
          <Route path="admin" element={
            <PrivateRoute roles={[Role.ADMIN]}>
              <AdminDashboard />
            </PrivateRoute>
          } />

          {/* Content Creator Dashboard */}
          <Route path="content-creator" element={
            <PrivateRoute roles={[Role.CONTENT_CREATOR]}>
              <ContentCreatorDashboard />
            </PrivateRoute>
          } />

          {/* Common Routes */}
          <Route path="profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          {/* Feature Routes with Role Restrictions */}
          <Route path="quiz" element={
            <PrivateRoute roles={[Role.INSTRUCTOR, Role.CONTENT_CREATOR]}>
              <Quiz />
            </PrivateRoute>
          } />
          <Route path="schedule" element={
            <PrivateRoute roles={[Role.INSTRUCTOR]}>
              <Schedule />
            </PrivateRoute>
          } />

          {/* Admin Routes */}
          <Route path="users" element={
            <PrivateRoute roles={[Role.ADMIN]}>
              <Users />
            </PrivateRoute>
          } />

          {/* Content Creator Routes */}
          <Route path="course" element={
            <PrivateRoute roles={[Role.CONTENT_CREATOR]}>
              <Course />
            </PrivateRoute>
          } />
          <Route path="document" element={
            <PrivateRoute roles={[Role.CONTENT_CREATOR]}>
              <Document />
            </PrivateRoute>
          } />
        </Route>

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
