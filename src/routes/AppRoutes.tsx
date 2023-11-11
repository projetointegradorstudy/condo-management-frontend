import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { MenuAdmin } from '../pages/MenuAdmin';
import { MenuUser } from '../pages/MenuUser';
import { GlobalProvider } from '../contexts/Provider';
import { ListUsers } from '../pages/ListUsers';
import { ListEnvironments } from '../pages/ListEnvironments';
import { ConfirmUser } from '../pages/ConfirmUser';
import { ForgotPassaword } from '../pages/ForgotPassaword';
import { RecoverPassword } from '../pages/RecoverPassword';
import { Iprops } from '../interfaces';
import { getContext } from '../utils/context-import';
import { EditProfile } from '../pages/EditProfile';
import { Reservations } from '../pages/Reservations';
import { MyReservations } from '../pages/MyReservations';
import { Layout } from '../components/Layout';

export function AppRoutes() {
  const IsLoggedOut = ({ children }: Iprops) => {
    const { isAdmin, token, isAuthenticated } = getContext();
    if (isAuthenticated && token && !isAdmin) return <Navigate to="/menu-user" replace />;
    if (isAuthenticated && token && isAdmin) return <Navigate to="/dashboard-admin" replace />;
    return <>{children}</>;
  };

  const IsLoggedIn = ({ children }: Iprops) => {
    const { isAdmin, token, isAuthenticated } = getContext();
    if (!isAuthenticated || !token) return <Navigate to="/" replace />;
    if (isAdmin) return <Navigate to="/dashboard-admin" replace />;
    return <>{children}</>;
  };

  const IsAdmin = ({ children }: Iprops) => {
    const { isAdmin, token, isAuthenticated } = getContext();
    if (!isAuthenticated || !token) return <Navigate to="/" replace />;
    if (!isAdmin) return <Navigate to="/menu-user" replace />;
    return <>{children}</>;
  };

  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/"
            element={
              <IsLoggedOut>
                <Login />
              </IsLoggedOut>
            }
          />
          <Route
            path="/confirm-user"
            element={
              <IsLoggedOut>
                <ConfirmUser />
              </IsLoggedOut>
            }
          />
          <Route
            path="/recover-password"
            element={
              <IsLoggedOut>
                <RecoverPassword />
              </IsLoggedOut>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <IsLoggedOut>
                <ForgotPassaword />
              </IsLoggedOut>
            }
          />
          <Route
            path="/menu-user"
            element={
              <IsLoggedIn>
                <Layout>
                  <MenuUser />
                </Layout>
              </IsLoggedIn>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <IsLoggedIn>
                <Layout>
                  <EditProfile />
                </Layout>
              </IsLoggedIn>
            }
          />
          <Route
            path="/my-reservations"
            element={
              <IsLoggedIn>
                <Layout>
                  <MyReservations />
                </Layout>
              </IsLoggedIn>
            }
          />
          <Route
            path="/dashboard-admin"
            element={
              <IsAdmin>
                <Layout>
                  <MenuAdmin />
                </Layout>
              </IsAdmin>
            }
          />
          <Route
            path="/list-users"
            element={
              <IsAdmin>
                <Layout>
                  <ListUsers />
                </Layout>
              </IsAdmin>
            }
          />
          <Route
            path="/list-environments"
            element={
              <IsAdmin>
                <Layout>
                  <ListEnvironments />
                </Layout>
              </IsAdmin>
            }
          />
          <Route
            path="/reservations"
            element={
              <IsAdmin>
                <Layout>
                  <Reservations />
                </Layout>
              </IsAdmin>
            }
          />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}
