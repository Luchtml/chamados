import React from 'react';
import './profile.css';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';

const Profile = () => {
  const { user } = React.useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = React.useState(user && user.avatarUrl);

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Minha Conta">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>
              <input type="file" accept="image/*" /> <br />
              {avatarUrl === null ? (
                <img
                  src={avatar}
                  alt="Foto de perfil do usuario"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto de perfil do usuario"
                  width={250}
                  height={250}
                />
              )}
            </label>
            <label>Nome</label>
            <input type="text" placeholder="Seu nome" />
            <label>Email</label>
            <input
              type="text"
              placeholder="SeuEmail@aqui.com"
              disabled={true}
            />
            <button type="submit">Salvar</button>
          </form>
        </div>
        <div className="container">
          <button className="logout-btn">Sair</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
