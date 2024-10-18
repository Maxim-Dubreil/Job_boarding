import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { CompanyDashboard } from './pages/CompanyDashboard/CompanyDashboard';
import { Login } from './pages/Login/Login';
import { Admin } from './pages/Admin/Admin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CompanyDashboard" element={
          <ProtectedRoute roles={['recruteur']}>
            <CompanyDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute roles={['admin']}>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
