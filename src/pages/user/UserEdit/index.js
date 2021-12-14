import React, { useState } from 'react';
import { Form, Button, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Container } from './styles';
import * as API from '../../../services/api';
import { UPDATE_USER } from '../../../services/routes';

export function UserEdit(props) {
  const user = props.location.state?.user;
  const [values, setValues] = useState(
    user
      ? {
          name: user?.name,
          department: user?.department,
          position: user?.position,
        }
      : {
          name: 'string',
          department: 'string',
          position: 'string',
        }
  );
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    API.apiPATCH(
      UPDATE_USER.replace('{id}', encodeURIComponent(user.id)),
      values
    )
      .then((response) => {
        if (!response.has_error && response.response.status === 200) {
          history.goBack();
        } else {
          alert(response.error);
          console.log(response.error.response);
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
        <Card.Title>Editar Usuário</Card.Title>
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
          <Button type="submit">Salvar</Button>
        </Form>
      </Card.Body>
    </Container>
  );
}
