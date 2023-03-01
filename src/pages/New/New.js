import React, { useContext } from 'react';
import './new.css';
import Title from '../../components/Title/Title';
import Header from '../../components/Header/Header';
import { FiPlusCircle } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConnection';
import { collection, doc, getDoc, getDocs, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const listRef = collection(db, 'customers');

const New = () => {
  const { user } = useContext(AuthContext);

  const [customers, setCustomers] = React.useState([]);
  const [loadCustomer, setLoadCustomer] = React.useState(true);
  const [customerSelected, setCustomerSelected] = React.useState(0);

  const [complemento, setComplemento] = React.useState('');
  const [assunto, setAssunto] = React.useState('Suporte');
  const [status, setStatus] = React.useState('Progresso');

  React.useEffect(() => {
    async function loadCustomers() {
      const querySnapshot = await getDocs(listRef)
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });

          if (snapshot.docs.size === 0) {
            console.log('nenhuma empresa encontrada');
            setCustomers([{ id: '1', nomeFantasia: 'FREELA' }]);
            setLoadCustomer(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomer(false);
        })
        .catch((error) => {
          console.log(error + '-erro ao buscar os clientes');
          setLoadCustomer(false);
          setCustomers([{ id: '1', nomeFantasia: 'FREELA' }]);
        });
    }
    loadCustomers();
  }, []);

  function handleOptionChange({ target }) {
    setStatus(target.value);
  }

  function handleChangeSelect({ target }) {
    setAssunto(target.value);
    console.log(target.value);
  }

  function handleChangeCustomer({ target }) {
    setCustomerSelected(target.value);
  }

  async function handleRegister(e) {
    e.preventDefault();

    //Registrar Chamado

    await addDoc(collection(db, 'chamados'), {
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userId: user.uid,
    })
      .then(() => {
        toast.success('Chamado Registrado');
        setComplemento('');
        setCustomerSelected(0);
      })
      .catch((error) => {
        toast.error('Ops, erro ao registrar, tente novamente!');
        console.log(error);
      });
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Clientes</label>
            {loadCustomer ? (
              <input type="text" disabled={true} value="Carregando..." />
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomer}>
                {customers.map((item, index) => {
                  return (
                    <option value={index} key={index}>
                      {item.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
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
