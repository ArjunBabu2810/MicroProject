import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import TeacherDashboard from './components/TeacherDashboard';
import SubmissionsPage from './components/SubmissionsPage';
import ViewStudentsPage from './components/ViewStudentsPage';
import AddAssignmentPage from './components/AddAssignmentPage';
import StudentsPage from './components/StudentsPage';
import StudentProfile from './components/StudentProfile';
import StudentSubmittedAssignments from './components/SubmittedAssignments';
import ViewSubmissionsPage from './components/viewSubmissions';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submissions"
          element={
            <ProtectedRoute>
              <SubmissionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <ViewStudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addassignment"
          element={
            <ProtectedRoute>
              <AddAssignmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/:id"
          element={
            <ProtectedRoute>
              <StudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentprofile"
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/submitted/:studentId"
          element={
            <ProtectedRoute>
              <StudentSubmittedAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submissions/:assignmentId"
          element={
            <ProtectedRoute>
              <ViewSubmissionsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
