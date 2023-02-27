import React from 'react';
import './new.css';
import Title from '../../components/Title/Title';
import Header from '../../components/Header/Header';
import { FiPlusCircle } from 'react-icons/fi';

const New = () => {
  const [customers, setCustomers] = React.useState([]);

  const [complemento, setComplemento] = React.useState('');
  const [assunto, setAssunto] = React.useState('Suporte');
  const [status, setStatus] = React.useState('Progresso');

  function handleOptionChange({ target }) {
    setStatus(target.value);
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile">
            <label>Clientes</label>
            <select>
              <option value="1" key={1}>
                Mercado Teste
              </option>
              <option value="2" key={2}>
                Mercado Informatica
              </option>
            </select>
            <label>Assunto</label>
            <select>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === 'Aberto'}
              />
              <span>Em Aberto</span>
              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === 'Progresso'}
              />
              <span>Progresso</span>
              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === 'Atendido'}
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              value={complemento}
              onChange={({ target }) => setComplemento(target.value)}
              type="text"
              placeholder="Descreva seu problema (opcional)"
            />

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
