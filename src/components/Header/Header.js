import React from 'react';
import './header.css';
import AvatarImg from '../../assets/avatar.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

const Header = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarUrl === null ? AvatarImg : user.avatarUrl}
          alt="Foto do usuário"
        />
      </div>
      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Chamados
      </Link>
      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        Clientes
      </Link>
      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        Perfil
      </Link>
    </div>
  );
};

export default Header;
