
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types';
import Spinner from '../../components/common/Spinner';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case Role.STUDENT:
          navigate('/dashboard/student', { replace: true });
          break;
        case Role.INSTRUCTOR:
          navigate('/dashboard/instructor', { replace: true });
          break;
        case Role.ADMIN:
          navigate('/dashboard/admin', { replace: true });
          break;
        case Role.CONTENT_CREATOR:
          navigate('/dashboard/content-creator', { replace: true });
          break;
        default:
          navigate('/', { replace: true });
      }
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-full">
      <Spinner />
      <p className="ml-4 text-gray-600">Redirecting to your dashboard...</p>
    </div>
  );
};

export default DashboardHome;
