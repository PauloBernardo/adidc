import React, { useState } from 'react';
import { Form, Button, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Container } from './styles';
import * as API from '../../../services/api';
import { ADD_TIMELINE } from '../../../services/routes';

export function AddTimeline() {
  const [values, setValues] = useState({
    description: undefined,
    name: undefined,
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    API.apiPOST(ADD_TIMELINE, values)
      .then((response) => {
        if (!response.has_error && response.response.status === 201) {
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
        <Card.Title>Cadastrar Timeline</Card.Title>
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
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Card.Body>
    </Container>
  );
}
