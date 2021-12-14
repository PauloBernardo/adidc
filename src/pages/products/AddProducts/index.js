import React, { useState } from 'react';
import { Form, Button, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Container } from './styles';
import * as API from '../../../services/api';
import { InputMultiple } from '../../../components/InputMultiple';
import { ADD_PRODUCT, UPDATE_PRODUCT } from '../../../services/routes';

export function AddProducts(props) {
  const editProduct = props.location.state?.detail;
  const [values, setValues] = useState({
    category: editProduct?.category || '',
    contents: {
      content: [
        {
          description: ['string'],
          title: 'string',
        },
      ],
      nutrition_facts: {
        composition: [
          {
            daily_value: 0,
            name: 'string',
            unit: 'string',
            value: 0,
          },
        ],
        description: 'string',
        serving_size: {
          measure: 'string',
          quantity: 0,
          unit: 'string',
        },
      },
      raw_materials: [
        {
          description: [
            {
              raw_material_id: 'string',
              text: 'string',
            },
          ],
          title: 'string',
        },
      ],
      technical_specs: [
        {
          description: ['string'],
          title: 'string',
        },
      ],
    },
    description: editProduct?.description || '',
    image: editProduct?.image || '',
    manual: editProduct?.manual || '',
    name: editProduct?.name || undefined,
    precautions: editProduct?.precautions || ['string'],
    videos: editProduct?.videos || ['string'],
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProduct) {
      API.apiPATCH(
        UPDATE_PRODUCT.replace('{id}', encodeURIComponent(editProduct.id)),
        values
      )
        .then((response) => {
          console.log(JSON.stringify(response));
          if (!response.has_error && response.response.status === 201) {
            history.goBack();
          }
        })
        .catch(() => alert('Houve um erro!'));
    } else {
      console.log(values);
      API.apiPOST(ADD_PRODUCT, values)
        .then((response) => {
          if (!response.has_error && response.response.status === 201) {
            history.goBack();
          }
        })
        .catch(() => alert('Houve um erro!'));
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Card.Header>
        <Card.Title>
          {editProduct ? 'Editar Produtos' : 'Adicionar Cadastrar'}
        </Card.Title>
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
              <Form.Label>Imagem</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={values.image}
                onChange={handleChange}
                isValid={values.image && !errors.category}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik102">
              <Form.Label>Manual</Form.Label>
              <Form.Control
                type="text"
                name="manual"
                value={values.manual}
                onChange={handleChange}
                isValid={values.manual && !errors.description}
              />
            </Form.Group>
          </Form.Row>
          <InputMultiple
            onChange={(value) => {
              console.log(value);
              setValues({ ...values, videos: value });
            }}
            editValues={editProduct?.videos}
            name="videos"
            type="text"
            title="Vídeos"
          />
          <InputMultiple
            onChange={(value) => {
              console.log(value);
              setValues({ ...values, precautions: value });
            }}
            editValues={editProduct?.precautions}
            name="precautions"
            type="text"
            title="Preucações"
          />
          <Button type="submit">{editProduct ? 'Editar' : 'Adicionar'}</Button>
        </Form>
      </Card.Body>
    </Container>
  );
}
