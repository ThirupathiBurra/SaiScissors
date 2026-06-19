import { useAuthContext } from '../providers/AuthProvider';

export const useAuth = () => {
  const { user, loading, logout } = useAuthContext();
  
  return {
    user,
    loading,
    logout,
    isAuthenticated: !!user,
  };
};
