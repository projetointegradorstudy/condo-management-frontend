import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { MenuAdmin } from '../pages/MenuAdmin';
import { MenuUser } from '../pages/MenuUser';
import { GlobalProvider, Iprops } from '../contexts/Provider';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { RegisterUser } from '../pages/RegisterUser';
import { ListUsers } from '../pages/ListUsers';

export function AppRoutes() {
  const getContext = (): any => {
    const context = useContext(GlobalContext);
    if (!context) return null;
    return context;
  };
  const IsLoggedOut = ({ children }: Iprops) => {
    const { token, isAuthenticated } = getContext();
    if (isAuthenticated || token) return <Navigate to="/dashboard-admin" replace />;

    return <>{children}</>;
  };

  const IsLoggedIn = ({ children }: Iprops) => {
    const { token, isAuthenticated } = getContext();
    if (!isAuthenticated && !token) return <Navigate to="/" replace />;

    return <>{children}</>;
  };

  const IsAdmin = ({ children }: Iprops) => {
    const { isAdmin } = getContext();
    if (!isAdmin) return <Navigate to="/menu-user" replace />;

    return <>{children}</>;
  };

  const IsUser = ({ children }: Iprops) => {
    const { isAdmin } = getContext();
    if (isAdmin) return <Navigate to="/dashboard-admin" replace />;

    return <>{children}</>;
  };

  const GetLoggoutRoutesHandler = () => {
    return (
      <IsLoggedOut>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </IsLoggedOut>
    );
  };

  const GetUserRoutesHandler = () => {
    return (
      <IsLoggedIn>
        <IsUser>
          <Routes>
            <Route path="/menu-user" element={<MenuUser />} />
          </Routes>
        </IsUser>
      </IsLoggedIn>
    );
  };

  const GetAdminRoutesHandler = () => {
    return (
      <IsLoggedIn>
        <IsAdmin>
          <Routes>
            <Route path="/dashboard-admin" element={<MenuAdmin />} />
          </Routes>
        </IsAdmin>
      </IsLoggedIn>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard-admin" element={<MenuAdmin />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/list-users" element={<ListUsers />} />
      </Routes>
    </Router>
  );
}
