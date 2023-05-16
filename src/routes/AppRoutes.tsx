import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { MenuAdmin } from '../pages/MenuAdmin';
import { RegisterUser } from '../pages/RegisterUser';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard-admin" element={<MenuAdmin />} />
        <Route path="/register-user" element={<RegisterUser />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
