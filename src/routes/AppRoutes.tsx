import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { MenuAdmin } from '../pages/MenuAdmin';
import { RegisterUser } from '../pages/RegisterUser';
import { ListUsers } from '../pages/ListUsers';

const AppRoutes = () => {
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
};

export default AppRoutes;
