import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import * as API from '../../../services/api';
import { DELETE_TIMELINE_EVENT, GET_TIMELINE } from '../../../services/routes';
import { Container } from './styles';
import { ViewDefault } from '../../../components/ViewDefault';
import { AddEventType } from '../../../components/AddEventType';

export const TimelineView = () => {
  const [product, setProduct] = useState({});
  const timelineId = useSelector((state) => state.app.timeline_id);

  const getTimeline = () => {
    API.apiGET(
      GET_TIMELINE.replace('{id}', encodeURIComponent(timelineId))
    ).then((resp) => {
      if (resp.has_error) {
        alert(resp.error);
        console.log(resp.error.response);
      } else {
        setProduct(resp.response.data);
      }
    });
  };

  const deleteEvent = (code) => {
    API.apiDELETE(
      DELETE_TIMELINE_EVENT.replace('{id}', encodeURIComponent(timelineId)),
      { codes: [code] }
    ).then((resp) => {
      if (resp.has_error) {
        alert(resp.error);
        console.log(resp.error.response);
      } else {
        getTimeline();
      }
    });
  };

  useEffect(() => {
    getTimeline();
  }, []);

  return (
    <Container>
      <h1>Visualizar Timeline</h1>
      <ViewDefault
        object={product}
        values={[
          { label: 'ID', key: 'id' },
          { label: 'Nome', key: 'name' },
          { label: 'Descrição', key: 'description' },
        ]}
      />
      <h4>Adicionar Evento</h4>
      <AddEventType timelineID={timelineId} onChange={getTimeline} />
      <div>
        <h4>Eventos</h4>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Código</th>
              <th>Descrição</th>
              <th>Ativo</th>
              <th>Desativar</th>
            </tr>
          </thead>
          <tbody>
            {product?.events?.map((e, idx) => {
              return (
                <tr>
                  <td>{idx}</td>
                  <td>{e.code}</td>
                  <td>{e.description}</td>
                  <td>{e.activated ? 'Sim' : 'Não'}</td>
                  <td
                    onClick={() => deleteEvent(e.code)}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <FaTrash />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
