import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation, Sidebar } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="md:ml-64">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/transcript" element={<TranscriptPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/improve" element={<ImprovePage />} />
            <Route path="/retry" element={<RetryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Navigation />
        </main>
      </div>
    </Router>
  );
}

export default App;
