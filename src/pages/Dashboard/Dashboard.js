import React, { useContext } from 'react';
import './dashboard.css';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import { AuthContext } from '../../contexts/auth';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { format } from 'date-fns';
import Modal from '../../components/Modal/Modal';

const listRef = collection(db, 'chamados');

const Dashboard = () => {
  const [chamados, setChamados] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [isEmpty, setIsEmpty] = React.useState(false);
  const [lastDocs, setLastDocs] = React.useState();
  const [loadingMore, setLoadingMore] = React.useState(false);

  const [showPostModal, setShowPostModal] = React.useState(false);
  const [detail, setDetail] = React.useState();

  const { logout } = useContext(AuthContext);

  React.useEffect(() => {
    async function loadChamados() {
      const q = query(listRef, orderBy('created', 'desc'), limit(5));

      const querySnapshot = await getDocs(q);

      setChamados([]);

      await updateState(querySnapshot);

      setLoading(false);
    }

    loadChamados();

    return () => {};
  }, []);

  async function updateState(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complemento: doc.data().complemento,
        });
      });
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      //Pegando ultimo item renderizado

      setChamados((chamados) => [...chamados, ...lista]);

      setLastDocs(lastDoc);
    } else {
      setIsEmpty(true);
    }

    setLoadingMore(false);
  }

  async function handleMore() {
    setLoadingMore(true);

    const q = query(
      listRef,
      orderBy('created', 'desc'),
      startAfter(lastDocs),
      limit(5),
    );
    const querySnapshot = await getDocs(q);
    await updateState(querySnapshot);
  }

  function toggleModal(item) {
    setShowPostModal(!showPostModal);
    setDetail(item);
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="content">
          <Title name="Tickets">
            <FiMessageSquare size={25} />
          </Title>
          <div className="container dashboard">
            <span>Buscando Chamados...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="tickets">
          <FiMessageSquare size={25} />
        </Title>
        <>
          {chamados.length === 0 ? (
            <div className="container dashboard">
              <span>Nenhum chamado registrado.</span>
              <Link to="/new" className="new">
                <FiPlus color="#FFF" size={25} />
                Novo Chamado
              </Link>
            </div>
          ) : (
            <>
              <Link to="/new" className="new">
                <FiPlus color="#FFF" size={25} />
                Novo Chamado
              </Link>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Assunto</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cadastrado em</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {chamados.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Cliente">{item.cliente}</td>
                        <td data-label="Assunto">{item.assunto}</td>
                        <td data-label="Status">
                          <span
                            className="badge"
                            style={{
                              backgroundColor:
                                item.status === 'Aberto' ? '#5cb85c' : '#999',
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td data-label="Cadastrado">{item.createdFormat}</td>
                        <td data-label="#">
                          <button
                            className="action"
                            style={{ backgroundColor: '#3583f6' }}
                            onClick={() => toggleModal(item)}
                          >
                            <FiSearch color="#FFF" size={17} />
                          </button>
                          <Link
                            to={`/new/${item.id}`}
                            className="action"
                            style={{ backgroundColor: '#f6a935' }}
                          >
                            <FiEdit2 color="#FFF" size={17} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {loadingMore && <h3>Buscando mais chamados...</h3>}
              {!loadingMore && !isEmpty && (
                <button onClick={handleMore} className="btn-more">
                  Buscar mais
                </button>
              )}
            </>
          )}
        </>
      </div>
      {showPostModal && (
        <Modal
          conteudo={detail}
          close={() => setShowPostModal(!showPostModal)}
        />
      )}
    </div>
  );
};

export default Dashboard;
