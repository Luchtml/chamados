import React, { useContext } from 'react';
import Header from '../../components/Header/Header';
import { AuthContext } from '../../contexts/auth';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
  }

  return (
    <div>
      <Header />
      <button onClick={handleLogout}>Sair da conta</button>
    </div>
  );
};

export default Dashboard;
