import React from 'react';
import './signIn.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const { email, setEmail } = React.useState('');
  const { password, setPassword } = React.useState('');

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo da pagina" />
        </div>

        <form>
          <h1>Entrar</h1>
          <input
            type="text"
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
          <button type="submit">Acessar</button>
        </form>

        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
};

export default SignIn;
