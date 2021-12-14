import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FaEye, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import * as API from '../../../services/api';
import { LIST_TIMELINE, DELETE_TIMELINE } from '../../../services/routes';
import { ButtonContainer, Container } from './styles';
import { setAppValue } from '../../../redux/actions/app';

export const ListTimeline = () => {
  const [timelines, setTimelines] = useState([]);
  const dispatch = useDispatch();

  const history = useHistory();

  const getTimelines = () => {
    API.apiGET(LIST_TIMELINE).then((resp) => {
      console.log(resp);
      if (resp.has_error) {
        alert(resp.error);
      } else {
        setTimelines(resp.response.data.data);
      }
    });
  };

  useEffect(() => {
    getTimelines();
  }, []);

  const deleteTimeline = (id) => {
    API.apiDELETE(DELETE_TIMELINE.replace('{id}', encodeURIComponent(id)))
      .then((response) => {
        if (!response.has_error && response.response.status === 200) {
          getTimelines();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h1>Lista de Timelines</h1>
      <ButtonContainer>
        <Button variant="secondary" onClick={() => history.push('addTimeline')}>
          <FaPlus style={{ marginBottom: 3 }} /> Adicionar Timeline
        </Button>
      </ButtonContainer>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Visualizar</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {timelines.map((timeline, idx) => {
            return (
              <tr>
                <td>{idx}</td>
                <td>{timeline.name}</td>
                <td>{timeline.description}</td>
                <td
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    dispatch(setAppValue({ timeline_id: timeline.id }));
                    history.push({
                      pathname: 'timelineView',
                      state: { id: timeline.id },
                    });
                  }}
                >
                  <FaEye />
                </td>
                <td
                  onClick={() =>
                    history.push({
                      pathname: 'editTimeline',
                      state: { detail: timeline },
                    })
                  }
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <FaEdit />
                </td>
                <td
                  onClick={() => deleteTimeline(timeline.id, idx)}
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
    </Container>
  );
};
