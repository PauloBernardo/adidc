import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Header from '../../components/Header';
import { TableList } from '../../components/TableList';
import { GET_ALERTS } from '../../services/routes';
import { setAppValue } from '../../redux/actions/app';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppValue({ current_page: 'dashboard' }));
  }, []);

  return (
    <>
      <Header title="Painel - Visão Geral" />
      <br />
      <TableList
        title="Alertas"
        fields={[
          { id: 'id', type: 'text', label: '#' },
          { id: 'camera_id', type: 'text', label: 'Câmara' },
          {
            id: 'message',
            type: 'object',
            object_keys: ['type', 'message'],
            label: 'Mensagem',
          },
          {
            id: 'type',
            type: 'object',
            object_keys: ['type', 'id'],
            label: 'Tipo',
          },
          { id: 'time', type: 'time', label: 'Hora' },
        ]}
        getUrl={GET_ALERTS}
        deleteUrl="/alerta/{id}"
        onViewAction={(alert) => {
          setSelectedItem(alert);
          setIsModalOpen(true);
        }}
      />
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alerta de segurança</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Câmera: {selectedItem?.camera_id}</p>{' '}
          <img
            src={`data:image/jpeg;base64, ${selectedItem?.image}`}
            alt="test"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
