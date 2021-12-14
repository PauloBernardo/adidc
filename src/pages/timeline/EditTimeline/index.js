import React, { useState } from 'react';
import { Form, Button, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Container } from './styles';
import * as API from '../../../services/api';
import { EDIT_TIMELINE } from '../../../services/routes';

export function EditTimeline(props) {
  const timeline = props.location.state?.detail;
  const [values, setValues] = useState({
    description: timeline.description,
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    API.apiPATCH(
      EDIT_TIMELINE.replace('{id}', encodeURIComponent(timeline.id)),
      values
    )
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
        <Card.Title>Editar Timeline</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
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
          <Button type="submit">Editar</Button>
        </Form>
      </Card.Body>
    </Container>
  );
}
