import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navigation, Sidebar } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { PlacementTestPage } from './pages/PlacementTestPage';
import { DashboardPage } from './pages/DashboardPage';
import { TopicsPage } from './pages/TopicsPage';
import { PracticePage } from './pages/PracticePage';
import { TranscriptPage } from './pages/TranscriptPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { ImprovePage } from './pages/ImprovePage';
import { RetryPage } from './pages/RetryPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProgressPage } from './pages/ProgressPage';
import { InterviewPage } from './pages/InterviewPage';
import { WritingPage } from './pages/WritingPage';
import { GrammarPage } from './pages/GrammarPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.hasTakenTest) return <Navigate to="/placement-test" replace />;
  return <>{children}</>;
}

function AuthOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated && user?.hasTakenTest) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AppContent() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-background">
        {isAuthenticated && user?.hasTakenTest && <Sidebar />}
        <main className={isAuthenticated && user?.hasTakenTest ? 'md:ml-64' : ''}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
            <Route path="/placement-test" element={<AuthOnlyRoute><PlacementTestPage /></AuthOnlyRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/topics" element={<ProtectedRoute><TopicsPage /></ProtectedRoute>} />
            <Route path="/practice" element={<ProtectedRoute><PracticePage /></ProtectedRoute>} />
            <Route path="/transcript" element={<ProtectedRoute><TranscriptPage /></ProtectedRoute>} />
            <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
            <Route path="/improve" element={<ProtectedRoute><ImprovePage /></ProtectedRoute>} />
            <Route path="/retry" element={<ProtectedRoute><RetryPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
            <Route path="/interview" element={<ProtectedRoute><InterviewPage /></ProtectedRoute>} />
            <Route path="/writing" element={<ProtectedRoute><WritingPage /></ProtectedRoute>} />
            <Route path="/grammar" element={<ProtectedRoute><GrammarPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {isAuthenticated && user?.hasTakenTest && <Navigation />}
        </main>
      </div>
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
