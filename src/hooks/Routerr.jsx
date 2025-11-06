import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

// ============= ROUTER =============
export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

 const RouterContext = createContext(null);

const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within Router');
  return context;
};

export const Route = ({ path, element }) => {
  const { currentPath } = useRouter();
  return currentPath === path ? element : null;
};

export const ProtectedRoute = ({ element }) => {
  const { adminUser, loading } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!loading && !adminUser) {
      navigate('/admin/login');
    }
  }, [adminUser, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return adminUser ? element : null;
};