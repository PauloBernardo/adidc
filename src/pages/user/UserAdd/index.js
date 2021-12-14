import React, { useState } from 'react';
import { Form, Button, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Container } from './styles';
import * as API from '../../../services/api';
import { ADD_USER } from '../../../services/routes';

export function UserAdd() {
  const user = useSelector((state) => state.user.user);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    companyId: user['custom:company_id'],
    position: '',
    cpf: '',
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    API.apiPOST(ADD_USER, values)
      .then((response) => {
        console.log(JSON.stringify(response));
        if (!response.has_error && response.response.status === 200) {
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
        <Card.Title>Adicionar Usuário</Card.Title>
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
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={values.department}
                onChange={handleChange}
                isValid={values.department && !errors.department}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik102">
              <Form.Label>Posição</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={values.position}
                onChange={handleChange}
                isValid={values.position && !errors.position}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik102">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                value={values.cpf}
                onChange={handleChange}
                isValid={values.cpf && !errors.cpf}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik101">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={values.email && !errors.email}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik102">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={values.password && !errors.password}
              />
            </Form.Group>
          </Form.Row>
          <Button type="submit">Salvar</Button>
        </Form>
      </Card.Body>
    </Container>
  );
}
