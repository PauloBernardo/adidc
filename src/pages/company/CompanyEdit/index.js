import React, { useState } from 'react';
import { Form, Button, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Container } from './styles';
import * as API from '../../../services/api';
import { UPDATE_COMPANY } from '../../../services/routes';

export function CompanyEdit(props) {
  const company = props.location.state?.company;
  const [values, setValues] = useState({
    category: company.category || 'string',
    communication_channel: company.communication_channel || 'string',
    customer_service: company.customer_service || 'string',
    description: company.description || 'string',
    ibge_city: company.ibge_city || 'string',
    identification_number: company.identification_number || 'string',
    name: company.name || 'string',
    logo: company.logo || 'string',
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    API.apiPATCH(UPDATE_COMPANY, values)
      .then((response) => {
        console.log(JSON.stringify(response));
        if (
          !response.has_error &&
          (response.response.status === 201 || response.response.status === 200)
        ) {
          history.goBack();
        }
      })
      .catch(() => alert('Houve um erro!'));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Card.Header>
        <Card.Title>Editar Empresa</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik102">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isValid={values.name && !errors.description}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik101">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={values.category}
                onChange={handleChange}
                isValid={values.category && !errors.category}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik102">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                isValid={values.description && !errors.description}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik101">
              <Form.Label>Canal de comunicação</Form.Label>
              <Form.Control
                type="text"
                name="communication_channel"
                value={values.communication_channel}
                onChange={handleChange}
                isValid={
                  values.communication_channel && !errors.communication_channel
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik102">
              <Form.Label>Telefone para contato</Form.Label>
              <Form.Control
                type="text"
                name="customer_service"
                value={values.customer_service}
                onChange={handleChange}
                isValid={values.customer_service && !errors.customer_service}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik101">
              <Form.Label>Número de identificação</Form.Label>
              <Form.Control
                type="text"
                name="identification_number"
                value={values.identification_number}
                onChange={handleChange}
                isValid={
                  values.identification_number && !errors.identification_number
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik102">
              <Form.Label>Logo</Form.Label>
              <Form.Control
                type="text"
                name="logo"
                value={values.logo}
                onChange={handleChange}
                isValid={values.logo && !errors.logo}
              />
            </Form.Group>
          </Form.Row>
          <Button type="submit">Salvar</Button>
        </Form>
      </Card.Body>
    </Container>
  );
}
