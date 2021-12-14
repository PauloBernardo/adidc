import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa';

export const InputMultiple = ({ name, type, onChange, title, editValues }) => {
  const [value, setValue] = useState('');
  const [values, setValues] = useState(editValues || []);
  const [errors, setErrors] = useState({});
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const addInput = () => {
    const newValues = values;
    newValues.push(value);
    setValues(newValues);
    setValue('');
    onChange(newValues);
  };

  const deleteInput = (idx) => {
    const newValues = values;
    newValues.splice(idx, 1);
    setValues(newValues);
    onChange(newValues);
    forceUpdate();
  };

  return (
    <>
      <Form.Label>{title}</Form.Label>
      <Form.Row key="FISRT">
        <Form.Group as={Col} md="10" controlId="validationFormik102">
          <Form.Control
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            isValid={value && !errors.error}
          />
        </Form.Group>
        <Button style={{ width: 40, height: 40 }} onClick={addInput}>
          <FaPlus />
        </Button>
      </Form.Row>
      {values.reverse().map((valueData, idx) => {
        console.log(valueData);
        return (
          <Form.Row key={valueData}>
            <Form.Group as={Col} md="10" controlId="validationFormik102">
              <Form.Control
                type={type}
                name={name}
                disabled
                value={valueData}
                onChange={handleChange}
                isValid={valueData && !errors.error}
              />
            </Form.Group>
            <Button
              style={{ width: 40, height: 40 }}
              onClick={() => deleteInput(idx)}
            >
              <FaTrash />
            </Button>
          </Form.Row>
        );
      })}
    </>
  );
};
