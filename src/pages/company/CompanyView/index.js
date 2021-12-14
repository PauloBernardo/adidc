import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { Auth } from 'aws-amplify';
import * as API from '../../../services/api';
import { LIST_COMPANY } from '../../../services/routes';
import { Container } from './styles';
import { ViewDefault } from '../../../components/ViewDefault';
import { ButtonContainer } from '../../products/AddProducts/styles';

export const CompanyView = () => {
  const [company, setCompany] = useState({});
  const history = useHistory();

  const getToken = async () => {
    console.log((await Auth.currentSession()).getIdToken().getJwtToken());
  };

  useEffect(() => {
    getToken().finally();
    API.apiGET(LIST_COMPANY).then((resp) => {
      console.log(resp);
      if (resp.has_error) {
        alert(resp.error);
      } else {
        console.log(resp.response.data);
        setCompany(resp.response.data);
      }
    });
  }, []);

  return (
    <Container>
      <h1>Empresa</h1>
      <ButtonContainer>
        <Button
          variant="secondary"
          onClick={() =>
            history.push({
              pathname: 'companyEdit',
              state: { company },
            })
          }
        >
          <FaEdit style={{ marginBottom: 3 }} /> Editar Empresa
        </Button>
      </ButtonContainer>
      <ViewDefault
        object={company}
        values={[
          { label: 'ID', key: 'id' },
          { label: 'Nome', key: 'name' },
          { label: 'Descrição', key: 'description' },
          { label: 'Email', key: 'email' },
          { label: 'Logo', key: 'logo', type: 'image' },
          { label: 'Endereço', key: 'address' },
          { label: 'Categoria', key: 'category' },
          { label: 'Ativo', key: 'enabled', type: 'bool' },
          { label: 'IBGE', key: 'ibge_city' },
          {
            label: 'Canal de comunicação',
            key: 'communication_channel',
            type: 'link',
          },
          { label: 'Número de identificação', key: 'identification_number' },
          { label: 'Número para contato', key: 'customer_service' },
          { label: 'Ativo', key: 'enabled', type: 'bool' },
        ]}
      />
    </Container>
  );
};
