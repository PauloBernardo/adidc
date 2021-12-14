import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import * as API from '../../../services/api';
import { Container } from './styles';
import { ViewDefault } from '../../../components/ViewDefault';
import { ButtonContainer } from '../../products/AddProducts/styles';
import { GET_USER } from '../../../services/routes';

export const UserView = () => {
  const [user, setUser] = useState({});
  const userLogged = useSelector((state) => state.user.user);
  const history = useHistory();

  useEffect(() => {
    API.apiGET(GET_USER).then((resp) => {
      console.log(resp);
      if (resp.has_error) {
        alert(resp.error);
      } else {
        console.log(resp.response.data);
        setUser(resp.response.data);
      }
    });
  }, []);

  return (
    <Container>
      <h1>Usuário</h1>
      <ButtonContainer>
        <Button
          variant="secondary"
          onClick={() =>
            history.push({
              pathname: 'userEdit',
              state: { user },
            })
          }
        >
          <FaEdit style={{ marginBottom: 3 }} /> Editar Usuário
        </Button>
      </ButtonContainer>
      <ViewDefault
        object={user}
        values={[
          { label: 'ID', key: 'id' },
          { label: 'Nome', key: 'name' },
          { label: 'CPF', key: 'cpf' },
          { label: 'Email', key: 'email' },
          { label: 'Departamento', key: 'department' },
          { label: 'Empresa', key: 'companyId' },
          { label: 'Posição', key: 'position' },
        ]}
      />
    </Container>
  );
};
