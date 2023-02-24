import React from 'react';
import { FiUser } from 'react-icons/fi';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';

const Customers = () => {
  const [nome, setNome] = React.useState('');
  const [cnpj, setCnpj] = React.useState('');
  const [endereco, setEndereco] = React.useState('');

  function handleRegister(e) {
    e.preventDefault();
    alert('teste')
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Clientes">
          <FiUser size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Nome Fantasia</label>
            <input
              type="text"
              placeholder="Nome da empresa"
              value={nome}
              onChange={({ target }) => setNome(target.value)}
            />

            <label>CNPJ</label>
            <input
              type="text"
              placeholder="CNPJ da empresa"
              value={cnpj}
              onChange={({ target }) => setCnpj(target.value)}
            />

            <label>Endereço</label>
            <input
              type="text"
              placeholder="Endereço da empresa"
              value={endereco}
              onChange={({ target }) => setEndereco(target.value)}
            />

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Customers;
