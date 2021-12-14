import React, { useEffect, useState } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FaEye, FaPlus, FaEdit } from 'react-icons/fa';
import * as API from '../../../services/api';
import { GET_USER } from '../../../services/routes';
import { ButtonContainer, Container } from '../UserAdd/styles';

export const ListUsers = () => {
  const [users, setProducts] = useState([]);
  const [error, setError] = useState();
  const history = useHistory();

  useEffect(() => {
    API.apiGET(GET_USER).then((resp) => {
      if (resp.has_error) {
        // alert(resp.error);
        console.log(resp);
        setError(resp.error.message);
      } else {
        setProducts(resp.response.data);
      }
    });
  }, []);

  return (
    <Container>
      <h1>Lista de Usuários</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <ButtonContainer>
        <Button variant="secondary" onClick={() => history.push('userAdd')}>
          <FaPlus style={{ marginBottom: 3 }} /> Adicionar Usuário
        </Button>
      </ButtonContainer>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Visualizar</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((product, idx) => {
            return (
              <tr>
                <td>{idx}</td>
                <td>{product.name}</td>
                <td>{product.email}</td>
                <td
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    history.push({
                      pathname: 'userView',
                      state: { id: product.id },
                    })
                  }
                >
                  <FaEye />
                </td>
                <td
                  onClick={() =>
                    history.push({
                      pathname: '/userAdd',
                      state: { detail: product },
                    })
                  }
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <FaEdit />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
