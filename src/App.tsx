import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Designer from './pages/Designer';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import FormsPage from './pages/Forms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/designer" element={<Designer />} />
          <Route path="/designer/:formId" element={<Designer />} />
          <Route path="/forms" element={<FormsPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/forms" replace />} />
        <Route path="*" element={<Navigate to="/forms" replace />} />
      </Routes>
    </Router>
  );
}

export default App;