import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import * as API from '../../services/api';
import { ADD_TIMELINE_EVENT } from '../../services/routes';

export const AddEventType = ({ timelineID, onChange }) => {
  const [values, setValues] = useState({
    timelineId: timelineID,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    API.apiPOST(ADD_TIMELINE_EVENT, values).then((resp) => {
      if (resp.has_error) {
        console.log(resp.error.response.data);
      } else {
        console.log(resp.response.data);
        alert('Evento cadastrado com sucesso!');
        if (onChange) {
          onChange();
        }
      }
      setIsLoading(false);
    });
  };

  return (
    <div>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationFormik102">
          <Form.Label>Código</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={values.code}
            onChange={handleChange}
            isValid={values.code && !errors.code}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationFormik102">
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

      <Button onClick={isLoading ? null : handleSubmit} disabled={isLoading}>
        {isLoading ? 'Um momento…' : 'Adicionar evento'}
      </Button>
    </div>
  );
};
