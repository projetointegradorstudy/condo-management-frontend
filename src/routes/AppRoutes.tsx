import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { MenuAdmin } from '../pages/MenuAdmin';
import { GlobalProvider } from '../contexts/Provider';

export function AppRoutes() {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard-admin" element={<MenuAdmin />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}
