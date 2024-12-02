import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LoginPage from '../pages/LoginPage';

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Eğer authenticate olmuşsa designer'a yönlendir
  if (isAuthenticated) {
    return <Navigate to="/designer" replace />;
  }

  return <LoginPage />;
};

export default PublicRoute;