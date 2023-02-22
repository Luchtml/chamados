import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';

const SignUp = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp, loadingAuth } = React.useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (name !== '' && email !== '' && password !== '') {
      await signUp(email, password, name);
    }
  }
  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo da pagina" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Nova conta</h1>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type="password"
            placeholder="**********"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit">
            {loadingAuth ? 'Carreagando...' : 'Cadastrar'}
          </button>
        </form>

        <Link to="/">Já possui uma conta? Faça Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
