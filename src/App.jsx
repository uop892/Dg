import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Layout } from "./Components/Layout/Layout";
import { LoginForm } from "./components/Auth/LoginForm";
import { Home } from "./Components/Pages/Home";
import { About } from "./Components/Pages/About";
import { Contact } from "./Components/Pages/Contact";
import { Dashboard } from "./Components/Pages/Dashboard";
import { AdminDashboard } from "./Components/Pages/AdminDashboard";
import { Elections } from "./Components/Pages/Election";
import { Services } from "./Components/Pages/Services";
import { Clubs } from "./Components/Pages/Club";
import { Complaints } from "./Components/Pages/Complaint";
import Latest from "./Components/Pages/Latest";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  const adminRoles = [
    "president",
    "student_din",
    "vice_president",
    "secretary",
    "speaker",
    "academic_affairs",
    "general_service",
    "dining_services",
    "sports_culture",
    "clubs_associations",
  ];

  if (!user || !adminRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Services" element={<Services />} />

          {/* Auth Route */}
          <Route
            path="/login"
            element={
              user ? <Navigate to="/dashboard" replace /> : <LoginForm />
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/elections"
            element={
              <ProtectedRoute>
                <Elections />
              </ProtectedRoute>
            }
          />
          <Route
            path="/elections"
            element={
              <ProtectedRoute>
                <Elections />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Club"
            element={
              <ProtectedRoute>
                <Clubs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints"
            element={
              <ProtectedRoute>
                <Complaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Latest"
            element={
              <ProtectedRoute>
                <Latest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Analytics Dashboard
                  </h1>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    User Profile
                  </h1>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: "#363636", color: "#fff" },
        }}
      />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
