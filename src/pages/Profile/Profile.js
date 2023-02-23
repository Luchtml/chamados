import React from 'react';
import './profile.css';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';

const Profile = () => {
  const { user, storageUser, setUser, logout } = React.useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = React.useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = React.useState(null);

  const [nome, setNome] = React.useState(user && user.nome);
  const [email, setEmail] = React.useState(user && user.email);

  function handleFile({ target }) {
    if (target.files[0]) {
      const image = target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        alert('Envie uma imagem do tipo PNG ou JPEG');
        setImageAvatar(null);
        return;
      }
    }
  }

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
              <input type="file" accept="image/*" onChange={handleFile} />{' '}
              <br />
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
            <input
              type="text"
              value={nome}
              onChange={({ target }) => setNome(target.value)}
            />
            <label>Email</label>
            <input type="text" value={email} disabled={true} />
            <button type="submit">Salvar</button>
          </form>
        </div>
        <div className="container">
          <button className="logout-btn" onClick={() => logout()}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
