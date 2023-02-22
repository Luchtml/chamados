import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const SignUp = () => {
  const { name, setName } = React.useState('');
  const { email, setEmail } = React.useState('');
  const { password, setPassword } = React.useState('');

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo da pagina" />
        </div>

        <form>
          <h1>Nova conta</h1>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
          <button type="submit">Cadastrar</button>
        </form>

        <Link to="/">Já possui uma conta? Faça Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
