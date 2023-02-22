import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

const Dashboard = () => {
  const {logout} = useContext(AuthContext);

  async function handleLogout(){
    await logout()
  }

  return <div>Dashboard
    <button onClick={handleLogout}>Sair da conta</button>
  </div>;
};

export default Dashboard;
