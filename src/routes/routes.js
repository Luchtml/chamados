import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import Customers from '../pages/Customers/Customers';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import Private from './Private';
import New from '../pages/New/New';


function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      <Route
        path="/profile"
        element={
          <Private>
            <Profile />
          </Private>
        }
      />
      <Route
        path="/customers"
        element={
          <Private>
            <Customers />
          </Private>
        }
      />
      <Route
        path="/new"
        element={
          <Private>
            <New />
          </Private>
        }
      />
    </Routes>
  );
}

export default RoutesApp;
